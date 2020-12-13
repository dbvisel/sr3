# sr3: Southeast Asian Archaeological Site Reports

Public version: http://epress.nus.edu.sg/sitereports/

Working version: https://sitereports.netlify.app

To install: 

> npm install

To develop: 

> npm start

To build locally or for top level:

> npm run build

To build for deployment:

> npx gatsby build --prefix-paths

(Prefix path is set in _gatsby-config.js)

# Content

Content goes in _/data/[report_id]_. Images go in _/static/[report_id]/images_

_/data/config.json_ are settings for the whole thing – and the list of reports that go in this.
_/data/index.mdx_ is the front page for the site.
_/daa/footer.mdx_ is the footer for the front page of the site and any report that doesn't have its own footer.

Each report has its own _config.json_ and _index.mdx_ and can have its own _footer.mdx_. They can also have datasets in _/[report_id]/datasets_ and texts in _/[report_id]/texts_. 

# Bugs:

- http://localhost:8000/scc/dataset/eware/id/eware_006XX/

Image link is poorly formed. Fix this.

# TODO:

##  datasets:
  * Maybe move to CSS grid?
  * thumbnails + image records 
  * links to object pages (more of them)

##  object pages
 * multiple linked records: http://localhost:8000/scc/dataset/eware/id/eware_3902

## navigation: 
 * 404 menu? Should this be smart or not?
  
## text:

 * React doesn't like the weird namespace thing in the footer

## build

  * better way to deal with images?
    * is there another path that we're using for object?
    * do I actually need to generate so many object pages?

## various improvements:

 * Theming
   * Could use ThemeProvider for a light/dark theme switcher: https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/
 * Improve the table headers:
   * https://css-tricks.com/position-sticky-and-table-headers/
   * https://github.com/thebuilder/react-intersection-observer#readme

Maybe use <datalist> rather than <select> in table headers? Does that make sense? We could use that for filtering.

## REMEMBER

 * Environment variables: none at the moment!
 * This is using Git/Netlify LFS, as described here: https://css-tricks.com/getting-netlify-large-media-going/
  If there's trouble, try source /Users/dan/.netlify/helper/path.bash.inc
  (does this break everything?)
