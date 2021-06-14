# sr3: Southeast Asian Archaeological Site Reports

Public version: http://epress.nus.edu.sg/sitereports/

Working version: https://sitereports.netlify.app

To install: 

```npm install```

To develop: 

```npm start```

To build locally or for top level:

```npm run build```

To build for deployment:

```npx gatsby build --prefix-paths```

(Prefix path is set by pathPrefix in _gatsby-config.js_)

# Content

Content goes in _/data/[report_id]_. Images go in _/static/[report_id]/images_. Yes, it would be more logical to have images in /data/, but then they'd have to be moved on build, which already takes forever.

_/data/config.json_ are settings for the whole thing – and the list of reports that go in this.
_/data/index.mdx_ is the front page for the site.
_/data/footer.mdx_ is the footer for the front page of the site and any report that doesn't have its own footer.

Each report has its own _config.json_ and _index.mdx_ and can have its own _footer.mdx_. They can also have datasets in _/[report_id]/datasets_ and texts in _/[report_id]/texts_. 

# Project-level configuration

`/data/config.json` is key to the whole project. This contains:

 - `id`: string. This needs to be set to "project",
 - `project`: object. Consisting of:
	 - `id`: string. This needs to be set to "project".
	 - `projectTitle`: string. This is used for the title of the full site, and the fallback title for reports/pages that don't have a title.
	 - `projectAuthor`: string. This is used as the author attribution of the full site, as well as fallback for authorless pages.
	 - `lastUpdated`: string, something like "27 November 2021"; this is used in the footer or where reports don't have their own date.
	 - `makeObjectPages`: boolean. Set this to **true** to make pages for individual objects. Should be **true** for production. Setting this to **false** during development will make the process much faster as it won't rebuild thousands of pages every time Markdown is edited.
	 - `possibleReports`: an array of objects, one for each report that can be used. Each object contains:
  	 - `id`: a unique id for a report; this is used as a slug, and also used to identify files from the report.
  	 - `name`: a name for a report, used in the left menu. This should be the short version of the name to fit in the menu: hence, "SCC", not "Singapore Cricket Club Report #1"
   - `excludedReports`: an array of strings. If the ID of a report in `possibleReports` is included here, it will not be generated. Use this during development to make things faster. This is probably not safe for production yet.

There are two other required files for the project, `/data/index.mdx` and `/data/footer.mdx`. These are MDX files. _index.mdx_ needs to have _path_ set to "project"; _footer.mdx_ needs to have _report_ set to "project". _index.mdx_ is what's shown on the front page of the site. _footer.mdx_ is the default footer for the site (which can be overwritten by individual report's footers, if they have one).

# Report-level configuration

You can theoretically have as many reports as you like. By convention, each report should live in its own directory inside of _data_ with the same filename as the ID listed in _possibleReports_ in the project _config.json_. So the Singapore Cricket Club is given the ID _scc_ in the main _config.json_, the directory should be _/data/scc_. It's worth noting that this doesn't actually impact function, but it helps keep things organized; it is needed for static files in, for example, _/static/scc_ – if "scc" is changed there, the images won't be found.

Here's what's in an individual report's _config.json_: 

 - `id`: string. This needs to be what's in _config.json_'s _possibleReports_.
 - `title`: string. This is the title for the individual report as it appears at the top of the page. The short version of the title – which appears on the left menu on the front of the site – is set in the main _config.json_, not here.
 - `author`: string. The author of the report. This appears on the front page of the report; it will appear on all text pages inside the report unless the page declares an individual author for the page. If this value is not set, it defaults to what's in the main _config.json_.
 - `lastUpdated`: string. The date this report was last updated. This will be used if an individual text page or dataset in the report does not have a date. These are strings; we might want to in the future make these a standardized date format so we could sort reports? Not being done yet.
 - `texts`: array of objects. These are the texts, in the order that you want them to appear in as part of the table of contents, that are part of the report (aside from the front page). Each one consists of:
   - `id`: string. A unique ID for the text, used to identify it later. This is also used as the page's slug.
   - `name`: string. The name for the text. This value is used in the TOC on the left, so it can be the short name.
 - `datasets`: array of objects. These are the datasets, in the order that you want them to appear. Each one consists of:
   - `id`: string. A unique ID for the dataset, used to identify it later. This is also used as the page's slug.
   - `name`: string. The name for the dataset. This value is used in the TOC on the left, so it can be the short name.
   - `grouping`: string. In some cases, you want datasets to have a grouping – e.g. in SCC, they're sorted into "Artifact data", "Summary data", and "Images" and indented under those headers. If you include this, datasets will be put in the grouping that's used here; groupings appear in the order that you put them in. This isn't very robust.



# Improvements:

## Methodology

 * Move all of this to TypeScript, especially DataSet and DataObjectElement are a mess.

##  Datasets:

  * thumbnails + image records (put these back in)
  * links to object pages (more of them)

## Text pages:

 * React doesn't like the weird namespace thing in the footer
 * Searching text files
 * MDX is terrible! 
 * A better way of dealing with bibliographies?

## Build

  * better way to deal with images?
    * is there another path that we're using for object?
    * do I actually need to generate so many object pages?

## Random ideas

 * Theming
   * Could use ThemeProvider for a light/dark theme switcher: https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/
 * Improve the table headers:
   * https://css-tricks.com/position-sticky-and-table-headers/
   * https://github.com/thebuilder/react-intersection-observer#readme
   * https://webup.org/blog/sticky-header-table-with-react-hooks/

Maybe use <datalist> rather than <select> in table headers? Does that make sense? We could use that for filtering.

## FIXES/IMPROVEMENTS:

 * Slashes at the ends of paths. Would be good to implement gatsby-plugin-force-trailing-slashes, though this breaks the build and will take some time to get right.
 * Should add a site map
 * Probably upgrade to Gatsby 3?

## REMEMBER

 * Environment variables: none at the moment!
 * This is using Git/Netlify LFS, as described here: https://css-tricks.com/getting-netlify-large-media-going/
  If there's trouble, try source /Users/dan/.netlify/helper/path.bash.inc
  (does this break everything?)
 * Keep the _.prettierignore_ in there, otherwise MDX files can get screwed up on save. 