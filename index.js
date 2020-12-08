const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const csv = require('csvtojson');

async function first(){
    const read = fs.readFileSync("employees.csv","utf-8")
    const jsonObj = await csv().fromString(read)
    app.get('/employee', (req, res) => {
        //let x = String(jsonObj[1].last_name)
        res.send(jsonObj)
        
      })
}

first()

async function id(){
    const read = fs.readFileSync("employees.csv","utf-8")
    const jsonObj = await csv().fromString(read)
    app.get(`/employee/:id`, (req, res) => {
        const id = parseInt(req.params.id);
        //let x = String(jsonObj[1].last_name)
        res.send(jsonObj[id-1])
        
    })
    app.get(`/employee/:id/:atr`, (req, res) => {
        const id = parseInt(req.params.id)
        const atr = req.params.atr
        res.send(`${atr} : ${jsonObj[id-1][atr]}`)
        
    })
    
}

id()

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}/employee`)
})

