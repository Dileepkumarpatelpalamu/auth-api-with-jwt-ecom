import mongoose from 'mongoose';
/*
const options = {
  'user':'',
  'pass':'',
  'dbName':'',
  'authSource':''
};
*/
const options ={}
// Connect to MongoDB
const connectiondb= async(mongoURI) =>{
     await mongoose.connect(mongoURI, options)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
});
}
export default connectiondb;