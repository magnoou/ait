import Airport from '../models/airport';
import AbstractCtrl from './abstractCtrl';

export default class AirportCtrl extends AbstractCtrl {

	model = Airport;

// Searchs looks for results starting with parameter value, limiting resultset to 10
	getByName = (req, res) => {
	    this.model.find({ name: new RegExp('^'+req.params.name+'.*', "i") }, (err, obj) => {
	      if (err) { 
	      	res.end();
	      	return console.error(err); 
	      }
	      res.json(obj);
	    }).limit(10);
	  };

	getByCode = (req, res) => {
		console.log("CONTROLLER");
    	this.model.find({ code: new RegExp('^'+req.params.code+'.*', "i") }, (err, obj) => {
      		if (err) { 
      			res.end();
      			return console.error(err); 
      		}
      		res.json(obj);
    	}).limit(10);
  	};

  	getByAny = (req, res) => {
		console.log("CONTROLLER any2 ",req.params.any);
    	this.model.find({ code: new RegExp('^'+req.params.any+'.*', "i")}, (err, obj) => {
      		if (err) { 
      			res.end();
      			return console.error(err); 
      		}
      		res.json(obj);
    	}).limit(5);
  	};

}