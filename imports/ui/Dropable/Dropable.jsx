import React, { Component } from 'react';
 
import { DropTarget } from 'react-dnd';

const onDrop = {
  canDrop(props) {
    return true;
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

// Task component - represents a single todo item
class Dropable extends Component {
  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;
    return connectDropTarget(
      <div className="dropable-item">
        <div className="dropable-item-inner">
            <span className="dropable-label">{this.props.title}</span>
        </div>
      </div>
    );
  }
}

function dropName(props){
  return props.title[0];
}

export default DropTarget(dropName, onDrop, collect)(Dropable);