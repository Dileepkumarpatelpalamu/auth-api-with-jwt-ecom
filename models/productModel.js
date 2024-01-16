import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema(
   {
      category_name: {
         type: String,
         required: true,
         trim: true,
      },
      category_description: {
         type: String,
         trim: true,
      },
      created_on: {
         type: Date,
         default: Date.now,
      },
      modified_on: {
         type: Date,
         default: Date.now,
      },
   },
   {
      timestamps: true,
   }
);
const Category = mongoose.model('Category', categorySchema);

const productSchema = new mongoose.Schema(
    {
       product_name: {
          type: String,
          required: true,
          trim: true,
       },
       product_description: {
          type: String,
          required: true,
          trim: true,
       },
       price: {
          type: Number,
          required: true,
       },
       category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
          required: true,
       },
       image: {
          type: String,
       },
       created_on: {
          type: Date,
          default: Date.now,
       },
       modified_on: {
          type: Date,
          default: Date.now,
       },
    },
    {
       timestamps: true,
    }
 );
 
 const Product = mongoose.model('Product', productSchema);
export {Category,Product};

