module.exports = {
  siteMetadata: {
    title: "Joe Sutton's Blog",
    // Needs changing. Used for sitemap + robots-txt
    siteUrl: "https://placeholder.com"
  },
  plugins: [
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
        // This path is relative to the root of the site.
        icon: "src/images/gatsby-icon.png"
      }
    },
    "gatsby-plugin-offline"
  ]
};
