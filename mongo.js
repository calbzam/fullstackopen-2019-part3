const mongoose = require('mongoose')

const url =
  `mongodb+srv://fullstack:fullstack@cluster0-5uh6a.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })





