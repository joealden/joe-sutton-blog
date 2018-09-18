import React from "react";
import { Link } from "gatsby";

const NotFoundPage: React.SFC = () => (
  <>
    <Link to="/">Go to home page</Link>
    <Link to="/gallery">Go to gallery page</Link>
    <Link to="/posts">Go to all posts page</Link>
    <h1>This page doesn't exist.</h1>
  </>
);

export default NotFoundPage;
