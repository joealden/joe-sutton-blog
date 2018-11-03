import React from "react";
import styled from "../utils/styled-components";

class Info extends React.Component {
  render() {
    return (
      <InfoContainer>
        <DetailsContainer>
          <p>testing</p>
        </DetailsContainer>
      </InfoContainer>
    );
  }
}

export default Info;

const InfoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  z-index: 1000;
  width: var(--column-width);
  transform: translateX(calc(var(--column-width) * -1));

  background-color: ${props => props.theme.backgroundColor};
  border-right: 1px solid ${props => props.theme.lineColor};

  transition: background-color ${props => props.theme.transition},
    border ${props => props.theme.transition};
`;

const DetailsContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
  }
`;
