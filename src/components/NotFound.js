import React from 'react'
import NoResult from "../assets/no-result.png";
import styles from "../styles/NotFound.module.css";
import Asset from "./Asset";

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

export default NotFound