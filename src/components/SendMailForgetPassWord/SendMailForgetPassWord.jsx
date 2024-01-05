import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SendMailForgetPassWord = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorStyle, setErrorStyle] = useState("");
  const [reset_hash, setReset_hash] = useState("");
  const [code, setCode] = useState("");

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Veuillez entrer une adresse e-mail valide");
      setErrorStyle("error");
      setTimeout(() => {
        setError("");
      }, 4000);
      return false;
    }
    setTimeout(() => {
      setError("");
    }, 4000);
    return true;
  };

  const onSubmitSendCode = async () => {
    if (validateEmail()) {
      axios
        .post("https://erpenragri.com/api/send-password-code", {
          email: email,
        })
        .then((response) => {
          setError(response.data.message);
          if (response.data.status === 1) {
            setReset_hash(response.data.reset_hash);
            setErrorStyle("success");
          } else {
            setErrorStyle("error");
          }
          setTimeout(() => {
            setError("");
          }, 4000);
        });
    }
  };

  const onSubmitConfirm = async () => {
    if (validateEmail()) {
      axios
        .post("https://erpenragri.com/api/confirm-password-code", {
          email: email,
          reset_hash: reset_hash,
          reset_code: code,
        })
        .then((response) => {
          setError(response.data.message);
          if (response.data.status === "1") {
            navigation.navigate("/verifycode", {
              email: email,
              reset_hash: reset_hash,
              error: response.data.message,
              errorStyle: "success",
            });
            setErrorStyle("success");
          } else {
            setErrorStyle("error");
          }
          setTimeout(() => {
            setError("");
          }, 4000);
        });
    }
  };

  return (
    <Container className="container-fluid">
      {error ? (
        <Row>
          <Col xs={1}>
            <FontAwesomeIcon
              icon={errorStyle === "error" ? faInfoCircle : faCheckCircle}
              size={25}
              color={
                errorStyle === "error"
                  ? "rgb(196, 92, 89)"
                  : "rgb(45, 117, 117)"
              }
            />
          </Col>
          <Col xs={11}>
            <h1>{error}</h1>
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col>
          {!reset_hash ? (
            <>
              <Form>
                <Form.Group controlId="formEmail">
                  <Form.Label>Taper Votre E-mail</Form.Label>
                  <Form.Control
                    className="w-50 mb-2"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Link
                  to={"/verifycode"}
                  variant="primary"
                  onClick={onSubmitSendCode}
                >
                  Envoyer
                </Link>
              </Form>
            </>
          ) : (
            <Form>
              <Form.Group controlId="formCode">
                <Form.Label>Taper votre code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={onSubmitConfirm}>
                Valider
              </Button>
            </Form>
          )}
        </Col>
      </Row>

      <Link to={"/signin"}>Back</Link>
    </Container>
  );
};

export default SendMailForgetPassWord;
