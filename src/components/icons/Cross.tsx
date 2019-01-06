import React from "react";

const Cross: React.FunctionComponent = () => (
  <svg viewBox="0 0 19 19">
    <rect
      x="-2.5"
      y="8.5"
      width="24"
      height="2"
      transform="translate(-3.94 9.5) rotate(-45)"
    />
    <rect
      x="8.5"
      y="-2.5"
      width="2"
      height="24"
      transform="translate(-3.94 9.5) rotate(-45)"
    />
  </svg>
);

export default Cross;
