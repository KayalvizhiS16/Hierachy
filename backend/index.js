const express = require('express');
const cors=require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const app = express();
app.use(cors());
const PORT=process.env.PORT ||5000;
dotenv.config();
app.use(bodyParser.json());
mongoose
.connect(process.env.MONGO_DB_URL)
.then(()=>console.log('DB Connection Established'))
.catch(()=>console.log('Error'))

app.listen(PORT,()=>{
    console.log(`Your app listening on ${PORT}`);
})