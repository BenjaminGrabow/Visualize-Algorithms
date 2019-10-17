import React from "react";
import Node from "./Node/Node";
import styled from "styled-components";
// import Draggable from "./DragDrop/Draggable";

const StyledAStar = styled.div`
  display: flex;

  .box {
    border: 0.1rem solid #3f51b5;
    width: 2rem;
    height: 2rem;
    /* border-radius: 50%; */
  }
`;

export default class AStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: null
    };
  }

  componentDidMount = () => {
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
    // // console.log(e.target.className);
    // if (
    //   e.target.className !== "dragDrop" &&
    //   e.target.className.split(" ").length === 1
    // ) {
    //   // check the className because of drag and drop bug
    //   let copyOfGrid = [...this.state.grid];
    //   const clickedSpot = e.target.id.split(" ");

    //   if (
    //     copyOfGrid[clickedSpot[0]][clickedSpot[1]].backgroundColor === "white"
    //   ) {
    //     if (copyOfGrid[clickedSpot[0]][clickedSpot[1]].wall) {
    //       copyOfGrid[clickedSpot[0]][clickedSpot[1]].wall = false;
    //     } else {
    //       copyOfGrid[clickedSpot[0]][clickedSpot[1]].wall = true;
    //     }
    //     this.setState({
    //       grid: copyOfGrid
    //     });
    //   }
    // }

  };

  restart = () => {
    openSet = [];
    closedSet = [];
    current = null;

    this.componentDidMount();
  };

  // drop = event => {
  //   event.preventDefault();
  //   const data = event.dataTransfer.getData("transfer");
  //   event.target.append(document.getElementById(data));
  //   const changeStartOrEnd = event.target.parentNode.id.split(" ");

  //   if (data === "end") {
  //     end = this.state.grid[changeStartOrEnd[0]][changeStartOrEnd[1]];
  //   } else {
  //     start = this.state.grid[changeStartOrEnd[0]][changeStartOrEnd[1]];
  //   }
  // };

  // allowDrop = event => {
  //   event.preventDefault();
  // };

  render() {
    return (
      <StyledAStar>
        {/* actual grid */}
        {this.state.grid ? (
          <table className="table-hover table-striped table-bordered">
            <tbody>
              {this.state.grid.map((item, i) => {
                let entry = item.map((element, j) => {
                  return (
                    <td
                    id={`${element.i} ${element.j}`}
                      className="box"
                      style={{
                        backgroundColor: `${
                          element.wall ? "black" : element.backgroundColor
                        }`
                      }}
                      key={j}
                      >
                     <Node start={element.start} end={element.end} 
                    //  id={element}
                     />
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

// create empty main array for grid
let grid = [];

// columns and rows
let cols = 20;
let rows = 20;

// Open and closed set
let openSet = [];
let closedSet = [];

// Start and end
let start;
let end;
let current;

// i stands for row and j for col
const createInitialGrid = () => {
  grid = [];
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

// create a node with all key value pairs we need like
// row (i) and col (j) , if start or end node , which neighbors we have (in array)
// the f, g , h value, the color
const createNode = (i, j) => {
  return {
    i: i,
    j: j,
    start: i === 0 && j === 0,
    end: i === cols - 1 && j === rows - 1,
    neighbors: [],
    previous: undefined,
    isWall: false,
    // f, g, and h values for A*
    f: 0, // h + g = f;
    g: 0, // from current field to this field
    h: 0, // from this field to the end field (educated guess)
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
  if (i > 0) {
    grid[i][j].neighbors.push(grid[i - 1][j]);
  }
  if (j < rows - 1) {
    grid[i][j].neighbors.push(grid[i][j + 1]);
  }
  if (j > 0) {
    grid[i][j].neighbors.push(grid[i][j - 1]);
  }
};

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
const heuristic = (a, b) => {
  let d = Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
  return d;
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
