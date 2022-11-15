const convertToCSV = (objArray) => {
  var array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  var str = "";

  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line !== "") line += ",";
      if (array[i][index].indexOf("\n") > -1) {
        array[i][index] = array[i][index].replace(/\n/g, " | ");
        // console.log(array[i][index].indexOf("\n"));
      }
      line += array[i][index];
    }

    str += line + "\n"; // was \r\n
  }

  return str;
};

function exportCSVFile(headers, items, fileTitle) {
  if (headers) {
    items.unshift(headers);
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(items);
  var csv = convertToCSV(jsonObject);
  var exportedFilenmae = fileTitle + ".csv" || "export.csv";
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

// TODO: Better escape commas and quoes:
// maybe this: https://stackoverflow.com/questions/44111580/how-to-deal-with-commas-in-csv-using-javascript

const downloadCSV = (headersIn, datasetIn, reportTitle) => {
  const headers = {};
  for (let i = 0; i < headersIn.length; i++) {
    if (headersIn[i].fieldName) {
      headers[headersIn[i].fieldKey] = String(headersIn[i].fieldName).replace(
        /,/g,
        ""
      );
    }
  }

  const dataset = [];
  for (let i = 0; i < datasetIn.length; i++) {
    const cleanedRecord = {};
    for (const [key] of Object.entries(headers)) {
      cleanedRecord[key] = datasetIn[i][key]
        ? String(datasetIn[i][key]).replace(/,/g, "")
        : "";
    }
    dataset.push(cleanedRecord);
  }

  exportCSVFile(headers, dataset, reportTitle);
};

export default downloadCSV;
