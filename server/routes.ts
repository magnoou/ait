import * as express from 'express';

import AirportCtrl from './controllers/airportCtrl';

import Airport from './models/airport';

export default function setRoutes(app) {

  const router = express.Router();

  const airportCtrl = new AirportCtrl();


  // Airport routes
  router.route('/airports/name/:name').get(airportCtrl.getByName);
  router.route('/airports/code/:code').get(airportCtrl.getByCode);
  router.route('/airports/find/:any').get(airportCtrl.getByAny);

  // Apply prefix to routes
  app.use('/api', router);

}