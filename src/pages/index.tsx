import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const HomePage: React.SFC = () => (
  <>
    <Link to="/">Go to home page</Link>
    <Link to="/gallery">Go to gallery page</Link>
    <Link to="/posts">Go to all posts page</Link>
    <Heading>Home Page</Heading>
    <p>3 days of Featured Link/Post in a carousel/slider</p>
    <p>Featured Image/Shot</p>
  </>
);

const Heading = styled.h1`
  color: blue;
`;

export default HomePage;
