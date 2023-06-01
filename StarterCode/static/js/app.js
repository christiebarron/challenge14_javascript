//1. read in data from url 
const bellyData = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//// Fetch the JSON data and console log it
d3.json(bellyData).then(function(data){
    console.log(data)
})

//2. HORIZONTAL BAR CHART WITH DROPDOWN MENU

// sort descending

// split to just take first 10

// Trace1 for the horizontal bar chart
let trace1 = {
    x: names, //otu_ids
    y: greekSearchResults, //sample_values
    text: greekNames, //otu_labels (hovertext??)
    name: "bar",
    type: "bar",
    orientation : "h"
  };

//3. BUBBLE CHART 

//sample metadata (demographic information) as table 

//deploy to free static page hosting service. 