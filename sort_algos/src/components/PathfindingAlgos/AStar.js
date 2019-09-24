import React from "react";
import styled from "styled-components";

const StyledAStar = styled.div``;

// function removeFromArray(arr, elt) {
//   for (let i = arr.length - 1; i >= 0; i--) {
//     if (arr[i] === elt) {
//       arr.splice(i, 1);
//     }
//   }
// }

// const cols = 5;
// const rows = 5;
// let grid = new Array(cols);

// let openSet = [];
// let closedSet = [];
// let start;
// let end;
// let w, h;

// function Spot(i, j) {
//   this.i = i;
//   this.j = j;

//   this.f = 0; // G + H value
//   this.g = 0; // distance from the start node
//   this.h = 0; //Distance from the end node.

//   this.neighbors = [];

//   this.show = function(col) {
//     rect(this.i * w, this.j * h, w - 1, h - 1);
//   };

//   this.addNeighbors = function(grid) {
//     let i = this.i;
//     let j = this.j;
//     if (i < cols - 1) {
//       this.neighbors.push(grid[i + 1][j]);
//     }
//     if (i > 0) {
//       this.neighbors.push(grid[i - 1][j]);
//     }
//     if (j < rows - 1) {
//       this.neighbors.push(grid[i][j + 1]);
//     }
//     if (j > 0) {
//       this.neighbors.push(grid[i][j - 1]);
//     }
//   };
// }

// function setup() {
//   createCanvas(400, 400);

//   w = width / cols;
//   h = height / rows;

//   //making 2d array
//   for (let i = 0; i < cols; i++) {
//     grid[i] = new Array(rows);
//   }

//   for (let i = 0; i < cols; i++) {
//     for (let j = 0; j < rows; j++) {
//       grid[i][j] = new Spot(i, j);
//     }
//   }

//   for (let i = 0; i < cols; i++) {
//     for (let j = 0; j < rows; j++) {
//       grid[i][j].addNeighbors(grid);
//     }
//   }

//   start = grid[0][0];
//   end = grid[cols - 1][rows - 1];

//   openSet.push(start);
// }

// function draw() {
//   if (openSet.length > 0) {
//     var winner = 0;
//     for (let i = 0; i < openSet.length; i++) {
//       if (openSet[i].f < openSet[winner].f) {
//         winner = i;
//       }
//     }

//     let current = openSet[winner];

//     if (current === end) {
//       console.log("DONE");
//     }

//     removeFromArray(openSet, current);
//     closedSet.push(current);

//     let neighbors = current.neighbors;
//     for(let i = 0; i < neighbors.length; i++) {
//       let neighbor = neighbors[i];

//       if(!closedSet.includes(neighbor)) {
//         let tempG = current.g + 1;

//         if(openSet.includes(neighbor)){
//           if(tempG < neighbor.g) {
//             neighbor.g = tempG;
//           }
//         } else {
//           neighbor.g = tempG;
//           openSet.push(neighbor);
//         }

//         neighbor.h = heuristic(neighbor, end);
//       }
//     }
//   } else {
//   }

//   for (let i = 0; i < cols; i++) {
//     for (let j = 0; j < rows; j++) {
//       grid[i][j].show();
//     }
//   }
// }

// console.log(grid);
class AStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    return <StyledAStar></StyledAStar>;
  }
}

export default AStar;
