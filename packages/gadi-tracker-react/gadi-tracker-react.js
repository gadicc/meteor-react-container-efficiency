import React from 'react';
import { Tracker } from 'meteor/tracker';
import { ReactiveVar } from 'meteor/reactive-var';

const gadiCreateContainer = (dataFunc, Component) => {
  return React.createClass({
    displayName: 'GadiDataContainer',

    getInitialState() {
      var data = dataFunc();
      var reactive = data.reactive;
      delete data.reactive;

      this._reactives = {};

      for (let key in reactive) {
        this._reactives[key] = Tracker.autorun((c) => {
          if (c.firstRun)
            data[key] = reactive[key]();
          else
            this.setState({ [key]: reactive[key]() });
        });
      }

      return data;    
    },

    componentWillUnmount() {
      for (let key in this._reactives)
        this._reactives[key].stop();
    },

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  });
}

export { gadiCreateContainer };