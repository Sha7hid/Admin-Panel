import React, { useEffect , useState } from 'react';
import styles from '../styles/add.module.css';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import Link from "next/link";
import Head from "next/head";
export default function Add() {
  const [success, setSuccess] = useState(null);
  useEffect(() => {
    const myForm = document.getElementById('myForm');
    myForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(this);

      const data = {
        name: formData.get('name'),
        rating: formData.get('rating'),
        release_year: formData.get('release_year'),
        image: formData.get('image')
      };

      fetch('https://horror-api-production.up.railway.app/api/horror/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => console.log(data)).then(setSuccess(`Successfully added movie ${data.name} `))
        .catch(error => console.error(error));
    });
  }, []);
    return (
      <><Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous" />
      </Head><><Navbar className={styles.navbar} fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href={"/"}>Admin Panel</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className={styles.link} href={"/add"}>Add New Data</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className={styles.container}>
            <h1 className={styles.h1}>Add A New Movie To Your Horror List</h1>
            <form id="myForm" className={styles.form}>
              <div class="form-group" className={styles.formGroup}>
                <label className={styles.label}>Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  aria-describedby="movie name"
                  placeholder="horror movie name" />
              </div>
              <div class="form-group" className={styles.formGroup}>
                <label className={styles.label}>Rating</label>
                <input
                  type="number"
                  step="0.01"
                  class="form-control"
                  id="rating"
                  name="rating"
                  aria-describedby="movie rating"
                  placeholder="imdb rating" />
              </div>
              <div class="form-group" className={styles.formGroup}>
                <label className={styles.label}>Release Year</label>
                <input
                  type="number"
                  class="form-control"
                  id="release_year"
                  name="release_year"
                  aria-describedby="movie release year"
                  placeholder="release year" />
              </div>
              <div class="form-group" className={styles.formGroup}>
                <label className={styles.label}>Image</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  name="image"
                  aria-describedby="movie image"
                  placeholder="Enter the movie poster url" />
              </div>

              <button type="submit" className={styles.button}>Submit</button>
              <p>{success}</p>
            </form>
          </div></></>
    );
}
