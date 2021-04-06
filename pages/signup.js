import { useState } from "react";
import Link from "next/link";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import Head from "next/head";
import Loader from "../Components/Loader";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.createUserWithEmailAndPassword(email, pass);

      await result.user.updateProfile({
        displayName: name,
      });

      M.toast({ html: `Welcome ${result.user.displayName}`, classes: "green" });
      setLoading(false);

      setEmail("");
      setPass("");
      setName("");

      router.push("/");
    } catch (e) {
      M.toast({ html: e.message, classes: "red" });
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Blog | SignUp</title>
        <meta name="title" content="Blog | SignUp" />
        <meta
          name="description"
          content="Sign Up to Create Your Wonderful Blog"
        />
        <meta name="author" content="Deep Shah" />
        <meta name="keywords" content="Blog,NextJs,Signup" />
      </Head>
      <div className="container center">
        <h3>Please SignUp</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            Sign Up
          </button>
          <Link href="/login">
            <a>
              <h5>Already have an Account?Login</h5>
            </a>
          </Link>
        </form>
        {loading ? <Loader top="5vh" /> : <></>}
      </div>
    </>
  );
};

export default SignUp;
