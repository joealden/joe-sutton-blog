import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const PostsPage: React.SFC = () => (
  <>
    <Link to="/">Go to home page</Link>
    <Link to="/gallery">Go to gallery page</Link>
    <Link to="/posts">Go to all posts page</Link>
    <Heading>Posts Page</Heading>
    <p>Filter by tags and categories</p>
    <p>View types of grid and list</p>
  </>
);

const Heading = styled.h1`
  color: green;
`;

export default PostsPage;
