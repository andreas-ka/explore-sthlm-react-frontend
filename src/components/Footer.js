import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => (
  <footer
    className={`page-footer font-small fixed-bottom text-white ${styles.Footer}`}
  >
    <div className="footer-copyright text-center mt-3">
      <a
        href="https://www.facebook.com/andreas.krln"
        target="_blank"
        rel="noopener"
        aria-label="Visit my facebook page, opens in new tab"
      >
        <i className="fab fa-facebook-f fa-xl"></i>
      </a>

      <a
        href="https://twitter.com/"
        role="button"
        target="_blank"
        rel="noopener"
        aria-label="Visit Twitter, opens in new tab"
      >
        <i className="fab fa-twitter fa-xl"></i>
      </a>

      <a
        href="https://www.instagram.com/akarlsson_/?hl=en"
        target="_blank"
        rel="noopener"
        aria-label="Visit my instagram page, opens in new tab"
      >
        <i className="fab fa-instagram fa-xl"></i>
      </a>

      <a
        href="https://www.linkedin.com/in/andreas-karlsson-48902249/"
        target="_blank"
        rel="noopener"
        aria-label="Visit my Linkedin page, opens in new tab"
      >
        <i className="fab fa-linkedin-in fa-xl"></i>
      </a>

      <a
        href="https://github.com/andreas-ka"
        target="_blank"
        rel="noopener"
        aria-label="Visit my Github page, opens in new tab"
      >
        <i className="fab fa-github fa-xl"></i>
      </a>
    </div>
    <div className="footer-copyright text-center mb-1">
      <p>© 2023 Andreas Karlsson. Built for educational purpose only.</p>
    </div>
  </footer>
);

export default Footer;
