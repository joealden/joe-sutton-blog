import React from "react";
import styled from "../../utils/styled-components";

type AboutProps = {
  isOpen: boolean;
  close: () => void;
};

const About: React.FunctionComponent<AboutProps> = ({ isOpen, close }) => (
  <>
    <AboutContainer
      style={{
        top: isOpen ? `${window.pageYOffset}px` : "0",
        visibility: isOpen ? "visible" : "hidden",
        opacity: isOpen ? 1 : 0
      }}
    >
      <InnerContainer>
        <TopContainer>
          <CloseButtonContainer>
            <button onClick={close}>Close</button>
          </CloseButtonContainer>
          <AboutDetails>
            <Description>
              <p>
                Listed is a place for creatives to find inspiration for upcoming
                projects. The site is regularly updated to showcase the latest
                in current design, so you can be sure Listed will have the
                resources you need to find the art direction of your next
                project.
              </p>
            </Description>
            <InstagramLink>
              <a
                href="https://www.instagram.com/listed.design/"
                rel="noreferrer noopener"
                target="_blank"
              >
                Follow our Instagram
              </a>
            </InstagramLink>
          </AboutDetails>
        </TopContainer>
        <BottomContainer>
          <CreditLinks>
            <div>
              <span>Design: </span>
              <span>
                <a
                  href="https://joesutton.co"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  Joe Sutton
                </a>
              </span>
            </div>
            <div>
              <span>Dev: </span>
              <span>
                <a
                  href="https://joealden.com"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  Joe Alden
                </a>
              </span>
            </div>
          </CreditLinks>
        </BottomContainer>
      </InnerContainer>
    </AboutContainer>
    <AboutOverlay
      style={{
        visibility: isOpen ? "visible" : "hidden"
      }}
      onClick={close}
    />
  </>
);

export default About;

const AboutContainer = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  border-left: 1px solid ${props => props.theme.lineColor};
  background-color: ${props => props.theme.backgroundColor};
  z-index: 100000;
  transition: opacity ${props => props.theme.transition},
    visibility ${props => props.theme.transition};
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;

  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;

  a {
    color: ${props => props.theme.foregroundColor};
    transition: color ${props => props.theme.transition};

    &:hover {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const TopContainer = styled.div``;
const BottomContainer = styled.div``;

const CloseButtonContainer = styled.div`
  height: 60px;
  min-height: 60px;
  display: flex;
  padding: 0 20px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.backgroundColor};
  z-index: 1000000;
`;

const AboutDetails = styled.div`
  padding: 0 30px;

  /* Figure out a better way to align this */
  margin-top: calc(12.91vw - 20px);
  @media screen and (max-width: 2000px) {
    margin-top: calc(12.91vw - 18px);
  }
  @media screen and (max-width: 1300px) {
    margin-top: calc(12.91vw - 16px);
  }
`;

const Description = styled.div`
  p {
    margin: 0;
    margin-right: 15px;
    line-height: 150%;
  }
`;

const InstagramLink = styled.div`
  margin: 90px 0;
`;

const CreditLinks = styled.div`
  padding: 0 30px 25px 30px;

  div {
    span:first-child {
      color: #838383;
    }
  }

  div:first-child {
    margin-bottom: 5px;
  }
`;

const AboutOverlay = styled.div`
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  transition: visibility ${props => props.theme.transition};
`;
