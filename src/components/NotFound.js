import React from "react";

// Import the no result image
import NoResult from "../assets/no-result.png";

// Css styles
import styles from "../styles/NotFound.module.css";

// Asset import
import Asset from "./Asset";

// This shows when a page dont exist on the website
const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <Asset
        src={NoResult}
        message={`Sorry, the page you're looking for doesn't seem to exist`}
      />
    </div>
  );
};

export default NotFound;
