import React from "react";

interface HTMLProps {
  htmlAttributes: Object;
  headComponents: Array<any>;
  bodyAttributes: Object;
  preBodyComponents: Array<any>;
  body: string;
  postBodyComponents: Array<any>;
}

class HTML extends React.Component<HTMLProps> {
  render() {
    return (
      <html {...this.props.htmlAttributes} lang="en">
        <head>
          <title>Listed</title>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="description"
            content="Listed - A curated list of inspirational design"
          />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}

export default HTML;
