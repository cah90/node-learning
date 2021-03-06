const express = require('express') //it is a function
const server = express() //it is an object with many properties and methods.

server.use(express.json()) //*we add this to enable parsing up json objects in the body of the request.

const courses = [
  {id: 1, name: 'courses1'},
  {id: 2, name: 'courses2'},
  {id: 3, name: 'courses3'}
]

server.get('/', (req, res) => {
  return res.send("Hello World! Smile you are in the index page!")
})

server.get('/api/courses', (req, res) => {
  return res.send(courses) //* It sends all the courses I have registered so far.
})

server.get('/api/courses/:id', (req,res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id))
  // courses are an array of objects. 
  // find method receives a test function as a parameter.
  // this function will receive one course (object) per time.
  // when the test function returns true, then the find method will return that current course.

  if(!course) return res.status(404).send('It seems we do not have this course.')

  return res.send(course)
})

server.post('/api/courses', (req,res) => {  
  console.log(req.body)

  //* INPUT VALIDATION
  if(!req.body.name || req.body.name.length < 3) {
    return res.status(400).send("name is required and should be minimum of 3 characters")
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  
  courses.push(course)
  return res.send(course)
})

server.put('/api/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id))
  if(!course) return res.status(404).send('Course not found')

  if(!req.body.name || req.body.name.length < 3) {
    return res.status(400).send("name is required and should be minimum of 3 characters")
  }

  course.name = req.body.name
  return res.send(course)
})

server.delete('/api/courses/:id', (req,res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id))
  if(!course) return res.status(404).send('Course not found')

  const index = courses.indexOf(course) //return the position (index) of that object in the array.
  console.log(index)
  
  courses.splice(index,1) 
  // the first one is the position of the item of array
  //to be deleted and the second how many positions after that will be deleted.

  return res.send(course)
})




server.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.query) //Comes after question mark => ?sortBy=name
  res.send(req.params) //Set after the collon => /2018/5

  //* Route params is used for essential or required values.
  //* Query params is used for everything else that is optional.
})

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`Listening to the port ${port}`))
