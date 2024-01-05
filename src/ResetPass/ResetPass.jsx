import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const ResetPass = ({
  navigation,
  email,
  reset_hash,
  error,
  errorStyle: errorStyle1,
}) => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error1, setError1] = useState(error);
  const [errorStyle, setErrorStyle] = useState(errorStyle1);

  useEffect(() => {
    setTimeout(() => {
      setError1("");
    }, 4000);
  }, [error1]);

  function onSubmit() {
    if (password1 !== password2) {
      setError1("Les mots de passe ne correspondent pas");
      setErrorStyle("error");
      return;
    } else if (password1 === "") {
      setError1("Mot de passe doit être non vide");
      setErrorStyle("error");
      return;
    } else if (password2 === "") {
      setError1("Confirmer Mot de passe doit être non vide");
      setErrorStyle("error");
      return;
    }
    axios
      .post(
        "https://erpenragri.com/api/reset-password",
        { email, reset_hash, password: password1, password_confirm: password2 },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setError1(response.data.message);
        if (response.data.status === 1) {
          alert("Succès", response.data.message.toString());
          navigation.navigate("/signin");
          setErrorStyle("success");
        } else {
          setErrorStyle("error");
        }
      });
  }

  return (
    <div className="container mt-4">
      {error1 ? (
        <div className={`alert alert-${errorStyle}`} role="alert">
          <FontAwesomeIcon
            icon={errorStyle === "error" ? "info-circle" : "check-circle"}
            size="lg"
            className="mr-2"
          />
          {error1}
        </div>
      ) : null}
      <div>
        <div className="mb-3 w-50">
          <input
            value={password1}
            type="password"
            className="form-control"
            placeholder="Nouveau Mot de passe"
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div className="mb-3 w-50">
          <input
            value={password2}
            type="password"
            className="form-control"
            placeholder="Confirmez votre mot de passe"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" title="Valider" onClick={onSubmit}>
          Valider
        </button>
      </div>
    </div>
  );
};

export default ResetPass;
