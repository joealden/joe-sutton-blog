import React from "react";
import styled from "../../utils/styled-components";

type AboutProps = {
  isOpen: boolean;
  close: () => void;
};

const About: React.FunctionComponent<AboutProps> = ({ isOpen, close }) => (
  <AboutWrapper
    style={{
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? "visible" : "hidden"
    }}
  >
    <div>
      <button onClick={close}>Close</button>
    </div>
    <div>
      <h2>About</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <a
        /* An instagram account needs to be created */
        href="https://www.instagram.com/listeddesign/"
        rel="noreferrer noopener"
        target="_blank"
      >
        Follow our Instagram
      </a>
    </div>
    <CreditLinks>
      <div>
        <a
          href="https://joesutton.co"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span>Design: </span>
          <span>Joe Sutton</span>
        </a>
      </div>
      <div>
        <a
          href="https://joealden.com"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span>Dev: </span>
          <span>Joe Alden</span>
        </a>
      </div>
    </CreditLinks>
  </AboutWrapper>
);

export default About;

const AboutWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: ${props => props.theme.backgroundColor};
  transition: opacity ${props => props.theme.transition},
    visibility ${props => props.theme.transition};
  z-index: 10000;

  > div:first-child {
    height: 60px;

    button {
      padding: 18px 20px;
    }
  }

  > div:nth-child(2) {
    h2 {
      margin: 100px 20px 35px 20px;
      font-size: 32px;
    }

    p {
      margin: 0 25px 0 20px;
      color: #838383;
      max-width: 450px;
    }

    a {
      display: block;
      color: ${props => props.theme.foregroundColor};
      margin-top: 15px;
      padding: 20px;
    }
  }
`;

const CreditLinks = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  margin: 0 16px 16px 16px;

  a {
    color: ${props => props.theme.foregroundColor};
    display: block;
    padding: 4px;
  }

  div {
    span:first-child {
      color: #838383;
    }
  }
`;
