/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://admin:secret@127.0.0.1:27017/ecomm?authSource=admin');
const db = mongoose.connection;

export default db;
