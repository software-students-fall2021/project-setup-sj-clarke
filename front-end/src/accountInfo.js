import React from "react";
import "./accountInfo.css";

function Account() {
  const user = {
    fName: "Elizabeth",
    lName: "Jiranek",
    username: "ejiranek",
    password: "Fall2021",
  };

  return (
    <div className="Account">
      <header>Account Information</header>
      <p>Change your account information</p>
      <form>
        <label>
          First Name<input type="text" name="fName"></input>
        </label>
        <label>
          Last Name<input type="text" name="lName"></input>
        </label>
        <label>
          Username<input type="text" name="username"></input>
        </label>
        <label>
          Password<input type="password" name="password"></input>
        </label>
      </form>
    </div>
  );
}

export default Account;
