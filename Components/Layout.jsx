import Navbar from "./Navbar";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
    });
  }, [user]);

  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  );
};

export default Layout;
