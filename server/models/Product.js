import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  brand: String,
  category: String,
  price: Number,
  // ...other fields as needed
});

export default mongoose.model('Product', productSchema);

