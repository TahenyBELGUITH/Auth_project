import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SendMailForgetPassWord from "./components/SendMailForgetPassWord/SendMailForgetPassWord";
import SignIn from "./components/SignIn/SignIn";
import VerifyCode from "./components/VerifyCode/VerifyCode";
import ResetPass from "./ResetPass/ResetPass";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/sendmailforgetpassword"
            element={<SendMailForgetPassWord />}
          />
          <Route path="/verifycode" element={<VerifyCode />} />
          <Route path="/resetpass" element={<ResetPass />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
