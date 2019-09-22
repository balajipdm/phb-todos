import mongoose from 'mongoose';
import config from 'config';

const connectDB = async () => {
  try {
    const db = config.get('mongoURI');
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;