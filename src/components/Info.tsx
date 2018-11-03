import React from "react";
import styled from "../utils/styled-components";

interface InfoProps {
  toggleInfo: () => void;
}

class Info extends React.Component<InfoProps> {
  render() {
    const { toggleInfo } = this.props;

    return (
      <InfoContainer>
        <InnerContainer>
          <CloseButtonContainer>
            <button onClick={toggleInfo}>Close</button>
          </CloseButtonContainer>
          <DetailsContainer>
            <p>testing</p>
          </DetailsContainer>
        </InnerContainer>
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

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 60px;
  padding: 0 20px;

  button {
    transition: color ${props => props.theme.transition};

    &:hover {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const DetailsContainer = styled.div`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
  }
`;
