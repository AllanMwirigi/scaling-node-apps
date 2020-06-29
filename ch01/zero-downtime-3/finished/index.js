const http = require('http')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  console.log('this is the master process: ', process.pid)
  for (let i=0; i<numCPUs; i++) {
    cluster.fork()
  }

  // when a worker fails, can start a new worker, app will always be up
  cluster.on('exit', worker => {
    console.log(`worker process ${process.pid} had died`)
    console.log(`starting new worker`)
    cluster.fork() // start a new worker
  })

} else {
  console.log(`started a worker at ${process.pid}`)
  http.createServer((req, res) => {
    res.end(`process: ${process.pid}`)
    if (req.url === '/kill') { // kill route to test instance failure
      process.exit()
    } else if (req.url === '/') {
      console.log(`serving form ${process.pid}`)
    }
  }).listen(3000)
}
