/* eslint-disable */
// React import
import React from "react";
import { Link } from "react-router-dom";

// Styles and CSS
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";

// Contexts and Avatar
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";

// Bootstrap
import Button from "react-bootstrap/Button";

// Sets the profile, shows follow or unfollow button

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.OrangeOutline}`}
              onClick={() => handleUnfollow(profile)}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Orange}`}
              onClick={() => handleFollow(profile)}
            >
              Follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
