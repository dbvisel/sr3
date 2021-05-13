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
_/daa/footer.mdx_ is the footer for the front page of the site and any report that doesn't have its own footer.

Each report has its own _config.json_ and _index.mdx_ and can have its own _footer.mdx_. They can also have datasets in _/[report_id]/datasets_ and texts in _/[report_id]/texts_. 

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