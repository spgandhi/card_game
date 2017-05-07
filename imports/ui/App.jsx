import React, { Component } from 'react';
import CardContainer from './Cards/CardsContainer';

import DropableContainer from './Dropable/DropableContainer';
import { createContainer } from 'react-meteor-data';
import { Cards } from '../api/cards.js';
import Task from './Tasks.jsx';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import { Accounts } from 'meteor/accounts-base';

const cardStack = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6']
@DragDropContext(HTML5Backend)
// App component - represents the whole app
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      gameState: 0, // 0 = start, 1 = ongoing, 2 = over
      cards: [],
    }
  }

  componentDidMount(){
    
    Accounts.onLogin((user)=>{
      const cards = Meteor.user().profile.cards;
      console.log(cards);
      if(!cards || cards.length === 0 ){
        this.setState({cards: cardStack});
        Meteor.call('updateUserCards', cardStack);
      }else {
        this.setState({cards: cards});
      }
      this.updateUser(Meteor.userId());
    })

    Accounts.onLogout((user)=>{
      this.updateUser(null);
    })
  }

  updateUser(user){
    this.setState({user});
  }

  removeCard(name){
    let cards = this.state.cards;
    var index = cards.indexOf(name);
    if(index !== -1) cards.splice(index, 1);
    this.setState({cards});
    Meteor.call('updateUserCards', cards);
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  restartGame(){
    this.setState({cards: cardStack});
    Meteor.call('updateUserCards', cardStack);
  }
 
  render() {
    console.log('rerendering');
    return (
      
        <div className="container">
          <LoginButtons />
          <header>
            <h1>Game Of Cards</h1>
          </header>
          {this.state.user &&
            <div>
              <ul>
                <CardContainer cards={this.state.cards} onRemoveCard={this.removeCard.bind(this)} />
              </ul>
              <DropableContainer />
            </div>
          }
          {!this.state.user && 
            <div>PLease Login</div>
          }
          {this.state.cards.length === 0 &&
            <button onClick={this.restartGame.bind(this)}>Restart</button>
          }
        </div>
    );
  }
}
 
App.propTypes = {
  cards: React.PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    cards: Cards.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);