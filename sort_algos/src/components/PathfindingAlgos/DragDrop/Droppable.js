import React from "react";

class Droppable extends React.Component {
  drop = event => {
    event.preventDefault();
    const data = event.dataTransfer.getData("transfer");

    event.target.append(document.getElementById(data));
    console.log(event.target.parentNode)
  };

  allowDrop = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div
        className="dragDrop"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "1rem",
          height: "1rem"
        }}
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
