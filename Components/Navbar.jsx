import Link from "next/link";
import { auth } from "../firebase";

const Navbar = ({ user }) => {
  return (
    <nav>
      <div className="nav-wrapper #0288d1 light-blue darken-2">
        <Link href="/">
          <a href="#" className="brand-logo">
            Blog
          </a>
        </Link>
        <ul id="nav-mobile" style={{ marginRight: "1rem" }} className="right">
          {user ? (
            <>
              <li>
                <Link href="/createblog">
                  <a>createBlog</a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    auth.signOut().then(() => {
                      M.toast({
                        html: "Succefully logged out",
                        classes: "green",
                      });
                    });
                  }}
                  className="btn red"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/signup">
                  <a>Signup</a>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
