const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const PORT = 3001

const app = express()

app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(bodyParser.json())

const employees = [
  {
    id: 1,
    name: 'John',
    status: 'Working',
    img: 'https://api.dicebear.com/8.x/thumbs/svg?seed=John',
  },
  {
    id: 2,
    name: 'Jack',
    status: 'Working',
    img: 'https://api.dicebear.com/8.x/thumbs/svg?seed=Jack',
  },
  {
    id: 3,
    name: 'Sheli',
    status: 'Working',
    img: 'https://api.dicebear.com/8.x/thumbs/svg?seed=Sheli',
  },
  {
    id: 4,
    name: 'Eitan',
    status: 'Working',
    img: 'https://api.dicebear.com/8.x/thumbs/svg?seed=Eitan',
  },
  {
    id: 5,
    name: 'Lara',
    status: 'Working',
    img: 'https://api.dicebear.com/8.x/thumbs/svg?seed=Lara',
  },
  {
    id: 6,
    name: 'Mike',
    status: 'Working',
    img: 'https://api.dicebear.com/8.x/thumbs/svg?seed=Mike',
  },
]

app.get('/users', (req, res) => {
  // res.send(employees)
  setTimeout(() => {
    res.send(employees)
  }, 1000)
})

app.post('/users/:id', (req, res) => {
  const index = employees.findIndex(obj => obj.id === +req.params.id)
  employees[index].status = req.body.status
  res.send(employees)
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
