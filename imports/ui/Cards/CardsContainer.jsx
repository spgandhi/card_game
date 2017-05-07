import React, { Component } from 'react';
import Card from './Card';

// Task component - represents a single todo item
export default class CardContainer extends Component {
  componentWillReceiveProps(props){
    console.log(props);
  }
  render() {
    return (
      <div className="card-listing">
        {this.props.cards.map((item, index)=>(
          <Card title={item} key={index} onRemoveCard={this.props.onRemoveCard}/>
        ))}
      </div>
    );
  }
}