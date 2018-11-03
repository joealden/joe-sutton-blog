module.exports = {
  siteMetadata: {
    title: "Joe Sutton's Blog",
    // Needs changing. Used for sitemap + robots-txt
    siteUrl: "https://placeholder.com"
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
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-robots-txt",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Joe Sutton's Blog",
        short_name: "Joe Sutton's Blog",
        start_url: "/",
        background_color: "#FFFFFF",
        theme_color: "#000000",
        display: "minimal-ui",
        icon: "src/images/gatsby-icon.png"
      }
    }
  ]
};
