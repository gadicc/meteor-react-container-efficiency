## meteor-react-container-efficiency

Live at [container-efficiency.meteor.com](http://container-efficiency.meteor.com)
until Friday :)  There is timing info in the console if you want it.

Relates to the discussion at https://forums.meteor.com/t/meteor-1-3-and-react-composition-with-reactive-data-sources/19171.

Illustrates the UI impact of lumping all reactivity into a single `autorun` vs
isolating them like we did in Blaze.

In the sample, there are two reactive functions, one that's "fast" (50ms) and
one thats "slow" (500ms).

* **Blaze**: incrementing either takes 50ms or 500ms, respectively.

* **CreateContainer**: incrementing either takes 550ms, the sum of both.

* **TrackerReact**: I expected this to be different but I might have
misunderstood how it's meant to work.  Same as above.

* **GadiContainer**: Works more like Blaze, see below.

### GadiCreateContainer

I wanted to show that there's really no reason we can't do this in React
so I might a super quick example, obviously it's nothing fancy.

I also prefer the HOC pattern, so just modified it slightly like this:

https://github.com/gadicc/meteor-react-container-efficiency/blob/2e76849744c65b2cf4b31ed074e2097ba8dd8e99/client/react.jsx#L88-L99

So the container func is no longer reactive (which I think is safer), but
it can provide functions in a `reactive` key, which are run reactively
in isolation.

The super simple code is at:

https://github.com/gadicc/meteor-react-container-efficiency/blob/master/packages/gadi-tracker-react/gadi-tracker-react.js