import React from 'react';

class PathfindingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      nodes: []
     }
  }

  componentDidMount = () => {
  const nodes = [];
  for(let row = 0; row < 20; row++){
    const currentRow = [];
    for(let col = 0; col < 50; col++) {
      currentRow.push([]);
    }
    nodes.push(currentRow);
  }
  this.setState({nodes});
  };

  render() { 
    return (  );
  }
}
 
export default PathfindingVisualizer;