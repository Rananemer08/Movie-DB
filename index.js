let express = require('express');
let app = express();
let port = 3000;//specifying the port


app.get('/',(req, res)=> res.send('ok'));


app.get('/test',(req,res)=>{
    res.status(200).json({status:200, message:'ok'});
});
app.get('/time',(req,res)=>{
    let currentTime= new Date();
    let hour=currentTime.getHours();
    let minute=currentTime.getMinutes()
    res.status(200).json({status:200, message: `${hour}:${minute<10?'0':''}${minute}`});
});

app.get('/hello/:id?',(req,res)=>{
    let userID=req.params.id || 'empty id';
    res.status(200).json({status:200, message:`Hello, ${userID}`});
});

app.get('/search',(req,res)=>{
    let userSearch=req.query.s;
    if(typeof userSearch!= 'undefined' && userSearch!=""){
        res.status(200).json({status:200, message:`ok`, data: userSearch});
    }
    else{
        res.status(500).json({status:500, error: true ,message:`you have to provide a search`});
    }

});

app.listen(port,()=>console.log('Express app is running on port 3000'))