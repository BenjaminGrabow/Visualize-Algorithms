import React from "react";

class Droppable extends React.Component {
  drop = event => {
    event.preventDefault();
    const data = event.dataTransfer.getData("transfer");

    event.target.append(document.getElementById(data));
  };

  allowDrop = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div
        id={this.props.id}
        onDrop={this.drop}
        onDragOver={this.allowDrop}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Droppable;
