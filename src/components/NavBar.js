import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {

  const currentLoggedInUser = useCurrentUser();
  const setCurrentLoggedInUser = useSetCurrentUser();

  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  /* Handle the sign out, redirect is via the navlink */
  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/')
      setCurrentLoggedInUser(null);
    }
    catch (err) {
      console.log(err);
    }
  };

  const addEventIcon = (
    <NavLink
      className={`${styles.NavLink} ${styles.NavLinkHover}`}
      activeClassName={styles.Active}
      to="/events/create"
    >
      <i class="fa-regular fa-square-plus fa-fw"></i><span className="ml-2"> Add Event</span>
    </NavLink>
  );

  /* Icons displaying if a user is logged in */
  const LoggedInIcons = <>
    <NavLink
        className={`${styles.NavLink} ${styles.NavLinkHover}`}
        activeClassName={styles.Active}
        to="/feed">
        <i className="fas fa-stream fa-fw"></i><span className="ml-2"> Feed</span>
    </NavLink>
    <NavLink
    className={`${styles.NavLink} ${styles.NavLinkHover}`}
    activeClassName={styles.Active}
    to="/reviews">
    <i class="fa-regular fa-star-half-stroke fa-fw"></i><span className="ml-2"> Reviews</span>
  </NavLink>
  <NavLink
    className={`${styles.NavLink} ${styles.NavLinkHover}`}
    activeClassName={styles.Active}
    to="/calendar">
    <i class="fa-regular fa-calendar fa-fw"></i><span className="ml-2"> Calendar</span>
  </NavLink>
  <NavLink
    className={`${styles.NavLink} ${styles.NavLinkHover}`}
    to="/"
    onClick={handleSignOut}>
    <i class="fa-solid fa-right-from-bracket fa-fw"></i><span className="ml-2"> Sign out</span>
  </NavLink>
  <NavLink
    className={`${styles.NavLink} ${styles.NavLinkHover}`}
    to={`/profile/${currentLoggedInUser?.profile_id}`}>
    <Avatar src={currentLoggedInUser?.profile_image} text="Profile" height={39}/>
  </NavLink>
    </>;
  /* Icons displaying if a user is not logged in */
  const notLoggedInIcons = (
    <>
      <NavLink
        className={`${styles.NavLink} ${styles.NavLinkHover}`}
        activeClassName={styles.Active}
        to="signin"
      >
        <i className="fas fa-sign-in-alt fa-fw"></i><span className="ml-2"> Sign in</span>
      </NavLink>
      <NavLink
        className={`${styles.NavLink} ${styles.NavLinkHover}`}
        activeClassName={styles.Active}
        to="signup"
      >
        <i className="fas fa-user-plus fa-fw"></i><span className="ml-2"> Sign up</span>
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      bg="dark"
      variant="dark"
      expand="md"
      fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentLoggedInUser && addEventIcon}
        <Navbar.Toggle 
        ref={ref}
        onClick={() => setExpanded(!expanded)} 
        aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={`${styles.NavLink} ${styles.NavLinkHover}`}
              activeClassName={styles.Active}
              to="/">
              <i className="fas fa-home fa-fw"></i> <span className="ml-2"> Home</span>
            </NavLink>
            {currentLoggedInUser ? LoggedInIcons : notLoggedInIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
