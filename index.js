let express = require('express');
let app = express();//creating an instance of Express
let port = 3000;//specifying the port

app.get('/',(req, res)=> res.send('ok'));
app.listen(port,()=>console.log('Express app is running on port 3000'))