import React from "react";
import styled from "../../utils/styled-components";

interface AboutProps {
  isOpen: boolean;
  close: () => void;
}

const About: React.FunctionComponent<AboutProps> = ({ isOpen, close }) => (
  <AboutWrapper
    style={{
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? "visible" : "hidden"
    }}
  >
    <div onClick={close}>About placeholder, click me to dismiss...</div>
  </AboutWrapper>
);

export default About;

const AboutWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;

  background-color: ${props => props.theme.backgroundColor};
  transition: opacity ${props => props.theme.transition},
    visibility ${props => props.theme.transition};
  z-index: 10000;

  div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;
