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
  let endTime = Date.now() + (index === 1 ? 50 : 500);
  while (Date.now() < endTime);

  return counters[name][index-1].get(val);
}

var incr = (name, index) =>
  counters[name][index-1].set(counters[name][index-1].get() + 1);

export default { get, set, incr };
