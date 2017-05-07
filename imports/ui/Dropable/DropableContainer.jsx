import React, { Component } from 'react';
import Dropable from './Dropable';

// Task component - represents a single todo item
export default class DropableContainer extends Component {

  render() {
    let dropableItems = ['HEART', 'SPADE', 'CLUB', 'DIAMOND'];
    return (
      <div className="dropable-container">
        {dropableItems.map((item, index)=>(
          <Dropable title={item} key={index} />
        ))}
      </div>
    );
  }
}