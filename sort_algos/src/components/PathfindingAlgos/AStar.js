import React from "react";
import styled from "styled-components";
import Draggable from "./DragDrop/Draggable";

const StyledAStar = styled.div`
  display: flex;

  .box {
    border: 0.1rem solid #3f51b5;
    width: 2rem;
    height: 2rem;
    /* border-radius: 50%; */
  }
`;

// Function to delete element from the array
const removeFromArray = (arr, elt) => {
  // Could use indexOf here instead to be more efficient
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === elt) {
      arr.splice(i, 1);
    }
  }
};

// An educated guess of how far it is between two points
function heuristic(a, b) {
  let d = Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
  return d;
}

// An object to describe a spot in the grid
// function Spot(i, j) {
//   // Location
//   this.i = i;
//   this.j = j;

//   // f, g, and h values for A*
//   this.f = 0; // h + g = f;
//   this.g = 0; // from current field to this field
//   this.h = 0; // from this field to the end field
//   this.start = i === 0 && j === 0 ? true : false; // top left corner
//   this.end = i === cols - 1 && j === rows - 1 ? true : false; //bottom right corner
//   this.backgroundColor = "white";

//   // Neighbors
//   this.neighbors = [];

//   // Where did I come from?
//   this.previous = undefined;

//   // // Am I a wall?
//   this.wall = false; // Obstacle => wall

//   // Figure out who my neighbors are
//   this.addNeighbors = function(grid) {
//     let i = this.i;
//     let j = this.j;
//     // Add diagonal !!!
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

// columns and rows
let cols = 20;
let rows = 20;

// This will be the 2D array
// let grid = new Array(cols);

// Open and closed set
let openSet = [];
let closedSet = [];

// Start and end
let start;
let end;

let current;

export default class AStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: null
    };
  }

  componentDidMount = () => {

    // // Making a 2D array
    // for (let i = 0; i < cols; i++) {
    //   grid[i] = new Array(rows);
    // }

    // for (let i = 0; i < cols; i++) {
    //   for (let j = 0; j < rows; j++) {
    //     grid[i][j] = new Spot(i, j);
    //   }
    // }

    // // All the neighbors
    // for (let i = 0; i < cols; i++) {
    //   for (let j = 0; j < rows; j++) {
    //     grid[i][j].addNeighbors(grid);
    //   }
    // }

    grid = createInitialGrid();

    //start and end
    if (!start) {
      start = grid[0][0];
    }
    if (!end) {
      end = grid[cols - 1][rows - 1];
    }

    start.wall = false;
    end.wall = false;

    // openSet starts with beginning only
    openSet.push(start);

    this.setState({
      grid: grid
    });
    console.log(grid);
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
      // START AND RESTART BUG :

      // CONNECT EVERY VARIABLE (ALSO SPOT CONSTUCTOR) WITH COMPONENT STATE
      // ADD IN ALL METHODS THE SETSTATE FOR THE NEW CREATED COMPONENT STATES

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
      return null;
    }

    // animate the closed and open set
    let copyOfGrid = [...this.state.grid];

    for (let i = 0; i < closedSet.length; i++) {
      copyOfGrid[closedSet[i].i][closedSet[i].j].backgroundColor = "red";
    }

    for (let i = 0; i < openSet.length; i++) {
      copyOfGrid[openSet[i].i][openSet[i].j].backgroundColor = "yellow";
    }

    this.setState({
      grid: copyOfGrid
    });

    setTimeout(() => this.start(), 50); // because its no while loop we only check for one
    //move  with this method call and must call it again until
    // the the "DONE" statement gets triggered and we need a timeout to animate slowly
  };

  makeWall = e => {
    // console.log(e.target.className);
    if (
      e.target.className !== "dragDrop" &&
      e.target.className.split(" ").length === 1
    ) {
      // check the className because of drag and drop bug
      let copyOfGrid = [...this.state.grid];
      const clickedSpot = e.target.id.split(" ");

      if (
        copyOfGrid[clickedSpot[0]][clickedSpot[1]].backgroundColor === "white"
      ) {
        if (copyOfGrid[clickedSpot[0]][clickedSpot[1]].wall) {
          copyOfGrid[clickedSpot[0]][clickedSpot[1]].wall = false;
        } else {
          copyOfGrid[clickedSpot[0]][clickedSpot[1]].wall = true;
        }
        this.setState({
          grid: copyOfGrid
        });
      }
    }
  };

  restart = () => {
    // let copyOfGrid = [...this.state.grid];

    // for (let i = 0; i < copyOfGrid.length; i++) {
    //   for (let j = 0; j < copyOfGrid.length; j++) {
    //     copyOfGrid[i][j].backgroundColor = "white";
    //     copyOfGrid[i][j].neighbors = [];
    //     copyOfGrid[i][j].previous = undefined;
    //     copyOfGrid[i][j].wall = false;
    //     copyOfGrid[i][j].f = 0;
    //     copyOfGrid[i][j].g = 0;
    //     copyOfGrid[i][j].h = 0;
    //   }
    // }

    openSet = [];
    closedSet = [];
    current = null;
    grid = new Array(cols);
    // this.setState({
    //   grid: copyOfGrid
    // });
    this.componentDidMount();
  };

  drop = event => {
    event.preventDefault();
    const data = event.dataTransfer.getData("transfer");
    event.target.append(document.getElementById(data));
    const changeStartOrEnd = event.target.parentNode.id.split(" ");

    if (data === "end") {
      end = this.state.grid[changeStartOrEnd[0]][changeStartOrEnd[1]];
    } else {
      start = this.state.grid[changeStartOrEnd[0]][changeStartOrEnd[1]];
    }
  };

  allowDrop = event => {
    event.preventDefault();
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
                      style={{
                        backgroundColor: `${
                          element.wall ? "black" : element.backgroundColor
                        }`
                      }}
                      key={j}
                    >
                      {element.start ? (
                        <div
                          id="dr1"
                          className="dragDrop"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "1rem",
                            height: "1rem"
                          }}
                          onDrop={this.drop}
                          onDragOver={this.allowDrop}
                        >
                          <Draggable id="start" className="dragDrop">
                            <i
                              id="start1"
                              style={{ margin: "0", padding: "0" }}
                              className="fa fa-play-circle dragDrop"
                            />
                          </Draggable>
                        </div>
                      ) : element.end ? (
                        <div
                          id="dr2"
                          className="dragDrop"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "1rem",
                            height: "1rem"
                          }}
                          onDrop={this.drop}
                          onDragOver={this.allowDrop}
                        >
                          <Draggable className="dragDrop" id="end">
                            <i
                              id="end1"
                              style={{ margin: "0", padding: "0" }}
                              className="fa fa-bullseye dragDrop"
                            />
                          </Draggable>
                        </div>
                      ) : (
                        <div
                          id={`${element.i}${element.j}`}
                          className="dragDrop"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "1rem",
                            height: "1rem"
                          }}
                          onDrop={this.drop}
                          onDragOver={this.allowDrop}
                        />
                      )}
                    </td>
                  );
                });
                return (
                  <tr onMouseOver={this.makeWall} className="box" key={i}>
                    {entry}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
        <div className="setting-legend">
          <div className="legend-item">
            <p>Wall</p>
            <div className="box" style={{ backgroundColor: "black" }} />
          </div>
          <div className="legend-item">
            <p>Unvisited</p>
            <div className="box" />
          </div>
          <div className="legend-item">
            <p>Visited</p>
            <div className="box" style={{ backgroundColor: "red" }} />
          </div>
          <div className="legend-item">
            <p>Next possible move</p>
            <div className="box" style={{ backgroundColor: "yellow" }} />
          </div>
          <button onClick={this.start}>Start</button>
          <button onClick={this.restart}>Restart</button>
        </div>
      </StyledAStar>
    );
  }
}


let grid = []; // create empty main array for grid

// i stands for row and j for col
const createInitialGrid = () => {
  for (let i = 0; i < rows; i++) {
    let currentRow = []; // create empty row
    for (let j = 0; j < cols; j++) {
      currentRow.push(createNode(i, j)); // push every row fill with the coll for current row
    } 
    grid.push(currentRow); // after first row is filled push the filled array(row with the cols) to the main array (grid)
  }
  
  // add all neighbors to all Nodes => to the key neighbors(which is an array)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
    addAllNeighbors(i, j);
    } 
  }

  return grid;
};

const createNode = (i, j) => {
  // create a node with all key value pairs we need like 
  // row (i) and col (j) , if start or end node , which neighbors we have (in array)
  // the f, g , h value, the color
  return {
i: i,
i: j,
start: i === 0 && j === 0 ? true : false,
end: i === cols - 1 && j === rows - 1 ? true : false,
neighbors: [],
previous: undefined,
isWall: false,
f: 0,
g: 0,
h: 0,
backgroundColor: "white"
  };
};

const addAllNeighbors = (i, j) => {
  // check rows and cols and if valid add it as neighbor to our
  // grid => a check if the grid node is a neighbor is not implemented 
  // at this point
 if (i < cols - 1) {
  grid[i][j].neighbors.push(grid[i + 1][j]);
 }
 if ( i > 0) {
  grid[i][j].neighbors.push(grid[i - 1][j]); 
 }
 if (j < rows - 1) {
  grid[i][j].neighbors.push(grid[i][j + 1]);  
 }
 if (j > 0) {
  grid[i][j].neighbors.push(grid[i][j - 1]);  
 }
};

// FEATURES :

// ADD DIAGONAL NEIGHBORS

// BUG LIST :

// fix restart bug: ADD ALL global variables to component state
// also constructor function Spot
// refactor method calls where global vars get changed to setState

// fix bug for start and end in Spot constructor

// Check bug in drop method where you set the end and start

// Change the start and end letter to icon

// start with the legend
