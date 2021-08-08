# sr3: Southeast Asian Archaeological Site Reports

Public version: http://epress.nus.edu.sg/sitereports/

Working dev version: https://sitereports.netlify.app

To install (note that this repository is very large because of all the images in _/static_): 

```npm install```

To develop: 

```npm start```

To build locally or for top level:

```npm run build```

To build for deployment:

```npx gatsby build --prefix-paths```

(Prefix path is set by pathPrefix in _gatsby-config.js_)

# Technical overview

This turns text files and datasets into a static site. It's build in React, using Gatsby, though it's not tightly particularly tied to that framework. Datasets are internally JSON, though you could pull them in from elsewhere – in the past we've used Google Docs. Text files are handled in MDX, which is Markdown flavored with React; MDX is used to handle footnotes, links, multilingual sections, and table inclusions that straight Markdown can't handle. Styling is handled with styled-components.

Because the result of this is a static site, it can be hosted anywhere. 

# How it works

## Content overview

Content goes in _/data/[report_id]_. Images go in _/static/[report_id]/images_. Yes, it would be more logical to have images in /data/, but then they'd have to be moved on build, which already takes forever.

_/data/config.json_ are settings for the whole thing – and the list of reports that go in this.
_/data/index.mdx_ is the front page for the site.
_/data/footer.mdx_ is the footer for the front page of the site and any report that doesn't have its own footer.

Each report has its own _config.json_ and _index.mdx_ and can have its own _footer.mdx_. They can also have datasets in _/[report_id]/datasets_ and texts in _/[report_id]/texts_. 

## Project-level configuration

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

[TODO: explain how Airtable datasets work with this. And maybe Google Docs?]

## Report-level configuration

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
   - `id`: string. A unique ID for the dataset, used to identify it later. This should match what's given as the page's slug when you make the text file's front matter; if it doesn't, the link in the TOC won't work. 
   - `name`: string. The name for the dataset. This value is used in the TOC on the left, so it can be the short name.
   - `grouping`: string. In some cases, you want datasets to have a grouping – e.g. in SCC, they're sorted into "Artifact data", "Summary data", and "Images" and indented under those headers. If you include this, datasets will be put in the grouping that's used here; groupings appear in the order that you put them in. This isn't very robust.

And each report should have an _index.mdx_ and a _footer.mdx_, though the latter is optional (the project footer will be used). For your _footer.mdx_, set `report` equal to the _id_ in the report's _config.json_ (as you should for every text file). Set `title` to "footer". You don't need to include a path or a date. For your _index.mdx_, set `report` to the report ID, and `path` to _/report_ where "report" is your report ID. Nothing will break if you don't have an _index.mdx_ with the path set to _/report_, but when you go to that URL you'll get a 404 page; subpages will still work, but you won't have a way to get to them.  

## Text files

Text files are currently done in MDX. They generally live in a report directory, in _/report/texts/_ where "report" is the report ID, though it doesn't actually matter where you put them, that's just convention. Note that just because you have a text file doesn't mean that a text file will automatically appear in a reports TOC – that's intentional. For a text file to appear in a TOC, it needs to appear in the report's _config.json_ in the _texts_ array.

In the MDX frontmatter, you should set:

 - `report`: which should be the report ID. 
 - `slug`: which is what the path of the text file should be from the site root. E.g.: "/scc/text/statistics". This could be dynamically generated if we gave each text file an ID, but we didn't; this means you can stick the files anywhere.
 - `title`: string, the title of the page. If this isn't set, the page won't have a title, but that's probably okay.

You can also set:

 - `subtitle`: a page's subtitle, if it needs one.
 - `author`: a page's author; if this is not set, it will fall back on the report's author.
 - `date`: a page's date; if this is not set, it will fall back on the report's _lastUpdated_.

Because textfiles are MDX, they can use React components, though it's a bit of a pain. Use &lt;Figure /> for figures, &lt;BaseLink /> for links inside the site (so that the browser doesn't reload everything), and &lt;FootnoteCallout> and &lt;Footnote /> for footnotes. There's also &lt;BilingualSection /> for multilingual sections as used in MSATP.

## Data sets

These are very complicated! These are JSON files. They consist of:

 - `reportID`: string, the ID for the report that the dataset is part of. Required.
 - `id`: string, a unique ID for this particular dataset. This is used for the slug, among other things. Required.
 - `name`: string, the name for the dataset. This is not the name that appears in the TOC; that's set in the report's _config.json_.
 - `defaultSort`: the ID of a field defined in fields. This is the field that will be used to sort the data by default. What happens if this is not set?
 - `fields`: an array of objects. This describes the shape of the data that's in `data`. More later.
 - `data`: an array of objects, in this case the actual data. More later.

Optional fields:

 - `source`: string. This is used editorially – the filename that this data came from, e.g. "Stoneware final for database.xlsx". Not actually used on the code. 
 - `editedDate`: string. This could be used editorially – the date that the data was last edited. Not actually used in the code.
 - `notes`: string. This could be used editorially for notes. Not used in the code.

Note that not all datasets get their own pages: only a dataset that appears in a report's `datasets` list appears in the TOC for the report and gets its own page. This is very much intentional: datasets can also be used for tables that appear inside a text document.

### Fields

The fields array describes all the fields that will be used. Each field entry consists of a couple of mandatory items:

 - `fieldKey`: string, the ID for the field. Required. This is used internally to refer to the field (in _data_, for example).
 - `fieldName`: string, the name of the field. Required. This is what's shown at the top of the table.

There are also optional values, some of which are more important than others:

 - `fieldHidden`: boolean, default `false`. If this is true, this field is not shown on the table (but it may be used internally). A common use of this is to have a field which just numbers the objects; the number is not shown.
 - `fieldNameShort`: string, an optional short name for the field. 
 - `fieldUnit`: string, a name for the units of a number field – e.g. "g" for weight in grams.  Instead of having _fieldName_ as "Weight in grams", _fieldName_ should be "Weight" and _unit_ should be "g", with the result being "Weight (g)".
 - `superField`: string, a name for a superfield that this field should be listed under. All fields that have the same superfield are shown together in the order in which they appear in the fields list.
 - `fieldValues`: array, values that the field can hold. This is not strictly enforced! But you'll get a drop-down selector at the top of a field with _fieldValues_ set. A sample: _["Rim", "Base", "Lid"]_ would give you three values. Values should be strings and in the order in which you want them to appear.
 - `sortMethod`: string, can be "alphabetical", "number", or "integer"; if left blank, defaults to "alphabetical". Alphabetical sorting is by Javascript alphabetical sorting: so 42 comes before 5 because it's being treated as a string. "Integer" converts everything to a string and sees what happens. "Number" treats values as floating point. Data is messy! And you might not get what you want. Note that this is overridden if the `fieldtype` is set to "date", where sorting by date happens.
 - `fieldType`: TODO: get all the values for this: "link", "filename", "binary", "imageLink", "date". 
  - If this is set to "link" and `linkExists` is true, a link can be made to a data object with a particular ID. 
 - `linkExists`: Boolean. If this is `true` and `fieldType` is "link" or "imageLink", you can make a link from this cell to the dataset with the value in the field pointed to by `linksToKey`.
 - `linkToDataSet`: String. For links. This is the fieldKey that contains the dataset ID to link to.
 - `linksToKey`: string, For links. Needs to match a fieldKey of a field, which holds the ID of an object in a dataset to link to.
 - `canBeArray`: Boolean, default false. If this is true, the values for this field can be an array. Used for links.
 - `fieldLink`: boolean. If this is true, the field becomes a link to the data object page.
 - `fieldNameShown`: string, the name of a field: for links, this was the name of the field that should be shown instead of whatever the fieldName was. 
 - `fieldTransform`: string, the name of a function to transform a string – values being used are "toLowerCase", "titleCase". If this was set to "titleCase", for example, all data values of that field would be transformed to title case.


### Data

Data is an array of objects; each object should have a key that's been defined as a `fieldKey` in the _fields_ section. This is then transformed into a row of data.

It should be noted that this is all very loosely typed – we're working on the assumption that we have very messy data sets, and consequently very messy data. There isn't a huge amount of error-checking!

It should be noted that a lot of the datasets started their life as a spreadsheet of some kind; I went through and added metadata and a _fields_ section; set the header row to the `fieldKey`s; and then ran a CSV2JSON (there are command-line versions of these as well as online versions; almost anything will be fine for our purposes) and put the resulting JSON as the `data` object.

# Improvements:

## Methodology

 * Move all of this to TypeScript, especially DataSet and DataObjectElement are a mess.

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

Maybe use &lt;datalist> rather than &lt;select> in table headers? Does that make sense? We could use that for filtering.

## FIXES/IMPROVEMENTS:

 - there's something weird going on with filtering/pagination in datasets
 - need to deal with dates (display, sorting)
 - SEO – need to have descriptions for each project. An image for each project would be good too.
   - how do we do this with data object pages?
 - Slashes at the ends of paths. Would be good to implement gatsby-plugin-force-trailing-slashes, though this breaks the build and will take some time to get right.
 - Should add a site map

## REMEMBER

 - Environment variables: just the Airtable API key (AIRTABLE_API_KEY)
 - This is using Git/Netlify LFS, as described here: https://css-tricks.com/getting-netlify-large-media-going/
  If there's trouble, try source /Users/dan/.netlify/helper/path.bash.inc
  (does this break everything?)
 - Keep the _.prettierignore_ in there, otherwise MDX files can get screwed up on save. 
 - Google Docs: https://github.com/cedricdelpoux/gatsby-source-google-docs