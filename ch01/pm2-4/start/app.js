const http = require('http')
const options = [
    "Go for it!",
    "Maybe sleep on it",
    "Do some more research",
    "I wouldn't"
]

const server = http.createServer((req, res) => {
    const randomIndex = Math.floor(Math.random() * options.length)
    const advice = options[randomIndex]
    const payload = JSON.stringify({
        processID: process.pid,
        advice
    })
    console.log(`advice from ${process.pid}: ${advice}`)
    res.writeHead(200, { 'Content-Type': 'application/json'})
    res.end(payload)
})

server.listen(3000)
console.log(`advice service running`)

/* 
 sudo npm i -g pm2
 start app by running - pm2 start app.js -i 3 // start 3 instances of app.js
 list running instances - pm2 list
 stop all instances - pm2 stop app
 remove app from pm2 - pm2 delete app
 let pm2 automatically select the no. of instances that it should run for current processor
    - pm2 start app.js -i -1
 logs for all processes - pm2 logs
 monitor in realtime - pm2 monit
 if code changes are made - pm2 reload app.js
    - instances will be restarted one by one and traffic diverted to instances that are not being restarted, so no downtime
 */
