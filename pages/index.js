import { db } from "../firebase";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import Loader from "../Components/Loader";
import { motion } from "framer-motion";

export default function Home({ allBlogs }) {
  const [blogs, setBlogs] = useState(allBlogs);
  const [end, setEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const last = blogs[blogs.length - 1];
    const res = await db
      .collection("Blogs")
      .orderBy("createdAt", "desc")
      .startAfter(new Date(last.createdAt))
      .limit(3)
      .get();
    const newBlogs = res.docs.map((docsnap) => {
      return {
        ...docsnap.data(),
        createdAt: docsnap.data().createdAt.toMillis(),
        id: docsnap.id,
      };
    });

    setBlogs(blogs.concat(newBlogs));
    if (newBlogs.length < 3) {
      setEnd(true);
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Blog | NextJs</title>
        <meta name="title" content="Blog | NextJs" />
        <meta
          name="description"
          content="Blog website for Creating wonderful blogs and Created on Next js Framework"
        />
        <meta
          name="keywords"
          content="Deep,Deep Shah,Next,Nextjs,Next Js,Blog"
        />
        <meta name="author" content="Deep Shah" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossorigin="anonymous"
        />
      </Head>
      <div className="center" style={{ marginBottom: "5vh !important" }}>
        {blogs.map((blog) => (
          <div className="card" key={blog.id}>
            <div className="card-image">
              <img src={blog.imageUrl} alt={blog.title} />
              <span className="card-title">{blog.title}</span>
            </div>
            <div className="card-content">
              <p>{blog.body}</p>
            </div>
            <div className="card-action">
              <Link href={`/blogs/${blog.id}`}>
                <a>Read More</a>
              </Link>
            </div>
          </div>
        ))}

        {end == false ? (
          !loading ? (
            <button
              onClick={loadMore}
              className="btn #0288d1 light-blue darken-2"
            >
              Load More
            </button>
          ) : (
            <Loader top="2vh" />
          )
        ) : (
          <h3>You have reached end</h3>
        )}

        <style jsx>
          {`
            .card {
              max-width: 500px;
              margin: 22px auto;
            }
            p {
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          `}
        </style>
      </div>
      <Link href="/">
        <motion.a
          whileTap={{ scale: 0.9 }}
          style={{ cursor: "pointer" }}
          className="backToTop"
        >
          <i className="fas fa-arrow-up"></i>
        </motion.a>
      </Link>
    </>
  );
}

export const getServerSideProps = async () => {
  const querysnap = await db
    .collection("Blogs")
    .orderBy("createdAt", "desc")
    .limit(3)
    .get();

  const allBlogs = querysnap.docs.map((docsnap) => {
    return {
      ...docsnap.data(),
      createdAt: docsnap.data().createdAt.toMillis(),
      id: docsnap.id,
    };
  });

  return {
    props: { allBlogs },
  };
};
