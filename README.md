# sr3

Gatsby-based version of site reporter code

Author on report config should be default, overridden by text's author if it exists

TODO:
 * datasets:
   * Maybe move to CSS grid?
   * thumbnails + image records
	 * links to object pages (more of them)
 * object pages
	 * multiple images?
	 * multiple linked records: http://localhost:8000/scc/dataset/eware/id/eware_3902
 * navigation:
	 * 404 menu? Should this be smart or not?
 * text:
	 * React doesn't like the weird namespace thing in the footer
 * build
   * better way to deal with images?
	 * is there another path that we're using for object?
	 * do I actually need to generate so many object pages?
 * data
	 * jambi? probably doesn't exist

# Table header remember:

 * https://css-tricks.com/position-sticky-and-table-headers/
 * https://github.com/thebuilder/react-intersection-observer#readme
 
Maybe use <datalist> rather than <select> in table headers? Does that make sense? We could use that for filtering.

## REMEMBER

 * This is using Git/Netlify LFS, as described here: https://css-tricks.com/getting-netlify-large-media-going/
   If there's trouble, try source /Users/dan/.netlify/helper/path.bash.inc