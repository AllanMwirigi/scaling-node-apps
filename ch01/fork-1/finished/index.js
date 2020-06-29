const { fork } = require('child_process')
// nodejs is single threaded therefore runs on a single processor
// forking - clone app and run it using multiple instances simultaneously

const processes = [
  fork('./app', ['3001']),
  fork('./app', ['3002']),
  fork('./app', ['3003'])
]

// run the index file - node . and app will be forked into 3 processes on separate ports

console.log(`forked ${processes.length} processes`)
