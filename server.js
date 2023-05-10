const express = require('express');
const app = express();

app.set('view engine', 'ejs');


app.get('/', (req, res)=>{
    res.render('index');
})

const testRouter = require('./routes/test');
app.use('/test', testRouter);

app.listen(3000);