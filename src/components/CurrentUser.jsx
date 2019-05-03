import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signOut } from "../firebase";
import moment from "moment";

const CurrentUser = ({ displayName, photoURL, email, createdAt, children, history }) => {
  // console.log(history)

  const handleLogOut = () => {
    history.push('/');
    signOut();
  }

  return (
    <section className="CurrentUser">
      <div className="CurrentUser--profile">
        {photoURL && <img src={photoURL} alt={displayName} />}
        <div className="CurrentUser--information">
          <Link to="profile">
            <h2>{displayName}</h2>
          </Link>
          <p className="email">{email}</p>
          {createdAt ? (
            <p className="created-at">
              {moment(createdAt.toDate()).calendar()}
            </p>
          ) : null}
        </div>
      </div>
      <div>
        <div>{children}</div>
        <button onClick={handleLogOut}>Sign Out</button>
      </div>
    </section>
  );
};

// CurrentUser.defaultProps = {
//   displayName: "Bill Murray",
//   email: "billmurray@mailinator.com",
//   photoURL: "https://www.fillmurray.com/300/300",
//   createdAt: new Date()
// };

export default withRouter(CurrentUser);
