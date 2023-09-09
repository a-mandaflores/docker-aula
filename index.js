const express = require('express')
const mysql = require('mysql2')

const app = express()
const port = 3000

const connection = mysql.createConnection({
  host: 'amanda-mysql',
  user: 'root',
  password: 'segredo',
  database: 'amanda_db',
  port: 3306
})

app.get('/', (req, res) => {
  connection.query('SELECT * from produtos', function(error, results, fields){
    if(error) throw error;
    res.send(`${results[0].nome} - ${results[1].nome}`)

  connection.end()
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})