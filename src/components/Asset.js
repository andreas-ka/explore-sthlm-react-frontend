/* eslint-disable */ 
import React from "react";

// Bootstrap import
import { Spinner } from "react-bootstrap";

// Css styles
import styles from "../styles/Asset.module.css";

// Spinner asset for loading pages
const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;
