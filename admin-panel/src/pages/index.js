import Head from "next/head";
import React, {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import styles from "../styles/Home.module.css";
import { Row , Col, Button} from "react-bootstrap";
import Link from "next/link";
import Modals from "@/components/modal";
export const getServerSideProps = async () => {
  

  const res = await fetch(
    "https://horror-api-production.up.railway.app/api/horror",{ cache: 'no-store' }
  );
  const data = await res.json();
  return {
    props: { results: data },
  };
};
export default function Home({ results }) {
  const [selectedId, setSelectedId] = useState(null);
  const [success, setSuccess] = useState(null);
  const handleShow = (id) => {
    setSelectedId(id);
  };

  const handleClose = () => {
    setSelectedId(null);
  };

  const handleDelete = (props) => {
    const id = props;
 

    fetch(`https://horror-api-production.up.railway.app/api/horror/horror/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data)).then(setSuccess("Succesfully Deleted"))
      .catch(error => console.error(error));
  };


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous"
        />
      </Head>
      <Navbar className={styles.navbar} fixed="top" bg="dark" variant="dark">
        <Container >
          <Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
         
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link className={styles.link} href={"/add"}>Add New Data</Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className={styles.main}>
      {results.map((result) => (
           <Modals
           key={result._id}
           show={selectedId === result._id}
           handleClose={handleClose}
           result={result}
         />
        ))}
      <Row>
        {results.map((result) => (
          
          <>
         
            <Col>
            <Card style={{ width: '18rem', marginTop: '2rem' , marginLeft:'1.5rem', marginBottom:'1rem'}}>
      <Card.Img width={250} height={350} variant="top" src={result.image} />
      <Card.Body>
        <Card.Title>{result.name}</Card.Title>
        <Card.Text>
        Rating - {result.rating} 
        </Card.Text>
        <Card.Text>
        Released Year - {result.release_year}

        </Card.Text>
  <Card.Footer>
  <Button variant="default" className={styles.button} onClick={() => handleShow(result._id)}>Update</Button>
  <Button variant="default" className={styles.button2} onClick={() => handleDelete(result._id)}>Delete</Button>
     
  </Card.Footer>
      </Card.Body>
    </Card>
            </Col>
          
      
 
          </>
        ))}
         <p>{success}</p>
            </Row>
      </main>
    </>
  );
  
}
