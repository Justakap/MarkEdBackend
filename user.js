const port = 5002
const express = require('express')
const cors = require('cors')
// const UserModel = require('./models/user')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/videos")





app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})