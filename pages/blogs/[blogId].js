import { useState } from "react";
import { db, serverTimestamp } from "../../firebase";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";

const blogPage = ({ blog, user, allComments }) => {
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState(allComments);

  const router = useRouter();
  const { blogId } = router.query;

  const makeComment = () => {
    if(!comment){
      M.toast({ html: "Comment can't be empty", classes: "red" });
      return;
    }
    db.collection("Blogs")
      .doc(blogId)
      .collection("comments")
      .add({
        text: comment,
        name: user.displayName,
        createdAt: serverTimestamp(),
      })
      .then(async () => {
        setComment("");
        const querySnap = await db
          .collection("Blogs")
          .doc(blogId)
          .collection("comments")
          .orderBy("createdAt", "desc")
          .get();
        setAllComment(querySnap.docs.map((doc) => doc.data()));
      });
  };

  return (
    <div className="container center">
      <h2>{blog.title}</h2>
      <h5>Created on {new Date(blog.createdAt).toDateString()}</h5>
      <img style={{maxWidth:"600px",maxHeight:"600px"}} src={blog.imageUrl} alt={blog.title} />
      <p
        style={{
          overflowWrap: "anywhere",
        }}
      >
        {blog.body}
      </p>

      {user ? (
        <>
          <Head>
            <title>{blog.title}</title>
            <meta name="title" content={blog.title} />
            <meta name="description" content={`${blog.body.split(".", 3)}`} />
            <meta
              name="keywords"
              content={`Blog,NextJs,${blog.title.split(" ")}`}
            />
            <meta name="author" content={user.displayName} />
          </Head>
          <div className="input-field">
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button
            className="btn #0288d1 light-blue darken-2"
            onClick={makeComment}
          >
            Make Comment
          </button>
        </>
      ) : (
        <h3>Please Login to Comment</h3>
      )}

      <hr />
      <div className="left-align">
        {allComment.map((item) => (
          <h6 key={uuidv4()}>
            <span>
              <b>{item.name}</b>
            </span>{" "}
            {item.text}
          </h6>
        ))}
      </div>

      <style jsx>
        {`
          img {
            max-width: 900px;
            width: 100%;
          }
        `}
      </style>
    </div>
  );
};

export default blogPage;

export const getServerSideProps = async ({ params: { blogId } }) => {
  const result = await db.collection("Blogs").doc(blogId).get();
  const allCommentsSnap = await db
    .collection("Blogs")
    .doc(blogId)
    .collection("comments")
    .orderBy("createdAt", "desc")
    .get();
  const allComments = allCommentsSnap.docs.map((comment) => {
    return {
      ...comment.data(),
      createdAt: comment.data().createdAt.toMillis(),
    };
  });
  return {
    props: {
      blog: {
        ...result.data(),
        createdAt: result.data().createdAt.toMillis(),
      },
      allComments,
    },
  };
};
