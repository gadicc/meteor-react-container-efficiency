// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by gadi-tracker-react.js.
import { name as packageName } from "meteor/gadi-tracker-react";

// Write your tests here!
// Here is an example.
Tinytest.add('gadi-tracker-react - example', function (test) {
  test.equal(packageName, "gadi-tracker-react");
});
