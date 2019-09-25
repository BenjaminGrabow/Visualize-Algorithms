import React from "react";
import styled from "styled-components";

const StyledAStar = styled.div`
  .box {
    border: 0.1rem solid black;
    width: 1rem;
    height: 1rem;
  }
`;

class AStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: null
    };
  }

  componentDidMount = () => {
    let arr = [];
    let rows = 10;
    let columns = 10;
    let counter = 0;

    
    const fill2DimensionsArray = (arr, rows, columns) => {
      for (let i = 0; i < rows; i++) {
        arr.push([counter]);
        for (let j = 0; j < columns; j++) {
          arr[i][j] = counter;
        counter += 1;
        }
      }
    }

    fill2DimensionsArray(arr, rows, columns);
    
    console.log(arr);
    this.setState({
      grid: arr
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
                    <td className={`box ${element}`} key={j}>
                      {element}
                    </td>
                  );
                });
                return (
                  <tr className={`box ${entry}`} key={i}>
                    {entry}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </StyledAStar>
    );
  }
}

export default AStar;
