import React from "react";
import styled from "styled-components";
import { objectTypeInternalSlot } from "@babel/types";

const StyledAStar = styled.div``;

const cols = 5;
const rows = 5;
let grid = new Array(cols);

let openSet = [];
let closedSet = [];
let start; 
let end; 

function Spot() {
  this.f = 0;
  this.g = 0;
  this.h = 0;
}

for (let i = 0; i < cols; i++) {
  grid[i] = new Array(rows);
}

for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    grid[i][j] = new Spot();
  }
}

start = grid[0][0];
end = grid[cols-1][rows-1];

openSet.push(start);

console.log(grid);
class AStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
  };

  render() {
    return <StyledAStar></StyledAStar>;
  }
}

export default AStar;
