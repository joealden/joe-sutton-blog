module.exports = {
  pathPrefix: "/",

  siteMetadata: {
    title: "Listed",
    siteUrl: "https://listed.design"
  },

  plugins: [
    {
      resolve: "gatsby-source-contentful",
      /* Revoke this token and create a new one through an env variable when finished */
      options: {
        spaceId: `mxz8f4tr5n6u`,
        accessToken: `d2462b5dba8a51ce5d581b41eb730a7b454378c49404aab77a2dbcf0abae0a88`
      }
    },
    "gatsby-plugin-typescript",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-robots-txt",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Listed",
        short_name: "Listed",
        start_url: "/",
        background_color: "#FFFFFF",
        theme_color: "#111111",
        display: "standalone",
        icon: "src/images/listed-icon.png"
      }
    },
    "gatsby-plugin-offline",
    /* "gatsby-plugin-remove-serviceworker" */
    "gatsby-plugin-netlify"
  ]
};
