const { urlencoded } = require('express')
const express = require('express')
require('dotenv').config()
const config = require(`./configs/config.${process.env.NODE_ENV}.js`)
const app = express()
const PORT = config.PORT
const mongoose = require('mongoose')
const urlShort = require('./models/url.model')

mongoose.connect(`${config.dbUrl}`,{
    useNewUrlParser :true,useUnifiedTopology : true
}).then(()=>{
    console.log(`Database connected: ${process.env.NODE_ENV}`);
})


app.set('view engine','ejs')

app.use(express.urlencoded({extended : false}))

app.get('/',async(req,res)=>{
    const response = await urlShort.find();
    res.render("index",{response : response});
})

app.post('/short',async(req,res)=>{
    try {
        const response = await urlShort.create({fullUrl : req.body.fullUrl});
    } catch (error) {
        res.status(400).json({error})
    }
    
    res.status(201).redirect('/')
})

app.get('/:shortenId',async(req,res)=> {
    const response = await urlShort.findOne({shortUrl : req.params.shortenId})
    if(response == null) {
        return res.status(404).send("Not found");
    }
    res.status(301).redirect(response.fullUrl)

})

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
});