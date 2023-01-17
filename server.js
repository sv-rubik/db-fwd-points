import express from 'express'
import path from 'path'
import cors from 'cors'
import fs from 'fs'
import {histDataUpdate} from "./server/app.js"

const app = express()
app.use(express.json())
app.use(cors())

//GET
app.get('/api/rates', (req, res) => {
    fs.readFile('./server/db/db.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({result: 0, text: err}))
        } else {
            res.send(data)
        }
    })
})

app.get('/fetch-data', (req, res) => {
    histDataUpdate()
})

// Fetch data and update db.json
// setInterval(histDataUpdate, 5000)

app.use(express.static(path.resolve('./public')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve('./public', 'index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server started and listening ${port} port`)
})
