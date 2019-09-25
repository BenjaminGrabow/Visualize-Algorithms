import React from "react";
import styled from "styled-components";

const StyledAStar = styled.div`
  .box {
    border: 0.1rem solid black;
    width: 1rem;
    height: 1rem;
  }
`;

// Function to delete element from the array
function removeFromArray(arr, elt) {
  // Could use indexOf here instead to be more efficient
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === elt) {
      arr.splice(i, 1);
    }
  }
}

// An educated guess of how far it is between two points
function heuristic(a, b) {
  let d = Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
  return d;
}

// An object to describe a spot in the grid
function Spot(i, j) {
  // Location
  this.i = i;
  this.j = j;

  // f, g, and h values for A*
  this.f = 0; // h + g = f;
  this.g = 0; // from current field to this field
  this.h = 0; // from this field to the end field

  this.backgroundColor = "white";

  // Neighbors
  this.neighbors = [];

  // Where did I come from?
  this.previous = undefined;

  // // Am I a wall?
  // this.wall = false;
  // if (random(1) < 0.4) {
  //   this.wall = true;
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
  };
}

// columns and rows
let cols = 30;
let rows = 30;

// This will be the 2D array
let grid = new Array(cols);

// Open and closed set
let openSet = [];
let closedSet = [];

// Start and end
let start;
let end;

let current;

class AStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: null
    };
  }

  componentDidMount = () => {
    // Other way of doing 2D Array:
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

  start = () => {
    // Am I still searching?
    if (openSet.length > 0) {
      // Best next option
      let winner = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[winner].f) {
          winner = i;
        }
      }
      current = openSet[winner];

      // Did I finish?
      if (current === end) {
        console.log("DONE!");
        // // Find the path by working backwards
        let path = [];
        let temp = current;
        path.push(temp);
        while (temp.previous) {
          path.push(temp.previous);
          temp = temp.previous;
        }

        // give the evaluated path a color
        for (let i = 0; i < path.length; i++) {
          const thePath = document.getElementById(`${path[i].i} ${path[i].j}`);
          thePath.style.backgroundColor = "green";
        }
        return null;
      }

      // Best option moves from openSet to closedSet
      removeFromArray(openSet, current);
      closedSet.push(current);

      // Check all the neighbors
      let neighbors = current.neighbors;
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];

        // Valid next spot?
        if (!closedSet.includes(neighbor) && !neighbor.wall) {
          let tempG = current.g + heuristic(neighbor, current);

          // Is this a better path than before?
          let newPath = false;
          if (openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
              newPath = true;
            }
          } else {
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }

          // Yes, it's a better path
          if (newPath) {
            neighbor.h = heuristic(neighbor, end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
          }
        }
      }
      // there is no solution available
    } else {
      console.log("no solution");
    }

    // animate the closed and open set

    for (let i = 0; i < closedSet.length; i++) {
      const closedSetItem = document.getElementById(
        `${closedSet[i].i} ${closedSet[i].j}`
      );
      closedSetItem.style.backgroundColor = "black";
    }

    for (let i = 0; i < openSet.length; i++) {
      const openSetItem = document.getElementById(
        `${openSet[i].i} ${openSet[i].j}`
      );
      openSetItem.style.backgroundColor = "yellow";
    }

    setTimeout(() => this.start(), 200); // because its no while loop we only check for one
    //move  with this method call and must call it again until
    // the the "DONE" statement gets triggered and we need a timeout to animate slowly
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
                    <td
                      className="box"
                      id={`${element.i} ${element.j}`}
                      style={{ backgroundColor: `${element.backgroundColor}` }}
                      key={j}
                    >
                      {/* {element} */}
                    </td>
                  );
                });
                return (
                  <tr
                    onClick={e => console.log(e.target.id)}
                    className={`box ${entry.i}`}
                    key={i}
                  >
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
