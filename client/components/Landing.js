import { useRouter } from "next/router";
import React from "react";

import styles from "./Header.module.css";

const textRow = [
  {
    title: "Family",
    color: "#10ff00",
    family: "'Comforter', cursive",
    weight: 500,
  },
  {
    title: "Love",
    color: "#00EAD3",
    family: "'Dancing Script', cursive",
    weight: 600,
  },
  {
    title: "Horror",
    color: "#FFFDA2",
    family: "'Quintessential', cursive",
    weight: 500,
  },
  {
    title: "Success",
    color: "#9AE66E",
    family: "'Redressed', cursive",
    weight: 500,
  },
  {
    title: "Kids",
    color: "#FBF46D",
    family: "'Source Serif 4', sans-serif",
    weight: 600,
  },
];

function Landing({ currentUser }) {
  const router = useRouter();

  const onSignupClick = () => {
    router.push("/auth/signup");
  };
  const toContentPage = () => {
    router.push("/stories");
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.mainContent}>
        <ul className={styles.textRow}>
          <li
            style={{ fontFamily: textRow[0].family, color: textRow[0].color }}
          >
            {textRow[0].title}
          </li>
          <li
            style={{ fontFamily: textRow[1].family, color: textRow[1].color }}
          >
            {textRow[1].title}
          </li>
          <li
            style={{ fontFamily: textRow[2].family, color: textRow[2].color }}
          >
            {textRow[2].title}
          </li>
          <li
            style={{ fontFamily: textRow[3].family, color: textRow[3].color }}
          >
            {textRow[3].title}
          </li>
          <li
            style={{ fontFamily: textRow[4].family, color: textRow[4].color }}
          >
            {textRow[4].title}
          </li>
        </ul>
        <div className={styles.tagLine}>
          <span>
            Your Book Your Way, Read endless stories books and start your
            reading streak.
          </span>
        </div>
        <button
          className={styles.signBtn}
          onClick={currentUser === null ? onSignupClick : toContentPage}
        >
          Start Your Streak Now
        </button>
      </div>
    </div>
  );
}

export default Landing;
