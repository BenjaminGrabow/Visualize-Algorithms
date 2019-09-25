import React from "react";

class Draggable extends React.Component {
  drag = event => {
    event.dataTransfer.setData("transfer", event.target.id);
  };

  dontAllowDrop = event => {
    event.stopPropagation();
  };

  render() {
    return (
      <div
        id={this.props.id}
        draggable="true"
        onDragStart={this.drag}
        onDragOver={this.dontAllowDrop}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Draggable;
