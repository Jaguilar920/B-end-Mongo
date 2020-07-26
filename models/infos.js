const {Schema, model} = require('mongoose')

const infoSchema = new Schema({
    name: String,
    description: String
})

const Info = model('info', infoSchema)

module.exports = Info