// Node myFile.js
const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running
myFile.runContents();

function shouldContinue() {
    // Check one: Any pending setTimeout, setInterval, setImmediate?
    // Check two: Any pending OS tasks? (Like server listening to port)
    // Check three: Any pending long running operations? (maybe fs module?)
    return pendingTimers.length || pendingOSTasks.length || pending.pendingOperations.length;
};

// Entire body executes in one 'tick'
while(shouldContinue()) {
    // 1) Node looks at pendingTimers to see if any functions need to be called (setTimeout, setInterval)
    // 2) Node looks at pendingOSTasks and pendingOperations to see if any functions need to be called
    // 3) Node pauses execution. Continues when...
    //  - a new pendingOSTask is done..
    //  - a new pendingOperation is done..
    //  - a timer is about to complete..

    // 4) Look at pendingTimers. (setImediate only)
    // 5) Handle any 'close' event (streams)
};

// exit back to terminal
