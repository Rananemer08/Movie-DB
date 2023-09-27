let express = require('express');
let app = express();
let port = 3000;//specifying the port

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]


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
// app.get('/movies/add',(req,res)=>{
//     res.status(200).json({status:200, message:'create'});
// });
// app.get('/movies/get',(req,res)=>{
//     res.status(200).json({status:200, data:movies});
// });
app.get('/movies/edit',(req,res)=>{
    res.status(200).json({status:200, message:'update'});
});
app.get('/movies/delete',(req,res)=>{
    res.status(200).json({status:200, message:'delete'});
});

app.get('/movies/get/:condition?',(req,res)=>{
    let getBy=req.params.condition;
    if(getBy=='by-date'){
        let sortedByDate=movies.sort((a,b)=>a.year-b.year);
        res.status(200).json({status:200, data:sortedByDate});
    }
    else if(getBy=='by-rating'){
        let sortedByRating=movies.sort((a,b)=>a.rating-b.rating);
        res.status(200).json({status:200, data:sortedByRating});
    }
    else if(getBy=='by-title'){
        let sortedByTitle=movies.sort((a,b)=>a.title.localeCompare(b.title));
        res.status(200).json({status:200, data:sortedByTitle});
    }
    res.status(200).json({status:200, data:movies});
});

app.get('/movies/get/id/:id?',(req,res)=>{
    let bookID=req.params.id;
    if(bookID>0 && bookID<=movies.length){
        res.status(200).json({status:200, data:movies[bookID-1]});
    }
    else if(bookID>movies.length || bookID<=0){
    res.status(404).json({status:404, error: true, message:`The movie ${bookID} doesn't exit`});
    }else{
    res.status(404).json({status:404, error: true, message:`invalid id`});
    }
});

app.get('/movies/add',(req,res)=>{
    let addTitle= req.query.title;
    let addYear= parseInt(req.query.year);
    let addRating=req.query.rating;
    if(addTitle||addYear||addRating){
    if (addTitle && !isNaN(addYear) && addYear.toString().length==4){
        if(addRating){
            movies.push({ title: addTitle, year: addYear, rating: addRating });
            res.status(200).json({ status: 200, data: movies });
        }
        else{
            movies.push({ title: addTitle, year: addYear, rating: 4 });
            res.status(200).json({ status: 200, data: movies });
        }
    }
    else {
        res.status(403).json({status: 403, error: true, message: 'you cannot create a movie without providing a title and a year'});
    }
} else{
    res.status(200).json({status:200, message:'create'});
}

});


app.get('/movies/delete/:id?',(req,res)=>{
    let bookID=req.params.id;
    if(bookID){

    if(bookID>0 && bookID<=movies.length){
        movies.splice(bookID-1,1);
        res.status(200).json({status:200, data:movies});
    }
    else if(bookID>movies.length || bookID<=0){
    res.status(404).json({status:404, error: true, message:`The movie ${bookID} doesn't exit`});
    }else{
    res.status(404).json({status:404, error: true, message:`invalid id`});
    }
    }
    else{
    res.status(200).json({status:200, message:'delete'});
    }
});

app.listen(port,()=>console.log('Express app is running on port 3000'))