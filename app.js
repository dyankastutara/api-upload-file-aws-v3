const app = require("express")();
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');

app.set('port', process.env.PORT || '8080')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes.index);
app.use('/upload', routes.upload);

app.listen(app.get('port'), (error)=>{
   if (error) {
      console.log('Error during app startup', error);
   }else{
      console.log('App running on port = ', app.get('port'));
   }
})