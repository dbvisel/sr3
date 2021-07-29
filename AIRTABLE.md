# AIRTABLE THINK-THROUGH

We can get all the data like this:

query AirtableDatasets {
  allAirtable {
    group(field: table) {
      fieldValue
      nodes {
				data {
					Artefact_number
        }
      }
    }
  }
}

and that gets us: 

{
  "data": {
    "allAirtable": {
      "group": [
        {
          "fieldValue": "14th century small finds"
        },
				...
			]
		}
	}
}

where fieldValue is the table name. We have to pull in all the different field names, but that should be enough to feed to the different places.

## THINGS TO REMEMBER

* fieldValue must be unique.