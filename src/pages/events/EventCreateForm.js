// React hooks
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import { useRedirect } from "../../hooks/useRedirect";

// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

// Styles and CSS
import styles from "../../styles/EventCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

// Upload image, Asset and Axios
import Upload from "../../assets/upload.png";
import Asset from "../../components/Asset";
import { axiosReq } from "../../api/axiosDefaults";

// Event create form, posts the new event to the API

function EventCreateForm() {
  useRedirect("loggedOut");
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    event_location: "",
    start_date: "",
    end_date: "",
    category: "",
    cost: "",
    image: "",
  });

  const {
    title,
    description,
    event_location,
    start_date,
    end_date,
    category,
    cost,
    image,
  } = eventData;

  const [errors, setErrors] = useState({});
  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    // If user wants to change the image
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setEventData({
        ...eventData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    // Form submit for events
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("event_location", event_location);
    formData.append("start_date", start_date);
    formData.append("end_date", end_date);
    formData.append("category", category);
    formData.append("cost", cost);
    formData.append("image", imageInput.current.files[0]);
    try {
      const { data } = await axiosReq.post("/events/", formData);
      history.push(`/events/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center text-black">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="event_location"
          value={event_location}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.event_location?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Start date</Form.Label>
        <Form.Control
          type="date"
          name="start_date"
          value={start_date}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.start_date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>End date</Form.Label>
        <Form.Control
          type="date"
          name="end_date"
          value={end_date}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.end_date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          className="mr-sm-2"
          id="inlineFormCustomSelect"
          name="category"
          value={category}
          onChange={handleChange}
          custom
        >
          <option value="Family">Family</option>
          <option value="Food">Food & Drink</option>
          <option value="Culture">Culture</option>
          <option value="Music">Music & Concerts</option>
          <option value="Shopping">Shopping</option>
          <option value="Sport">Sports</option>
          <option value="Sightseeing">Sightseeing</option>
        </Form.Control>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Cost US dollars</Form.Label>
        <Form.Control
          type="number"
          name="cost"
          value={cost}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.cost?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
        type="submit"
      >
        Create
      </Button>
      {errors.non_field_errors?.map((message, idx) => (
        <Alert variant="warning" className="mt-3" key={idx}>
          {message}{" "}
        </Alert>
      ))}
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default EventCreateForm;
