// Styles and CSS
import styles from "./App.module.css";
import NavBar from "./components/NavBar";

// Bootstrap
import Container from "react-bootstrap/Container";

import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";

// current user context
import { useCurrentUser } from "./contexts/CurrentUserContext";

// Components import
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import EventCreateForm from "./pages/events/EventCreateForm";
import EventPage from "./pages/events/EventPage";
import EventsPage from "./pages/events/EventsPage";
import EventEditForm from "./pages/events/EventEditForm";
import EventMap from "./pages/map/EventMap";
import EventCalendar from "./pages/calendar/EventCalendar";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <EventsPage message="No results found, please adjust your search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <EventsPage
                message="No results found, please adjust your search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/events/create"
            render={() => <EventCreateForm />}
          />
          <Route exact path="/events/:id" render={() => <EventPage />} />
          <Route
            exact
            path="/events/:id/edit"
            render={() => <EventEditForm />}
          />
          <Route exact path="/eventmap" render={() => <EventMap />} />
          <Route exact path="/calendar" render={() => <EventCalendar />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
