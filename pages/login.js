import { useState } from "react";
import Link from "next/link";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import Head from "next/head";
import Loader from "../Components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, pass);

      M.toast({ html: `Welcome ${result.user.displayName}`, classes: "green" });
      setLoading(false);

      setEmail("");
      setPass("");
      router.push("/");
    } catch (e) {
      M.toast({ html: e.message, classes: "red" });
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Blog | Login</title>
        <meta name="title" content="Blog | Login" />
        <meta
          name="description"
          content="Login to Create Your Wonderful Blog"
        />
        <meta name="author" content="Deep Shah" />
        <meta name="keywords" content="Blog,NextJs,Login" />
      </Head>
      <div className="container center">
        <h3>Please Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <button type="submit" className="btn #0288d1 light-blue darken-2">
            Login
          </button>
          <Link href="/signup">
            <a>
              <h5>Don't have an Account?Sign Up</h5>
            </a>
          </Link>
        </form>
        {loading ? <Loader top="5vh" /> : <></>}
      </div>
    </>
  );
};

export default Login;
