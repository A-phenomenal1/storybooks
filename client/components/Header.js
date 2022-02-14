import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import axios from "axios";

import * as actions from "../store/actions";
import styles from "./Header.module.css";

function Header({ currentUser }) {
  const [Navbar, setNavbar] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(async () => {
    if (currentUser) {
      dispatch(actions.fetchUsers(currentUser.id));
    }
    return {};
  }, []);

  const changeBackground = () => {
    console.log(window.scrollY);
    if (window.scrollY >= 16) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const onSignout = async () => {
    try {
      await axios.post("/api/users/signout", {});
      dispatch(actions.fetchUsers(currentUser.id));
      router.push("/");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground);
  });

  const links = [
    !currentUser && { label: "Signup", href: "/auth/signup" },
    !currentUser && { label: "Signin", href: "/auth/signin" },
    currentUser && { label: "Signout", href: onSignout },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li
          key={href}
          className={`${
            router.pathname === "/auth/signin" || router.pathname === "/"
              ? styles.inactiveTitle
              : styles.activeTitle
          }`}
          onClick={() => (label !== "Signout" ? router.push(href) : href())}
        >
          {label}
        </li>
      );
    });

  return (
    <>
      <div
        className={`${styles.headerTopRow} ${
          Navbar ? styles.activeNav : styles.inactiveNav
        }`}
      >
        <div
          className={`${styles.headerNavTitle} ${
            router.pathname === "/auth/signin" || router.pathname === "/stories"
              ? styles.activeTitle
              : styles.inactiveTitle
          }`}
          onClick={() => router.push("/")}
        >
          StoryBooks
        </div>
        <div className={styles.headerSpace} />
        <ul className={styles.headerRightCont}>{links}</ul>
      </div>
    </>
  );
}

export default Header;
