import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage, db, serverTimestamp } from "../firebase";
import Head from "next/head";
import { useRouter } from "next/router";
import Loader from "../Components/Loader";

const createblog = ({ user }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (url) {
      try {
        db.collection("Blogs").add({
          title,
          body,
          imageUrl: url,
          postedBy: user.uid,
          createdAt: serverTimestamp(),
        });
        setLoading(false);
        M.toast({ html: "Blog created successfully", classes: "green" });
        setTitle("");
        setBody("");
        setImage(null);
        setUrl("");
      } catch (e) {
        M.toast({ html: "error occured", classes: "red" });
      }
    }
  }, [url]);

  const submitDetails = (e) => {
    setLoading(true);
    if (!title || !body || !image) {
      M.toast({ html: "Please add all the fields", classes: "red" });
      setLoading(false);
      return;
    }
    var uploadTask = storage.ref().child(`image/${uuidv4()}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress == "100") {
          M.toast({ html: "Image Uploaded Successfully", classes: "green" });
        }
      },
      (error) => {
        M.toast({ html: error.message, classes: "red" });
        setLoading(false);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
  };

  return (
    <>
      <Head>
        <title>Blog | Create Blog</title>
        <meta name="title" content="Blog | Create Blog" />
        <meta name="description" content="Create Your Wonderful Blog" />
        <meta name="keywords" content="Blog,NextJs,Create Blog" />
        <meta name="author" content={user.displayName} />
      </Head>

      <div className="input-field rootDiv">
        {loading ? <Loader /> : <></>}
        <h3>Create a Blog</h3>

        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          value={body}
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn #0288d1 light-blue darken-2">
            <span>File</span>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              multiple
            />
          </div>

          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              placeholder="Upload multiple files"
            />
          </div>
        </div>

        <button
          className="btn #0288d1 light-blue darken-2"
          onClick={submitDetails}
        >
          Submit Post
        </button>

        <style jsx>
          {`
            .rootDiv {
              margin: 30px auto;
              max-width: 600px;
              padding: 20px;
              text-align: center;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default createblog;
