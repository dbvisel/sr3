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

## Problem fields

Artefact_Number
Weight
Quantities_in_Weight
	Fort Canning Salvage Data by Square
	SG Tempered Earthenware

## FORT CANNING VALUES

Archaeological_Unit
Artefact_Number
Color__Munsell_Chart_
Date_Excavated
Date_Recorded
Decoration
Depth
Diameter
Diameter__Ext_
Dimensions_of_sherd__in_cm__1
Dimensions_of_sherd__in_cm__2
Dimensions_of_sherd__in_cm__3
Dimensions_of_sherd__in_cm__4
Dimensions_of_sherd__in_cm__5
Distance_from_North_South
Distance_from_East_West
Excavation_Date
FTC_Salvage__2018_2019__pieces
FTCSG_Pandan_Bed_pieces
Foot_Height_ThicknessLength
Hidden_order
Image_File_Name
Image_Taken_
Lot
No_
Number_of_Pieces
Period
Provenance
Quantities_in_Weight
Quantities_in_number_of_sherds
Remarks
Site
Square_Unit
Thickness
Total_pieces
Total_weight
Type
Type_of_Material
Type_of_Ware
Vessel_Information
Vessel_Part
Vessel_Type
Width
Weight

