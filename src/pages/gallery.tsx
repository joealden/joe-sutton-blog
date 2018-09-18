import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const GalleryPage: React.SFC = () => (
  <>
    <Link to="/">Go to home page</Link>
    <Link to="/gallery">Go to gallery page</Link>
    <Link to="/posts">Go to all posts page</Link>
    <Heading>Gallery Page</Heading>
    <p>Masonry Layout of images that I upload and feature daily (Instagram)</p>
  </>
);

const Heading = styled.h1`
  color: red;
`;

export default GalleryPage;
