import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';


dotenv.config();


const mongoURI: string = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';


mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);


const db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});


export default db;
