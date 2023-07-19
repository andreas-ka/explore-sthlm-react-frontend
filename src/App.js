import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import EventCreateForm from "./pages/events/EventCreateForm";
import EventPage from "./pages/events/EventPage";
import EventsPage from "./pages/events/EventsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import EventEditForm from "./pages/events/EventEditForm";
import TopReviews from "./pages/reviews/TopReviews";
import EventCalendar from "./pages/calendar/EventCalendar";


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => < EventsPage message="No results found, please adjust your search keyword." /> } />
              <Route exact path="/feed" render={() => < EventsPage message="No results found, please adjust your search keyword or follow a user."
               filter={`owner__followed__owner__profile=${profile_id}&`}
               /> } />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/events/create" render={() => <EventCreateForm />} />
              <Route exact path="/events/:id" render={() => <EventPage />} />
              <Route exact path="/events/:id/edit" render={() => <EventEditForm />} />
              <Route exact path="/reviews" render={() => <TopReviews />} />
              <Route exact path="/calendar" render={() => <EventCalendar />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;
