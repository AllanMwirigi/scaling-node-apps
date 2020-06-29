const http = require('http')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

/*
a cluster is a group of node instances that all work together
made up of worker processes (the forked instances) and the main process that spawns and controls the workers
set up a cluster to make use of every processor available
when a single instance fails, the rest are used. the main process can detect worker failures and automatically restart them
*/
if (cluster.isMaster) {
  console.log('this is the master process: ', process.pid)
  for (let i=0; i<numCPUs; i++) {
    cluster.fork() // clone this app as per the no. of cpus
    // will create one master process and {numCPUs} workers
  }
} else { // this is a worker process
  http.createServer((req, res) => {
    const message = `worker ${process.pid}...`
    console.log(message)
    res.end(message)
  }).listen(3000)
}

/* 
however only one or few workers will be used if traffic is low. it is spread out as traffic increases
so can carry out a load test to simulate traffic
 - npm install loadtest -g
 - loadtest -n 300 http://localhost:3000 // -n is the number of hits
*/

