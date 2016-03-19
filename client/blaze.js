import Sources from './sources';
import { $ } from 'meteor/jquery';
import './blaze.html';

Template.blaze.helpers({
  counter1() {
    var time = Date.now();
    var val = Sources.get('blaze', 1);
    time = Date.now() - time;
    console.log(`blaze#counter1 in ${time} ms`);
    return val;
  },
  counter2() {
    var time = Date.now();
    var val = Sources.get('blaze', 2);
    time = Date.now() - time;
    console.log(`blaze#counter2 in ${time} ms`);
    return val;
  }
});

Template.blaze.events({
  'click button'(event, instance) {
    var index = $(event.target).data('counter');
    return Sources.incr('blaze', index);
  }
});