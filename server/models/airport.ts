import * as mongoose from 'mongoose';

const airportSchema = new mongoose.Schema({
  code: { type: String, unique: true, uppercase: true, trim: true },
  lat: Number,
  lon: Number,
  name: { type: String, unique: true, uppercase: true, trim: true },
  city: { type: String, uppercase: true, trim: true },
  state: { type: String, uppercase: true, trim: true },
  country: { type: String, uppercase: true, trim: true },
  woeid: Number,
  tz: { type: String, uppercase: true, trim: true },
  phone: String,
  url: String,
  icao: { type: String, unique:true, uppercase: true, trim: true }
});

const Airport = mongoose.model('Airport', airportSchema);

export default Airport;