import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';


import setRoutes from './routes';

const app = express();

//port for server side
app.set('port', 3000);

app.use('/', express.static('../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Connected to Mongo');

  	setRoutes(app);
  	app.get('/*', function(req, res) {
	    res.sendFile('../public/index.html');
	});

	app.listen(app.get('port'), () => {
    	console.log('Angular Full Stack listening on port ' + app.get('port'));
	});

});

export { app };