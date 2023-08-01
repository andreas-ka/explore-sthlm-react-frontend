import React from "react";

// Import the no result image
import NoResult from "../assets/not_found.webp";

// Css styles
import styles from "../styles/NotFound.module.css";

// Asset import
import Asset from "./Asset";

// This shows when a page dont exist on the website
const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <Asset
      message={`Sorry, the page you're looking for doesn't seem to exist`}
        src={NoResult}
      />
    </div>
  );
};

export default NotFound;
