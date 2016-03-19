import { ReactiveVar } from 'meteor/reactive-var';

var counters = {};

var assert = (name) => {
  if (!counters[name])
    counters[name] = [ new ReactiveVar(0), new ReactiveVar(0) ]
}

var set = (name, index, val) => {
  assert(name);
  counters[name][index-1].set(val);
}

var get = (name, index, val) => {
  assert(name);
  if (index === 2) {
    // an "expensive" query
    let time = Date.now();
    while (Date.now() < time + 500);
  }
  return counters[name][index-1].get(val);
}

var incr = (name, index) =>
  counters[name][index-1].set(counters[name][index-1].get() + 1);

export default { get, set, incr };
