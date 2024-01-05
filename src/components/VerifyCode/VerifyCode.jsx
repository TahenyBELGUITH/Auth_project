import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const VerifyCode = ({ navigation, data, request_id }) => {
  const [value, setValue] = useState("");

  let userData = {
    ...data,
    request_id: request_id,
    code: value.toString(),
  };

  function onSubmit() {
    axios
      .post("https://erpenragri.com/api/confirm-code", userData)
      .then((response) => {
        console.log(response.data.status);
        if (response.data.status) {
          alert("fine");
          navigation.navigate("/resetpass");
        } else {
          alert("non");
        }
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  }

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-body">
          <h3 className="card-title">Verify Code</h3>
          <p>
            Un code de confirmation va être envoyé au :{" "}
            {navigation && navigation.email}
          </p>
          <input
            value={value}
            placeholder="Code de confirmation"
            onChange={(e) => setValue(e.target.value)}
            type="text"
            className="form-control mb-3"
          />
          <Link to={"/resetpass"} variant="primary" onClick={onSubmit}>
            Valider
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
