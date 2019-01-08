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
          <link
            /**
             * NOTE:
             * Only preload woff2 version of font as browsers that
             * support the preload hint also support the woff2 font
             * format. See the following links for the browser support
             * for these features:
             *
             * https://caniuse.com/#feat=link-rel-preload
             * https://caniuse.com/#feat=woff2
             *
             * Also, if we preloaded the woff version of the font, the
             * browsers that support woff2 would also download the woff
             * version. This would be completely pointless.
             */
            rel="preload"
            href="static/SuisseIntl-Regular.woff2"
            as="font"
            /* type="font/woff2" */
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
