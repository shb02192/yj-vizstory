const svg = d3.select('svg')

const width = document.body.clientWidth;
const height = 1000;
const margin = {top: 100, right: 40, bottom: 75, left: 150};
const innerWidth = width - margin.left - margin.right;
const innerHeight = width - margin.top - margin.bottom;

const g = svg
    .attr('width', width)
    .attr('height', height)
  .append('g')
    .attr('transform', () => {
      return `translate(${margin.left},${margin.top})`
    })

let data;
let xColumn;
let yColumn;

var onXColumnClicked = column => {
  xColumn = column;
  render();
}

var onYColumnClicked = column => {
  yColumn = column;
  render();
}

var render = () => {
  d3.select('#x-menu')
    .call(dropdownMenu, {
      options: data.columns,
      onOptionClicked: onXColumnClicked,
      selectedOption: xColumn
    })

  d3.select('#y-menu')
    .call(dropdownMenu, {
      options: data.columns,
      onOptionClicked: onYColumnClicked,
      selectedOption: yColumn
    })

  g.call(scatterPlot, {
    xValue: d => d[xColumn],
    xAxisLabel: xColumn,
    yValue: d => d[yColumn],
    circleRadius: 10,
    yAxisLabel: yColumn,
    data
  })
}

d3.csv('https://vizhub.com/curran/datasets/auto-mpg.csv')
  .then(loadedData => {
    data = loadedData;
    data.forEach(d => {
      d.mpg = +d.mpg;
      d.cylinders = +d.cylinders;
      d.displacement = +d.displacement;
      d.horsepower = +d.horsepower;
      d.weight = +d.weight;
      d.acceleration = +d.acceleration;
      d.year = +d.year;
    });
    xColumn = data.columns[4];
    yColumn = data.columns[0];
    render();
  })
