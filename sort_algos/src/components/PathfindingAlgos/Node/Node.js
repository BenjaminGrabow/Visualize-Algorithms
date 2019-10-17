import React from "react";

class Node extends React.Component {
  render() {
    const { start, end, id } = this.props;

    return (
      <div className="node" id={id}>
        {start ? (
          <i
            id="start1"
            style={{ margin: "0", padding: "0" }}
            className="fa fa-play-circle dragDrop"
          />
        ) : end ? (
          <i
            id="end1"
            style={{ margin: "0", padding: "0" }}
            className="fa fa-bullseye dragDrop"
          />
        ) : null}
      </div>
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
