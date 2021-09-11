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
* Every usage of a fieldname must be the same type in Airtable.

## FORT CANNING VALUES

{"fieldName":"Archaeological Unit","fieldKey":"Archaeological_Unit"},
{"fieldName":"Artefact Number", "fieldKey":"Artefact_Number"},
{"fieldName":"Color (Munsell Chart)","fieldKey":"Color__Munsell_Chart_"},
{"fieldName":"Date Recorded","fieldKey":"Date_Recorded", "fieldType":"date"},
{"fieldName":"Decoration","fieldKey":"Decoration"},
{"fieldName":"Depth","fieldKey":"Depth"},
{"fieldName":"Diameter","fieldKey":"Diameter","fieldUnit":"cm"},
{"fieldName":"Diameter (Ext)","fieldKey":"Diameter__Ext_"},
{"fieldName":"Dimensions of sherd 1","fieldKey":"Dimensions_of_sherd__in_cm__1","fieldUnit":"cm"},
{"fieldName":"Dimensions of sherd 2","fieldKey":"Dimensions_of_sherd__in_cm__2","fieldUnit": "cm"},
{"fieldName":"Dimensions of sherd 3","fieldKey":"Dimensions_of_sherd__in_cm__3","fieldUnit":"cm"},
{"fieldName":"Dimensions of sherd 4","fieldKey":"Dimensions_of_sherd__in_cm__4","fieldUnit":"cm"},
{"fieldName":"Dimensions of sherd 5","fieldKey":"Dimensions_of_sherd__in_cm__5","fieldUnit":"cm"},
{"fieldName":"Distance from North/South","fieldKey":"Distance_from_North_South"},
{"fieldName":"Distance from East/West","fieldKey":"Distance_from_East_West"},
{"fieldName":"Excavation Date","fieldKey":"Excavation_Date", "fieldType":"date"},
{"fieldName":"Foot Height/Thickness","fieldKey":"Foot_Height_Thickness"},
{"fieldName":"Image Taken?","fieldKey":"Image_Taken_"},
{"fieldName":"Image File Name","fieldKey":"Image_File_Name"},
{"fieldName":"Length","fieldKey":"Length","fieldUnit":"cm"},
{"fieldName":"Lot","fieldKey":"Lot"},
{"fieldName":"No.","fieldKey":"No_"},
{"fieldName":"Number of Pieces","fieldKey":"Number_of_Pieces"},
{"fieldName":"Period","fieldKey":"Period"},
{"fieldName":"Provenance","fieldKey":"Provenance"},
{"fieldName":"Quantities in Weight","fieldKey":"Quantities_in_Weight"},
{"fieldName":"Quantities in number of sherds","fieldKey":"Quantities_in_number_of_sherds"},
{"fieldName":"Remarks","fieldKey":"Remarks"},
{"fieldName":"Site","fieldKey":"Site"},
{"fieldName":"Square Unit","fieldKey":"Square_Unit"},
{"fieldName":"Stratigraphy","fieldKey":""},
{"fieldName":"Thickness","fieldKey":"Thickness"},
{"fieldName":"Type of Material","fieldKey":"Type_of_Material"},
{"fieldName":"Type of Ware","fieldKey":"Type_of_Ware"},
{"fieldName":"Vessel Information","fieldKey":"Vessel_Information"},
{"fieldName":"Vessel Type","fieldKey":"Vessel_Type","fieldValues":["Bangle","Bead","Bowl","Brick","Coin","Covered box","Cup","Crucible","Eaveboard tile","Ewer","Figurine","Jar","Jarlet","Kendi","Large bowl","Lid","Long necked vessel","Medium bowl","Open pot","Plate bowl","Pot","Shallow bowl","Small bowl","Stand","Stove","Vase","Unknown"},
{"fieldName":"Vessel Part","fieldKey":"Vessel_Part","fieldValues":["Base","Bead", "Body", "Body (deco)","Carination", "Eaveboard tile","Foot rim","Handle","Knob","Lid","Lug","Mouth","Mouth & Lug","Neck","Rim","Rim & Base (Complete Profile)","Shoulder","Spout", "Unknown"]},
{"fieldName":"Weight","fieldKey":"Weight", "fieldUnit":"g"},
{"fieldName":"Width","fieldKey":"Width"},

## SPICE GARDEN VALUES

{"fieldName":"Artefact Number", "fieldKey":"Artefact_Number"},
{"fieldName":"Colour (body)","fieldKey":"Colour__body_"},
{"fieldName":"Colour (slip)","fieldKey":"Colour__slip_"},
{"fieldName":"Colour (exterior)","fieldKey":"Colour__exterior_"},
{"fieldName":"Breadth/Width","fieldKey":"Breadth_Width","fieldUnit":"cm"},
{"fieldName":"Diameter measured?","fieldKey":"Diameter_measured_"},
{"fieldName":"Diameter (throat)","fieldKey":"Diameter__throat_"},
{"fieldName":"Diameter (orifice)","fieldKey":"Diameter__orifice_"},
{"fieldName":"Diameter (lip/top lip of knob)","fieldKey":"Diameter__lip_top_lip_of_knob_"},
{"fieldName":"Diameter (lip/base)","fieldKey":"Diameter__lip_base_"},
{"fieldName":"Diameter of lip/base measured?","fieldKey":"Percentage_of_lip_base_measured_"},
{"fieldName":"Excavation Date","fieldKey":"Excavation_Date","fieldType":"date"},
{"fieldName":"Length","fieldKey":"Length","fieldUnit":"cm"},
{"fieldName":"Lot","fieldKey":"Lot"},
{"fieldName":"MNV (%)","fieldKey":"MNV____", "fieldType":"percent"},
{"fieldName":"Number of Pieces","fieldKey":"Number_of_Pieces"},
{"fieldName":"Percentage of rim or base","fieldKey":"Percentage_of_rim_or_base"},
{"fieldName":"Percentage of throat measured?","fieldKey":"Percentage_of_throat_measured_"},
{"fieldName":"Percentage of throat","fieldKey":"Percentage_of_throat"},
{"fieldName":"Percentage of lip/base measured?","fieldKey":"Percentage_of_lip_base_measured_"},
{"fieldName":"Percentage of lip/base","fieldKey":"Percentage_of_lip_base"},
{"fieldName":"Quantities in Weight","fieldKey":"Quantities_in_Weight", "fieldUnit":"g"},
{"fieldName":"Quantities in number of sherds","fieldKey":"Quantities_in_number_of_sherds"},
{"fieldName":"Remarks","fieldKey":"Remarks"}
{"fieldName":"Spit","fieldKey":"Spit"},
{"fieldName":"Stratigraphy—Spit","fieldKey":"Stratigraphy_Spit"},
{"fieldName":"Thickness","fieldKey":"Thickness"},
{"fieldName":"Type","fieldKey":"Type"},
{"fieldName":"fieldUnit","fieldKey":"fieldUnit"},
{"fieldName":"Weight","fieldKey":"Weight", "fieldUnit":"g"},

## PULAU SAIGON

{"fieldName":"Artifact Number", "fieldKey":"Artifact_Number"},
{"fieldName":"Depth","fieldKey":"Depth__cm_", "fieldUnit": "cm"},
{"fieldName":"Unit","fieldKey":"Unit_Number"},
{"fieldName":"Spit","fieldKey":"Spit"},
{"fieldName":"Lot","fieldKey":"Lot"},
{"fieldName":"Level","fieldKey":"Level"},
{"fieldName":"Material","fieldKey":"Material","fieldValues":["Ceramics","Constructions Materials","Glass","Metal","Organic","Plastic","Stone"]},
{"fieldName":"Variety of Material","fieldKey":"Varieties_of_Material","fieldValues":["Earthenware", "Stoneware", "Porcelain", "Tile", "Electrical Fixtures", "Unknown/Others", "Bronze/Copper", "Tin/Lead", "Bone", "Shell"]},
{"fieldName":"Type of Ware","fieldKey":"Type_of_Ware","fieldValues":["Earthenware - Medium Tempered", "Stoneware - Brittle", "Porcelain - Green", "Porcelain - Blue and White", "Porcelain - White", "Stoneware - Buff", "Porcelain - Polychrome ", "Porcelain - Monochrome Other", "Porcelain - Others", "Porcelain - Unknown", "Stoneware - Others", "Earthenware - Others"]},
{"fieldName":"Provenance","fieldKey":"Provenance","fieldValues":["Local (Singaporean)", "Chinese", "Guangdong", "Unknown", "Others", "European", "Dutch", "British", "French", "Japanese"]},
{"fieldName":"Period","fieldKey":"Period","fieldValues":["14th century", "15th century", "19th century", "20th century","Unknown"]},
{"fieldName":"Form","fieldKey":"Form","fieldValues":["Pot", "Jar", "Bowl", "Statue/figurine", "Jarlet", "Cup", "Teapot", "Basin", "Others", "Spoon", "Saucer", "Plate", "Unknown", "Covered box", "Vase", "Stand", "Decorative feature", "Incense burner", "Bottle", "Trivet", "Tile", "Light bulb", "Marble", "Tumbler", "Fish hook", "Weapon", "Toothbrush", "Bead", "Comb", "Gun flint"]},
{"fieldName":"VesselPart","fieldKey":"Vessel_Part","fieldValues":["Body", "Base", "Body (with decoration)", "Rim", "Others", "Lug", "Rim & Base (complete profile)", "Spout", "Handle", "Lid", "Shoulder", "Knob", "Unknown", "Neck", "Complete Vessel", "Mouth", "Carination", "Complete vessel"]},
{"fieldName":"Number of Pieces","fieldKey":"Number_of_pieces"},
{"fieldName":"Weight","fieldKey":"Weight__g_","fieldUnit":"g"},
{"fieldName":"Length","fieldKey":"Length__cm_","fieldUnit":"cm"},
{"fieldName":"Width","fieldKey":"Width__cm_","fieldUnit":"cm"},
{"fieldName":"Thickness","fieldKey":"Thickness__cm_","fieldUnit":"cm"},
{"fieldName":"Thickness of base (complete profile)","fieldKey":"Thickness_of_base__complete_profile___cm_","fieldUnit":"cm"},
{"fieldName":"Height of foot rim","fieldKey":"Height_of_foot_rim__cm_","fieldUnit":"cm"},
{"fieldName":"Diameter","fieldKey":"Diameter__cm_","fieldUnit":"cm"},
{"fieldName":"MNV","fieldKey":"MNV____","fieldType":"percent"},
{"fieldName":"Color Exterior Earthenware (Munsell)","fieldKey":"Color_Exterior_Earthenware__Munsell_","fieldType":"munsellcolor"},
{"fieldName":"Color Interior Earthenware (Munsell)","fieldKey":"Color_Interior_Earthenware__Munsell_","fieldType":"munsellcolor"},
{"fieldName":"Color Profile Earthenware (Munsell)","fieldKey":"Color_Profile_Earthenware__Munsell_","fieldType":"munsellcolor"},
{"fieldName":"Filename","fieldKey":"Filename"}




doesn't actually appear and so NOT IN GRAPHQL:

{"fieldName":"Colour (glaze)","fieldKey":"Colour__glaze_"},
