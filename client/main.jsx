import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';

import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
  render(<DragDropContextProvider backend={HTML5Backend}><App /></DragDropContextProvider>, document.getElementById('render-target'));
});