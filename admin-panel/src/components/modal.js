import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from "react";
import styles from '../styles/modal.module.css'
import { Button } from 'react-bootstrap';
export default function Modals(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Modal >
        <Modal.Header closeButton>
          <Modal.Title>Edit the movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form id="myForm" >
              <div class="form-group" >
                <label >Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  aria-describedby="movie name"
                  placeholder="horror movie name"
                  value={props.name} />
              </div>
              <div class="form-group" >
                <label >Rating</label>
                <input
                  type="number"
                  step="0.01"
                  class="form-control"
                  id="rating"
                  name="rating"
                  aria-describedby="movie rating"
                  placeholder="imdb rating"
                  value={props.rating}
                  />
              </div>
              <div class="form-group" >
                <label >Release Year</label>
                <input
                  type="number"
                  class="form-control"
                  id="release_year"
                  name="release_year"
                  aria-describedby="movie release year"
                  placeholder="release year" 
                  value={props.release_year}
                  />
              </div>
              <div class="form-group" >
                <label >Image</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  name="image"
                  aria-describedby="movie image"
                  placeholder="Enter the movie poster url" 
                  value={props.image}
                  />
              </div>
              <button type="submit" className={styles.buttonSave}>
            Save Changes
          </button>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >  
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
}