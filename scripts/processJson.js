/* header coming in:

UIN,Grid Number,Batch Number,Description / Shape,Size,Glaze Type,Kiln,Material,Condition,Height (cm),Width / Diameter (cm),Length (cm),Weight (g),Decoration Exterior,Decoration Interior,Qty,Remarks,imagefiles,Image 1,Image 2,Box Label,Highlight

UIN Key,UIN,Grid Number,Batch Number,Description / Shape,Size,Glaze Type,Kiln,Material,Condition,Weight (g),Decoration Exterior,Decoration Interior,Qty,Remarks,Box Label,Highlight,Filesource,imageNames

UIN Key,UIN,Grid Number,Batch Number,Description / Shape,Size,Glaze Type,Kiln,Material,Condition,Weight (g),Decoration Exterior,Decoration Interior,Qty,Remarks,Box Label,Highlight,Filesource,imageNames,Created

Artifact Number,Unit Number,Depth (cm),Lot,Spit,Level,Material,Varieties of Material,Type of Ware,Provenance,Period,Form,Vessel Part,Number of pieces,Weight (g),Length (cm),Width (cm),Thickness (cm),Thickness of base (complete profile) (cm),Height of foot rim (cm),Thickness (foot rim) (cm),Diameter (cm),MNV (%),Color Exterior Earthenware (Munsell),Color Interior Earthenware (Munsell),Color Profile Earthenware (Munsell),Remarks,Date of excavation,Image


change to:

id,gridNumber,batchNumber,descriptionShape,size,glazeType,kiln,material,condition,height,widthDiameter,length,weight,decorationExterior,decorationInterior,qty,remarks,imagefiles,image1,image2,boxLabel,highlight

id,uin,gridNumber,batchNumber,descriptionShape,size,glazeType,kiln,material,condition,weight,decorationExterior,decorationInterior,qty,remarks,boxLabel,highlight,filesource,imagefiles


id,uin,gridNumber,batchNumber,descriptionShape,size,glazeType,kiln,material,condition,weight,decorationExterior,decorationInterior,qty,remarks,boxLabel,highlight,filesource,imagefiles,created

artifactNumber,unit,depth,lot,spit,level,material,variety,wareType,provenance,period,form,vesselPart,numPieces,weight,length,width,thickness,thicknessBase,heightFootRim,thicknessFootRim,diameter,mnv,colorExterior,colorInterior,colorProfile,remarks,date,image


*/

// script to process pedra branca json data

/*

To run this: node scripts/processJson.js

It makes an output.json file in the scripts folder which should be used to replace the input JSON file
(currently hardcoded)

*/

const data = require("./../data/temasekwreck/datasets/pb1ceramics.json");
const fs = require("fs");

const theJsonData = data.dataset.data;

// const testData = [
//   { imagefiles: "1 IMG_1360.jpg, 1 a.jpg, 1 b.jpg" },
//   { imagefiles: "" },
//   { imagefiles: "image.jpg" },
//   { imagefiles: "image.png" },
//   { imagefiles: "image.jpeg, image.jpg, image.png" },
// ];

const theOutData = [];
const errorLog = [];

for (let i = 0; i < theJsonData.length; i++) {
  const thisRecord = theJsonData[i];
  // split on internal commas
	if(typeof thisRecord.imagefiles === "string") {
		let theImageArray = thisRecord.imagefiles.split(",");
		// get rid of spaces, standardize .jpg, replace spaces with hyphens
		theImageArray = theImageArray.map((item) =>
			item.trim().replace(".JPG", ".jpg").replaceAll(" ", "-")
		);
		theImageArray.forEach((filename) => {
			// if there's no .jpg in the filename, add it to an error log
			if (filename !== "" && !filename.includes(".jpg")) {
				errorLog.push(filename);
			}
		});
		theImageArray = theImageArray.filter((item) => item !== "");
		thisRecord.imagefiles = theImageArray;
	}
	// strip out all null values
	const o = Object.fromEntries(Object.entries(thisRecord).filter(([_, v]) => v != null));
  theOutData.push(o);
}

console.log("\nOutput:\n\n", theOutData);
const newFile = data;
newFile.dataset.data = theOutData;
fs.writeFile("./scripts/output.json", JSON.stringify(newFile), (err) => {
  if (err) {
    throw err;
  }
  console.log("complete");
});

if (errorLog.length) {
  console.log("\n\nerrorLog:\n\n", errorLog);
}

// TODO: save the output to a file
