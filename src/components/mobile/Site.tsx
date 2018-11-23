import React from "react";
import styled from "../../utils/styled-components";

import { Post } from "../../pages/index";

import Logo from "../icons/Logo";

interface SiteProps {
  toggleTheme: () => void;
  posts: Array<Post>;
}

const Site: React.FunctionComponent<SiteProps> = ({ toggleTheme, posts }) => (
  <SiteWrapper>
    <header>
      <div>
        <Logo />
      </div>
      <div>
        <button>
          <span>Filter</span>
        </button>
      </div>
      <div>
        <button>---</button>
      </div>
    </header>
    <ul>
      {posts.map(post => (
        <li key={post.id} onClick={() => alert("test")}>
          <span>{post.title}</span>
          <span>{post.category}</span>
        </li>
      ))}
    </ul>
  </SiteWrapper>
);

export default Site;

const SiteWrapper = styled.div`
  font-size: 18px;

  > header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.backgroundColor};
    z-index: 1000;

    height: 60px;
    min-height: 60px;
    /* 8px on right because button has 10px padding */
    margin: 0 10px 0 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    > div {
      display: flex;
      align-items: center;
    }

    > div:nth-child(2) {
      justify-content: center;

      button {
        color: ${props => props.theme.accentColor};

        span {
          border-bottom: 1px solid ${props => props.theme.accentColor};
        }
      }
    }

    > div:nth-child(3) {
      justify-content: flex-end;
    }
  }

  > ul {
    list-style: none;
    padding: 0;
    /* 130px because header is 60px (60px + 70px) */
    margin: 130px 0 70px;

    li {
      display: flex;
      justify-content: space-between;
      padding: 12px 20px;

      span:first-child {
        font-size: 7vw;
        letter-spacing: -0.3vw;
        line-height: 70%;
      }

      span:last-child {
        opacity: 0.5;
        line-height: 70%;
        display: flex;
        align-items: flex-end;
        font-size: 14px;

        @media screen and (min-width: 550px) {
          font-size: 16px;
        }
        @media screen and (min-width: 700px) {
          font-size: 18px;
        }
      }
    }
  }
`;
