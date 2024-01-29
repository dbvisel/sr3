/* header coming in:

UIN,Grid Number,Batch Number,Description / Shape,Size,Glaze Type,Kiln,Material,Condition,Height (cm),Width / Diameter (cm),Length (cm),Weight (g),Decoration Exterior,Decoration Interior,Qty,Remarks,imagefiles,Image 1,Image 2,Box Label,Highlight

change to:

id,gridNumber,batchNumber,descriptionShape,size,glazeType,kiln,material,condition,height,widthDiameter,length,weight,decorationExterior,decorationInterior,qty,remarks,imagefiles,image1,image2,boxLabel,highlight

*/

// script to process pedra branca json data

const data = require("./../data/pedrabranca/datasets/pb1ceramics.json");
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
  theOutData.push(thisRecord);
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
