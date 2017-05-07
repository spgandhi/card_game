import { Meteor } from 'meteor/meteor';
import '../imports/api/cards.js';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.methods({
    updateUserCards: function(cards) {
      Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.cards': cards}});
    },
    getUserCards: function(){
      let user = Meteor.users.find({_id: Meteor.userId()}).fetch();
      return user.profile.cards;
    }
  });
});


