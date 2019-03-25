const express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs')

const app = express();
const bodyParser = require('body-parser');
const tokVerify = require('./middlewares/tokenVerify');

const loginRoutes = require('./routes/login');
const protectedRoutes = require('./routes/protected');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.all('/api/*',tokVerify);

app.get('/', (req,res) => {
    res.status(200).json({message: 'Welcome!'});
});

app.use('/login', loginRoutes);
app.use('/api/protected', protectedRoutes);

http.createServer(app.listen(3100));
https.createServer({
    // key: fs.readFileSync('./src/encryption/key.pem', 'utf8'),
    // cert: fs.readFileSync('./src/encryption/certificate.pem', 'utf8') //valid for a year
    // key: fs.readFileSync('./src/encryption/server.key', 'utf8'),
    // cert: fs.readFileSync('./src/encryption/server.cert', 'utf8')
    key: fs.readFileSync('./src/encryption/server.key'),
    cert: fs.readFileSync('./src/encryption/server.cert')               //valid for 30 days
  }, app).listen(3000);

//app.listen(3000);