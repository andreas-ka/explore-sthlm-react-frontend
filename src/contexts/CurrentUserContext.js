import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";


/* Create the context to get user and be passed globally */
export const currentLoggedInUserContext = createContext();
export const setCurrentLoggedInUserContext = createContext();

export const useCurrentUser = () => useContext(currentLoggedInUserContext)
export const useSetCurrentUser = () => useContext(setCurrentLoggedInUserContext)

export const CurrentUserProvider = ({children}) => {
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
    const history = useHistory();

  /* Gets the user from the API */
  const handleMount = async () => {
    try {
      const { userdata } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentLoggedInUser(userdata);
    } catch (err) {
      console.log(err);
    }
  };

  /* Runs the handlemount once and then unmounts */
  useEffect(() => {
    handleMount();
  }, []);

  /* Sets the res and req for Axios interceptors, lets our user be logged in for 24 h */
  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
          setCurrentLoggedInUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              history.push("/signin");
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentLoggedInUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    /* Pass the user context to the children componenents */
    <currentLoggedInUserContext.Provider value={currentLoggedInUser}>
    <setCurrentLoggedInUserContext.Provider value={setCurrentLoggedInUser}>
        {children}
    </setCurrentLoggedInUserContext.Provider>
    </currentLoggedInUserContext.Provider>
  );
};