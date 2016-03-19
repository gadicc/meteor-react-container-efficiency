import React, { Component } from 'react';
import { render } from 'react-dom';

import { Meteor } from 'meteor/meteor';
import Sources from './sources';

import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'meteor/react-meteor-data';
import { reactive, gadiCreateContainer } from 'meteor/gadi-tracker-react';

Meteor.startup(() => {
  var div = document.createElement('div');
  document.body.appendChild(div);
  render(<App />, div);
});

const App = () => (
  <div>
    <CreateContainerContainer/>
    <TrackerReactComponent />
    <GadiContainer />
  </div>
);

function get(name, i) {
  var time = Date.now();
  var data = Sources.get(name, i);
  console.log(`${name}#counter${i} in ${Date.now()-time} ms`);
  return data;  
}

/* DisplayComponent */

const DisplayComponent = ({ name, click, counter1, counter2 }) => (
  <div>
    <h2>{name}</h2>
    <ul>
      <li>Counter1: {counter1}</li>
      <li>Counter2: {counter2}</li>
    </ul>
    <div>
      <button onClick={click.bind(null,1)}>Fast Counter1++</button>
      <button onClick={click.bind(null,2)}>Slow Counter2++</button>
    </div>
  </div>
);

/* createContainer */

const CreateContainerContainer = createContainer(() => {
  var time = Date.now();
  var data = {
    name: 'CreateContainer',
    click(i) { Sources.incr('createContainer', i); },
    counter1: get('createContainer', 1),
    counter2: get('createContainer', 2)
  };
  console.log('createContainer took ' + (Date.now() - time) + ' ms');
  return data;
}, DisplayComponent);

/* trackerReact */

class TrackerReactComponent extends TrackerReact(Component) {
  click(i) { Sources.incr('trackerReact', i); }
  counter1() { return get('trackerReact', 1); }
  counter2() { return get('trackerReact', 2); }

  render() {
    return (
      <div>
        <h2>TrackerContainer</h2>
        <ul>
          <li>Counter1: { this.counter1() }</li>
          <li>Counter2: { this.counter2() }</li>
        </ul>
        <div>
          <button onClick={this.click.bind(null,1)}>Fast Counter1++</button>
          <button onClick={this.click.bind(null,2)}>Slow Counter2++</button>
        </div>
      </div>
    )
  }
}

/* gadiTrackerReact */

const GadiContainer = gadiCreateContainer(() => {
  return {
    name: 'GadiCreateContainer',
    click(i) { Sources.incr('gadiCreateContainer', i); },
    reactive: {
      counter1() { return get('gadiCreateContainer', 1) },
      counter2() { return get('gadiCreateContainer', 2) }
    }
  };
}, DisplayComponent);
