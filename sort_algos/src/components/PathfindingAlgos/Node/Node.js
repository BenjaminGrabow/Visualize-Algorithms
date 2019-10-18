import React from "react";
import Draggable from "../DragDrop/Draggable";

class Node extends React.Component {
  render() {
    const {
      i,
      j,
      start,
      end,
      wall,
      backgroundColor,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      onDragOver,
      onDrop
    } = this.props;

    return (
      <td
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseUp={onMouseUp}
        style={{
          backgroundColor: `${wall ? "black" : backgroundColor}`
        }}
        className="node"
        id={`${i} ${j}`}
      >
        {start ? (

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
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Draggable id="start" className="dragDrop">
              <i
                id="start1"
                style={{ margin: "0", padding: "0" }}
                className="fa fa-play-circle dragDrop"
              />
            </Draggable>
          </div>

        ) : end ? (

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
            onDrop={onDrop}
            onDragOver={onDragOver}
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
            id={`${i}${j}`}
            className="dragDrop"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "1rem",
              height: "1rem"
            }}
            onDrop={onDrop}
            onDragOver={onDragOver}
          />

        )}
      </td>
    );
  }
}

export default Node;

// this was initial code in AStar file
// {/* {
//                         element.start ? (
//                         <div
//                           id="dr1"
//                           className="dragDrop"
//                           style={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             width: "1rem",
//                             height: "1rem"
//                           }}
//                           onDrop={this.drop}
//                           onDragOver={this.allowDrop}
//                         >
//                           <Draggable id="start" className="dragDrop">
//                             <i
//                               id="start1"
//                               style={{ margin: "0", padding: "0" }}
//                               className="fa fa-play-circle dragDrop"
//                             />
//                           </Draggable>
//                         </div>
//                       ) : element.end ? (
//                         <div
//                           id="dr2"
//                           className="dragDrop"
//                           style={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             width: "1rem",
//                             height: "1rem"
//                           }}
//                           onDrop={this.drop}
//                           onDragOver={this.allowDrop}
//                         >
//                           <Draggable className="dragDrop" id="end">
//                             <i
//                               id="end1"
//                               style={{ margin: "0", padding: "0" }}
//                               className="fa fa-bullseye dragDrop"
//                             />
//                           </Draggable>
//                         </div>
//                       ) :
//                        (
//                         <div
//                           id={`${element.i}${element.j}`}
//                           className="dragDrop"
//                           style={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             width: "1rem",
//                             height: "1rem"
//                           }}
//                           onDrop={this.drop}
//                           onDragOver={this.allowDrop}
//                         />
//                       )} */}

// From second Change

// <td
//                     id={`${element.i} ${element.j}`}
//                       className="box"
//                       style={{
//                         backgroundColor: `${
//                           element.wall ? "black" : element.backgroundColor
//                         }`
//                       }}
//                       key={j}
//                       >
//                      <Node start={element.start} end={element.end}
//                     //  id={element}
//                      />
//                     </td>
