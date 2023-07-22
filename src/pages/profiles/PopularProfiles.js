import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import WeatherComponent from "../../components/Weather";


const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <>
      <Container
        className={`${appStyles.Content} ${
          mobile && "d-lg-none text-center mt-5 mb-3"
        }`}
      >
        <WeatherComponent
      />
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
