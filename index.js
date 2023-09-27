let port = 3000;

app.get('/',(req, res)=> res.send('ok'));//implementin the response behaviour
app.listen(port,()=>console.log('Express app is running on port 3000'))
app.get('/test',(req,res)=>{
    res.status(200).json({status:200, message:'ok'});
});
app.get('/time',(req,res)=>{
    let currentTime= new Date();
    let hour=currentTime.getHours();
    let minute=currentTime.getMinutes()
    res.status(200).json({status:200, message: `${hour}:${minute<10?'0':''}${minute}`});
});
app.listen(port,()=>console.log('Express app is running on port 3000'))