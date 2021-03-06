const { Genre, validate } = require('../models/genre')
const auth = require('../middleware/auth')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router() 

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort('name')
  return res.send(genres)
})

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id)

  if (!genre) return res.status(400).send("It seems we do not have this id you are looking for.")

  return res.send(genre)
})

router.post("/", auth, async (req, res) => {
  //INPUT VALIDATION WITH JOI
  // const schema = Joi.object({
  //   name: Joi.string().min(3).required()
  // })

  // const result = schema.validate(req.body)

  // if (result.error) {
  //   console.log(result.error)
  //   return res.status(400).send(result.error.details[0].message)
  // }

  const {
    error
  } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let genre = new Genre ({ name: req.body.name })

  genre = await genre.save()
  return res.send(genre)
})

router.put("/:id", async (req, res) => {
  const {
    error
  } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {new: true})

  if (!genre) return res.status(404).send('This genre was not found')
  
  return res.send(genre)
})

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)

  if (!genre) return res.status(404).send('This genre was not found')

  
  return res.send(genre)
})


module.exports = router //After we attached all the routes to the router, we export it.