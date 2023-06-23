/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';

mongoose.connect(`mongodb://admin:secret@${process.env.MONGO_SERVER || '127.0.0.1'}:27017/ecomm?authSource=admin`);
const db = mongoose.connection;

export default db;
