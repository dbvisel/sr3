module.exports = {
  pathPrefix: `/sitereports`,
  siteMetadata: {
    title: `sr3`,
    description: `NUS Press Site Reports`,
    author: `Dan Visel <dbvisel@gmail.com>`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-notifications`,
      options: { sound: "Glass", toast: true },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-35006494-3",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
      },
    },
    {
      resolve: "gatsby-mdx",
      options: {
        extensions: [".mdx"],
        gatsbyRemarkPlugins: [
          // more on this later
        ],
      },
    },
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `allTheJson`, // a fixed string
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data`,
        name: "markdown-pages",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `NUS Site Reports`,
        short_name: `sr3`,
        start_url: `/sitereports/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/project/images/nus-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    //`gatsby-plugin-offline`
  ],
};
