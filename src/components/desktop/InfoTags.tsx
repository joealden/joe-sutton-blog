import React from "react";
import styled from "../../utils/styled-components";

interface InfoTagsProps {
  postTags: Array<string>;
  selectedTags: Array<string>;
  addTagToSelectedTags: (tagToAdd: string) => void;
}

interface InfoTagsState {
  showTooltip: boolean;
  mouseX: number;
  mouseY: number;
}

class InfoTags extends React.Component<InfoTagsProps, InfoTagsState> {
  state = {
    showTooltip: false,
    mouseX: 0,
    mouseY: 0
  };

  onMouseEnter = () => this.setState({ showTooltip: true });
  onMouseLeave = () => this.setState({ showTooltip: false });

  onMouseMove = (event: React.MouseEvent<HTMLSpanElement>) =>
    this.setState({
      mouseX: event.clientX + 15,
      mouseY: event.clientY + 20
    });

  onClick = (tag: string) => {
    const { addTagToSelectedTags } = this.props;
    addTagToSelectedTags(tag);
    this.setState({ showTooltip: false });
  };

  render() {
    const { postTags, selectedTags } = this.props;
    const { showTooltip, mouseX, mouseY } = this.state;
    const { onMouseMove, onMouseEnter, onMouseLeave, onClick } = this;

    return (
      <>
        <div>
          {postTags.reduce((acc, currentTag, i) => {
            const isLastTag = i === postTags.length - 1;
            const punctuation = isLastTag ? "." : ", ";

            return [
              ...acc,
              <React.Fragment key={currentTag}>
                {selectedTags.includes(currentTag) ? (
                  <NoClickTag>{currentTag}</NoClickTag>
                ) : (
                  <Tag
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onMouseMove={onMouseMove}
                    onClick={() => onClick(currentTag)}
                  >
                    {currentTag}
                  </Tag>
                )}
                {punctuation}
              </React.Fragment>
            ];
          }, [])}
        </div>

        <TagTooltip
          style={{
            transform: `translateX(${mouseX}px) translateY(${mouseY}px) translateZ(0px)`,
            opacity: showTooltip ? 1 : 0,
            visibility: showTooltip ? "visible" : "hidden"
          }}
        >
          Add Tag to Filter
        </TagTooltip>
      </>
    );
  }
}

export default InfoTags;

const NoClickTag = styled.span``;

const Tag = styled.span`
  cursor: pointer;
  transition: color ${props => props.theme.transition};

  &:hover {
    color: ${props => props.theme.accentColor};
  }
`;

const TagTooltip = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.foregroundColor};
  color: ${props => props.theme.backgroundColor};
  z-index: 100000;
  transition: opacity ${props => props.theme.transition},
    visibility ${props => props.theme.transition};

  font-size: 18px;
  padding: 10px 15px;

  @media screen and (max-width: 2000px) {
    font-size: 16px;
    padding: 9px 14px;
  }
  @media screen and (max-width: 1300px) {
    font-size: 14px;
    padding: 8px 13px;
  }
`;
