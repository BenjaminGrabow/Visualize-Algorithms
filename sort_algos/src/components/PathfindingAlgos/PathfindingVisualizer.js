import React from 'react';
import Node from './Node/Node';

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
    const {nodes} = this.state;
    console.log(nodes)
    return ( 
      <div className="grid">
        {nodes.map((row, rowIndex) => {
          return <div>
            {row.map((node, nodeIndex) => <Node/>)}
            </div>
        })}
      </div>
     );
  }
}
 
export default PathfindingVisualizer;