import styles from "../styles/DropDownManu.module.css"
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

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