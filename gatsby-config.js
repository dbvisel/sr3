require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}` || `.env.development`,
});

const datasetConfig = require("./data/config.json");

const getTheAirtableData = (data) => {
  // This loops through the main config and gets all the airtable data out.
  // Note that this assumes that all Airtable bases are using the same API key.
  let outList = [];
  for (let i = 0; i < data.possibleReports.length; i++) {
    if (data.possibleReports[i].airtableDatasets) {
      // check to make sure that this ID is not in the list of excluded reports:
      if (data.excludedReports.indexOf(data.possibleReports[i].id) < 0) {
        // add these airtable table datasets to the list
        outList = outList.concat(data.possibleReports[i].airtableDatasets);
      }
    }
  }
  return outList;
};

module.exports = {
  pathPrefix: process.env.NODE_ENV === "production" ? `/sitereports` : "",
  siteMetadata: {
    title: `NUS Press Site Reports`,
    description: `NUS Press Site Reports`,
    author: `Dan Visel <dbvisel@gmail.com>`,
    siteUrl:
      process.env.NODE_ENV === "production"
        ? `http://epress.nus.edu.sg/sitereports`
        : "https://sitereports.netlify.app",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    // `gatsby-plugin-force-trailing-slashes`,
    //  {
    //       resolve: `gatsby-source-airtable`,
    //       options: {
    //         apiKey: process.env.AIRTABLE_API_KEY,
    //         concurrency: 5,
    //         tables: getTheAirtableData(datasetConfig.project),
    //       },
    //     },

    {
      resolve: `gatsby-plugin-notifications`,
      options: { sound: "Glass", toast: true },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-35006494-3",
        head: false,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx"],
        // gatsbyRemarkPlugins: [
        //   // more on this later
        // ],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `allTheJson`, // a fixed string
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/static/src/images`,
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data`,
        name: "markdown-pages",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-gatsby-cloud`,
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
