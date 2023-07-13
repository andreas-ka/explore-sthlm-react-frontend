import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/EventCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";

function EventCreateForm() {

    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        location: "",
        startdate: "",
        enddate: "",
        category: "",
        cost: "",
        image: "",
    });
    const { title, description, location, startdate, enddate, category, cost, image} = eventData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setEventData({
        ...eventData,
        [event.target.name]: event.target.value,
      });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
          URL.revokeObjectURL(image);
          setEventData({
            ...eventData,
            image: URL.createObjectURL(event.target.files[0]),
          });
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
      <Form.Group>
      <Form.Label>Location</Form.Label>
        <Form.Control 
        type="text" 
        name="location" 
        value={location}
        onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
      <Form.Label>Start date</Form.Label>
        <Form.Control 
        type="date" 
        name="startdate" 
        value={startdate}
        onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
      <Form.Label>End date</Form.Label>
        <Form.Control 
        type="date" 
        name="enddate" 
        value={enddate}
        onChange={handleChange}
        />
      </Form.Group>
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
        <option value="Culture">Three</option>
        <option value="Music">Music & Concerts</option>
        <option value="Shopping">Shopping</option>
        <option value="Sports">Sports</option>
        <option value="Sightseeing">Sightseeing</option>
      </Form.Control>
      </Form.Group>
      <Form.Group>
      <Form.Label>Cost US dollars</Form.Label>
        <Form.Control 
        type="number" 
        name="cost" 
        value={cost}
        onChange={handleChange}
        />
      </Form.Group>

    
    
      <Button
        className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
        onClick={() => {}}>
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form>
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
              />
            </Form.Group>
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