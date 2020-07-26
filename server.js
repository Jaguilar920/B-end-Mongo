require('custom-env').env(true);
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const db = mongoose.connection
const dbConfig = {useNewUrlParser: true, useUnifiedTopology: true}
const PORT = process.env.PORT
const Info = require('./models/infos.js')

//cors
const corsOptions = {
    origin: process.env.cor ,
    optionsSuccessStatus: 200
}

///connection

mongoose.connect(process.env.MONGODB_URI, dbConfig);

db.on('open', () => {
    console.log('connected to mongo');
});
db.on('error', (err) => {
    console.log(err)
});

//MIDDLE
app.use(cors(corsOptions))
app.use(express.json());

//ROUTES

app.get('/index', async (req, res) => {
    console.log('get');
    res.json(await Info.find({}));
});

app.post('/create', async (req, res) => {
    console.log('create');
    res.json(await Info.create(req.body));
});

app.get('/show/:id', async (req, res)=> {
    res.json(await Info.findById(req.params.id))
})

app.put('/update/:id', async (req, res) => {
    res.json(await Info.update({_id: req.params.id}, req.body))
})

app.delete('/delete/:id', async (req, res) => {
    res.json(await Info.findByIdAndDelete(req.params.id))
})
//LISTENER

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})