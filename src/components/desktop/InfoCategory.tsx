import React from "react";
import styled from "../../utils/styled-components";

interface InfoCategoryProps {
  category: string;
  selectedCategory: string | null;
  setSelectedCategory: (selectedCategory: string) => void;
  closeInfo: () => void;
}

interface InfoCategoryState {
  showTooltip: boolean;
  mouseX: number;
  mouseY: number;
}

class InfoCategory extends React.Component<
  InfoCategoryProps,
  InfoCategoryState
> {
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

  onClick = () => {
    const { category, setSelectedCategory, closeInfo } = this.props;
    setSelectedCategory(category);
    this.setState({ showTooltip: false });
    closeInfo();
  };

  render() {
    const { category, selectedCategory } = this.props;
    const { showTooltip, mouseX, mouseY } = this.state;
    const { onMouseMove, onMouseEnter, onMouseLeave, onClick } = this;

    return (
      <>
        {selectedCategory === category ? (
          <NoClickCategory>{category}</NoClickCategory>
        ) : (
          <Category
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            onClick={onClick}
          >
            {category}
          </Category>
        )}

        <CategoryTooltip
          style={{
            transform: `translateX(${mouseX}px) translateY(${mouseY}px) translateZ(0px)`,
            opacity: showTooltip ? 1 : 0,
            visibility: showTooltip ? "visible" : "hidden"
          }}
        >
          Change Category Filter
        </CategoryTooltip>
      </>
    );
  }
}

export default InfoCategory;

const NoClickCategory = styled.span``;

const Category = styled.span`
  cursor: pointer;
  transition: color ${props => props.theme.transition};

  &:hover {
    color: ${props => props.theme.accentColor};
  }
`;

const CategoryTooltip = styled.span`
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
