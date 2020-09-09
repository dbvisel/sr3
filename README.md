# sr3

Gatsby-based version of site reporter code

Author on report config should be default, overridden by text's author if it exists

BUGS:

- http://localhost:8000/scc/dataset/eware/id/eware_006XX/

Image link is poorly formed. Fix this.

TODO:

- datasets:
  - Maybe move to CSS grid?
  - thumbnails + image records \* links to object pages (more of them)
- object pages
  _ multiple images?
  _ multiple linked records: http://localhost:8000/scc/dataset/eware/id/eware_3902
- navigation: \* 404 menu? Should this be smart or not?
- text: \* React doesn't like the weird namespace thing in the footer
- build
  - better way to deal with images?
    _ is there another path that we're using for object?
    _ do I actually need to generate so many object pages?
- data \* jambi? probably doesn't exist

Could use ThemeProvider for a light/dark theme switcher: https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/

# Table header remember:

- https://css-tricks.com/position-sticky-and-table-headers/
- https://github.com/thebuilder/react-intersection-observer#readme

Maybe use <datalist> rather than <select> in table headers? Does that make sense? We could use that for filtering.

## REMEMBER

- This is using Git/Netlify LFS, as described here: https://css-tricks.com/getting-netlify-large-media-going/
  If there's trouble, try source /Users/dan/.netlify/helper/path.bash.inc
  (does this break everything?)
