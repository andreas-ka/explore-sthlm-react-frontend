// React import
import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";

// Styles and CSS
import appStyles from "../../App.module.css";

// Assets, Profiledata context, also the weather widget library
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import WeatherComponent from "../../components/Weather";

// Display the most popular profiles and also the weatherwidget

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <>
      <Container
        className={`${appStyles.Content} ${
          mobile && "d-lg-none text-center mt-5 mb-3"
        }`}
      >
        <WeatherComponent />
        {popularProfiles.results.length ? (
          <>
            <p>Most followed profiles.</p>
            {mobile ? (
              <div className="d-flex justify-content-around">
                {popularProfiles.results.slice(0, 4).map((profile) => (
                  <Profile key={profile.id} profile={profile} mobile />
                ))}
              </div>
            ) : (
              popularProfiles.results.map((profile) => (
                <Profile key={profile.id} profile={profile} />
              ))
            )}
          </>
        ) : (
          <Asset spinner />
        )}
      </Container>
    </>
  );
};

export default PopularProfiles;
