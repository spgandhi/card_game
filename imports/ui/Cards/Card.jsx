import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const knightSource = {
  beginDrag(props) {
    return {};
  },
  endDrag(props, monitor, component){
    console.log('end drop')
    if(monitor.didDrop())
      props.onRemoveCard(props.title);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

// Task component - represents a single todo item
class Card extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div style={{opacity: isDragging ? 0.5 : 1,fontSize: 25,fontWeight: 'bold',cursor: 'move'}} className="list-item">
        <div className="list-item-inner">
          <span className="card-label">{this.props.title}</span>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  connectDragSource: React.PropTypes.func.isRequired,
  isDragging: React.PropTypes.bool.isRequired
};

function sourceName(props){
  return props.title[0];
}

export default DragSource(sourceName, knightSource, collect)(Card);