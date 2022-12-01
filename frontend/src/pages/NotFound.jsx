import React from "react";
import Helmet from "../components/Helmet/Helmet";
import "../styles/not-found.css";

const NotFound = () => {
  return (
    <Helmet title="404 Not Found">
      <div className="not-found">
        <h1>ERROR 404</h1>
        <h2>Page Not Found</h2>
        <p>If you think what you're looking for should be here, please contact the site owner.</p>
      </div>
    </Helmet>
  );
};

export default NotFound;
