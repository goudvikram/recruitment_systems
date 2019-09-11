
const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/questions/', function(req, res){

})

app.get('/api/questions/', function(req, res){
  
})

app.listen(app.get('port'), () => {
  console.log('Angular Full Stack listening on port ' + app.get('port'));
});