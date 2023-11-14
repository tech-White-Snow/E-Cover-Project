import mongoose  from 'mongoose'
import config    from 'config'
import MockupData from '../models/MockupData.js';
import Mockups from './mockups.js';

const db = config.get('mongoURI')

const connectDB = async () => {

  try {

    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    console.log('MongoDB connected')

    await MockupData.deleteMany({});
    await MockupData.create(Mockups);
  
  } catch (err) {

    console.error(err.message)
    process.exit(1)
  }
}

// module.exports = connectDB

export default connectDB