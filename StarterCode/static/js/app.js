//1. read in data from url
let bellyData =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//extract relevant data

//init to fetch data: part 1
//build charts: parts 2, 3, 4
//takes id as parameter, reflect all charts accordingly.

//option changed: calls build charts w/ new id value selected -EVENT LISTENER.

//STEP 1

function init() {
  //get data
  d3.json(bellyData).then(function (data) {
    console.log(data); //works

    //extract names
    let sampleNames = data.names;

    //create drop-down menu
    let namesSelect = d3.select("#selDataset");

    //for loop
    for (let index = 0; index < sampleNames.length; index++) {
      const element = sampleNames[index];

      // Append the text id, add a property to it.
      namesSelect.append("option").text(element).property("value", element);
    }
    buildCharts(sampleNames[0]);
  });
}

init ()

//step 2: build charts
function buildCharts(id) {
  console.log(id);

  //access data
  d3.json(bellyData).then(function (data) {

    //extract metadata
    let metadata = data.metadata;
    //extract samples
    let samples = data.samples;

  //METADATA PANEL
    //step 2: create metadata panel
    let metadataPanel = d3.select("#sample-metadata")

    //overwrite the html of metadataPanel with nothing
    metadataPanel.html("")
    
    //select relevant id sample. use arrow function to loop through all ids and select the id that matches.
    let sampleMetadata = metadata.filter(o => o.id == id)[0]

    console.log(sampleMetadata) //works!

    //extract key-value pair for each key and value pair in the sample metadata and append to the panel
    for (key in sampleMetadata) {
      
      metadataPanel.append("h6").text(`${key} : ${sampleMetadata[key]}`)
      console.log(key) //key
      console.log(sampleMetadata[key]) //value
    }

  // BAR CHART CODE
    //select relevant object for bar chart
    let horizontalBarChart = d3.select("#bar")

    //select relevant id data. use arrow function to loop through all ids and select first id that matches
    let idBarData = samples.filter(object => object.id == id)[0]

    //acquire relevant data for bar graph
    let otu_labels = idBarData.otu_labels;
    let otu_ids = idBarData.otu_ids;
    let sample_values = idBarData.sample_values;
    let otuIdText = otu_ids.slice(0, 10).reverse().map(object => `OTU ${object}`)

    console.log(`otu_labels: ${otu_labels}`)
    console.log(`otu_ids: ${otu_ids}`)
    console.log(`sample_values : ${sample_values}`)
    console.log(otuIdText)

    let barData = [
          {
            x: sample_values.slice(0,10).reverse(),
            y:  otuIdText.slice(0, 10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'
          }
        ]

      let barLayout = {
        title: `Participant ${id}'s Highest Ten OTU Values`,
            }
          
      Plotly.newPlot("bar", barData, barLayout)

  //BUBBLE CHART CODE
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    }];
        
    var bubbleLayout = {
      title: `Participant ${id}'s OTU Sample Values`,
      xaxis: {title: "OTU IDs"},
      height: 600,
      width: 1000
    };
  
  Plotly.newPlot('bubble', bubbleData, bubbleLayout);

  });
}

//loop over and key-value pair.


//step 3: option change

function optionChanged(id){
  buildCharts(id)
}

//next step: extract the sample and putting it all in the next part.

// //// Fetch the JSON data and console log it
// d3.json(bellyData).then(function(data){
//   console.log(data) //works
//   let sampleNames = data.names;
//   let sampleMetadata = data.getMetadata
//   let samples = data.samples;

//     //filter something
//   let resultsArray = samples.filter(samplesId)

//   let firstResult = resultsArray[0]

//   //create bar graph
//   let otu_labels = firstResult.otu_labels;
//   let otu_ids = firstResult.otu_ids;
//   let sample_values = firstResult.sample_values;

//   let barData = [
//     {
//       x: otu_labels,
//       y: otu_ids.slice(0,10),
//       text: otu_labels.slice(0,10),
//       type: 'bar',
//       orientation: 'h'
//     }

//   ]

//   let barLayout = {
//     title: 'Bar graph',

//   }

//   Plotly.newPlot("bar", barData, barLayout)
// })

// function(getMetadata)

// //2. HORIZONTAL BAR CHART WITH DROPDOWN MENU

// //sort descending
// let sortedBellyData = bellyData.sort((a, b,) => b.sample_values - a.sample_values)
//   // let sortedSearch = data.sort((a,b) => b.greekSearchResults - a.greekSearchResults);
// console.log(sortedBellyData.slice(0, 10))
//   // // console.log(slicedData);

//   // let reversedData = slicedData.reverse()

// // split to just take first 10

//   // let slicedData = sortedSearch.slice(0, 10);

// // Trace1 for the horizontal bar chart
// let trace1 = {
//     x: names, //otu_ids
//     y: greekSearchResults, //sample_values
//     text: greekNames, //otu_labels (hovertext??)
//     name: "bar", //note connecting to the html:  <div id="bar"></div>
//     type: "bar",
//     orientation : "h"
//   };

// Plotly.newPlot("bar", [trace1])
// //EXAMPLE CODE FOR THIS
// // let trace = {
// //     x: reversedData.map(row => row.greekSearchResults),
// //     y: reversedData.map(row => row.greekName),

// // let trace = {
// //   x: data.sort((a,b) => b.greekSearchResults - a.greekSearchResults).slice(0, 10).reverse().map(row => row.greekSearchResults),
// //   y: data.sort((a,b) => b.greekSearchResults - a.greekSearchResults).slice(0, 10).reverse().map(row => row.greekName),
// //   type: 'bar',
// //   orientation: 'h',
// //   name : 'Greek'
// // }

// //DROPDOWN CODE
//   // d3.selectAll("#selDataset").on("change", function() {

//   //   let dataset = d3.select("#selDataset").property("value");

//   //   if (dataset == 'australia') {
//   //       var newData = australia;
//   //   }
//   //   else if (dataset == 'brazil') {
//   //       var newData = brazil;
//   //   }
//   //   else if (dataset == 'uk') {
//   //       var newData = uk;
//   //   }
//   //   else if (dataset == 'mexico') {
//   //       var newData = mexico;
//   //   }
//   //   else if (dataset == 'singapore') {
//   //       var newData = singapore;
//   //   }
//   //   else if (dataset == 'southAfrica') {
//   //       var newData = southAfrica;
//   //   }

// //metadata: use the append function to add things to it.

// //3. BUBBLE CHART

// //sample metadata (demographic information) as table
// bellyData.select(".metadata")

// //deploy to free static page hosting service.
