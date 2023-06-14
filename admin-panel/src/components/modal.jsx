import Modal from 'react-bootstrap/Modal';
import React, { useState } from "react";
import styles from '../styles/modal.module.css'
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
export default function Modals(props) {
  const router = useRouter();
  const { show, handleClose, result } = props;
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    name: result.name,
    rating: result.rating,
    release_year: result.release_year,
    image: result.image
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = result._id;
   

    fetch(`https://horror-api-production.up.railway.app/api/horror/horror/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => console.log(data)).then(setSuccess("Succesfully Updated"))
      .catch(error => console.error(error));
      router.reload();
  };
  
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
   
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit the movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} id="myForm">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              aria-describedby="movie name"
              placeholder="horror movie name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="rating"
              name="rating"
              aria-describedby="movie rating"
              placeholder="imdb rating"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Release Year</label>
            <input
              type="number"
              className="form-control"
              id="release_year"
              name="release_year"
              aria-describedby="movie release year"
              placeholder="release year"
              value={formData.release_year}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input
              type="text"
              className="form-control"
              id="image"
              name="image"
              aria-describedby="movie image"
              placeholder="Enter the movie poster URL"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={styles.buttonSave}>
            Save Changes
          </button>
          <p>{success}</p>
          
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
