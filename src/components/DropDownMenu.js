import styles from "../styles/DropDownManu.module.css"
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router";

const ArrowDown = React.forwardRef(({ onClick }, ref) => (
    <i
    className="fa-solid fa-square-caret-down"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));
  
  export const DropdownMenu = ({ handleEdit, handleDelete }) => {
    return (
      <Dropdown className="ml-auto" drop="left">
        <Dropdown.Toggle as={ArrowDown} />
  
        <Dropdown.Menu
          className="text-center"
          popperConfig={{ strategy: "fixed" }}
        >
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleEdit}
            aria-label="edit"
          >
            <i className="fa-solid fa-pen-to-square" />
          </Dropdown.Item>
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleDelete}
            aria-label="delete"
          >
            <i className="fa-regular fa-trash-can" />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  export function ProfileEditDropdown({ id }) {
    const history = useHistory();
    return (
      <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
        <Dropdown.Toggle as={ArrowDown} />
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit`)}
            aria-label="edit-profile"
          >
            <i className="fas fa-edit" /> edit profile
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit/username`)}
            aria-label="edit-username"
          >
            <i className="far fa-id-card" />
            change username
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit/password`)}
            aria-label="edit-password"
          >
            <i className="fas fa-key" />
            change password
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }