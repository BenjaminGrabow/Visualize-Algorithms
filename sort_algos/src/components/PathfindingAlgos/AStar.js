import React from "react";
import styled from "styled-components";

const StyledAStar = styled.div`
  .box {
    border: 0.1rem solid black;
    width: 1rem;
    height: 1rem;
  }
`;

// An object to describe a spot in the grid
function Spot(i, j) {
  // Location
  this.i = i;
  this.j = j;

  // f, g, and h values for A*
  this.f = 0;
  this.g = 0;
  this.h = 0;

  // Neighbors
  this.neighbors = [];

  // Where did I come from?
  this.previous = undefined;

  // // Am I a wall?
  // this.wall = false;
  // if (random(1) < 0.4) {
  //   this.wall = true;
  // }

  // // Display me
  // this.show = function(col) {
  //   if (this.wall) {
  //     fill(0);
  //     noStroke();
  //     ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
  //   } else if (col){
  //     fill(col);
  //     rect(this.i * w, this.j * h, w, h);
  //   }
  // }

  // Figure out who my neighbors are
  this.addNeighbors = function(grid) {
    let i = this.i;
    let j = this.j;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    if (i > 0 && j > 0) {
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if (i < cols - 1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < rows - 1) {
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    if (i < cols - 1 && j < rows - 1) {
      this.neighbors.push(grid[i + 1][j + 1]);
    }
  };
}

// columns and rows
let cols = 10;
let rows = 10;

// This will be the 2D array
let grid = new Array(cols);

// Open and closed set
let openSet = [];
let closedSet = [];

// Start and end
let start;
let end;

class AStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: null
    };
  }

  componentDidMount = () => {
    // let grid = [];
    // let rows = 10;
    // let columns = 10;
    // let counter = 0;

    // const fill2DimensionsArray = (arr, rows, columns) => {
    //   for (let i = 0; i < rows; i++) {
    //     arr.push([counter]);
    //     for (let j = 0; j < columns; j++) {
    //       arr[i][j] = counter;
    //     counter += 1;
    //     }
    //   }
    // }

    // fill2DimensionsArray(grid, rows, columns);

    
    
    // Making a 2D array
    for (let i = 0; i < cols; i++) {
      grid[i] = new Array(rows);
    }
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
    
    // All the neighbors
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].addNeighbors(grid);
      }
    }
    
    // Start and end
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    start.wall = false;
    end.wall = false;
    
    // openSet starts with beginning only
    openSet.push(start);
    
    console.log(grid);
    this.setState({
      grid: grid
    });
  };
  
  render() {
    return (
      <StyledAStar>
        {this.state.grid ? (
          <table className="table-hover table-striped table-bordered">
            <tbody>
              {this.state.grid.map((item, i) => {
                let entry = item.map((element, j) => {
                  return (
                    <td className={`box ${element.i}${element.j}`} key={j}>
                      {/* {element} */}
                    </td>
                  );
                });
                return (
                  <tr onClick={(e) => console.log(e.target.className.slice(4,6))} className={`box ${entry.i}`} key={i}>
                    {entry}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
        <button onClick={this.start}>Start</button>
      </StyledAStar>
    );
  }
}

export default AStar;
