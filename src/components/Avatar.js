/* eslint-disable */ 
import React from "react";

// CSS Styles
import styles from "../styles/Avatar.module.css";

// Avatar for profile images
const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;
