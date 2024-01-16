import { Category, Product } from "../models/productModel.js";
import {
  categorySchema,
  productSchema,
} from "../validatiors/productCategoryValidator.js";
import CustomErrorHandler from "../services/customErrorHandler.js";
class ProductCateogry {
  static async addCategory(req, res, next) {
    const { error } = categorySchema.validate(req.body);
    if (error) return next(error);
    try {
      let catExist = await Category.findOne({
        category_name: req.body.category_name,
      });
      if (catExist)
        return next(
          CustomErrorHandler.alreadyExits("Product category already exists!")
        );
        const categoryObj = new Category(req.body);
        const categoryRes = await categoryObj.save();
        res.status(201).send({message:"Category added successfully.",data:{_id:categoryRes._id,category_name:categoryRes.category_name,category_description:categoryRes.category_description}}).json();
    } catch (err) {
      return next(err);
    }
  }
  static async categoryList(req, res, next) {
    try {
      let cateogryList = await Category.find().select('_id category_name category_description');
      if (cateogryList)
        return res.status(200).send({message:"Category List.",data:cateogryList}).json();
    else{
        return next(CustomErrorHandler.userNotExits("Category not found..!"));
    }
    } catch (err) {
      return next(err);
    }
  }
  static async categoryDetail(req, res, next) {
    try {
      let categoryDetail = await Category.findById(req.params.ID).select('_id category_name category_description created_on modified_on');
      if (categoryDetail)
        return res.status(200).send({message:"Category details",data:categoryDetail}).json();
    else{
        return next(CustomErrorHandler.userNotExits("Invalid category Id..!"));
    }
    } catch (err) {
      return next(err);
    }
  }
  static async categoryUpdate(req, res, next) {
    try {
        console.log(req.body);
        const ID = req.params.ID;
        const { error } = categorySchema.validate(req.body);
        if (error) return next(error);
      let categoryDetail = await Category.findOneAndUpdate({_id:ID},req.body,{new:true}).select('_id category_name category_description created_on modified_on');
      if (categoryDetail)
        return res.status(200).send({message:"Category details",data:categoryDetail}).json();
    else{
        return next(CustomErrorHandler.userNotExits("Invalid category Id..!"));
    }
    } catch (err) {
      return next(err);
    }
  }
  static async categoryDelete(req, res, next) {
    try {
      let categoryDetail = await Category.findOneAndDelete({_id:req.params.ID});
      if (categoryDetail)
        return res.status(200).send({message:"Deleted category details",data:{_id:categoryDetail._id,category_name:categoryDetail.category_name}}).json();
    else{
        return next(CustomErrorHandler.userNotExits("Invalid category Id ..!"));
    }
    } catch (err) {
      return next(err);
    }
  }
  static async addProduct(req, res, next) {
    const { error } = productSchema.validate(req.body);
    if (error) return next(error);
    try {
      let proExist = await Product.findOne({
        product_name: req.body.product_name,
      });
      if (proExist)
        return next(
          CustomErrorHandler.alreadyExits("Product name already exists!")
        );
        req.body.image =  `${req.protocol}://${req.get('host')}/${req.file.path}`
        const productObj = new Product(req.body);
        const productRes = await productObj.save();
        res.status(201).send({message:"Procuct added successfully.",data:{_id:productRes._id,product_name:productRes.product_name,product_description:productRes.product_description,price:productRes.price,image:productRes.image}}).json();
    } catch (err) {
      return next(err);
    }
  }
  static async productList(req, res, next) {
    try {
      const limitOption = req.query.limit || 10;
      const offsetOption = req.query.offset || 0;
      const filterOption = {};
      const sortOption = {category_name:req.query.sortby === 'desc' ? -1 : 1 };
      let cateogryList = await Product.find(filterOption).select('_id product_name product_description price category image').populate({path:"category",select:"_id category_name category_description"}).sort(sortOption).skip(offsetOption).limit(limitOption);
      if (cateogryList)
        return res.status(200).send({message:"Product List.",data:cateogryList}).json();
    else{
        return next(CustomErrorHandler.userNotExits("Products not found..!"));
    }
    } catch (err) {
      return next(err);
    }
  }
  static async productDetails(req, res, next) {
    try {
      let cateogryList = await Product.findById(req.params.ID).select('_id product_name product_description price category image').populate({path:"category",select:"_id category_name category_description"});
      if (cateogryList)
        return res.status(200).send({message:"Product Details.",data:cateogryList}).json();
    else{
        return next(CustomErrorHandler.userNotExits("Product id not found..!"));
    }
    } catch (err) {
      return next(err);
    }
  }
  static async productDetailsByCategry(req, res, next) {
    try {
      const limitOption = req.query.limit || 10;
      const offsetOption = req.query.offset || 0;
      const filterOption = {category:req.params.ID};
      const sortOption = {category_name:req.query.sortby === 'desc' ? -1 : 1 };
      let cateogryList = await Product.find(filterOption).select('_id product_name product_description price category image').populate({path:"category",select:"_id category_name category_description"}).sort(sortOption).skip(offsetOption).limit(limitOption);
      if (cateogryList)
        return res.status(200).send({message:"Product details by cateogry .",data:cateogryList}).json();
    else{
        return next(CustomErrorHandler.userNotExits("Category id not found..!"));
    }
    } catch (err) {
      return next(err);
    }
  }
  static async productDetailsByPrice(req, res, next) {
    try {
      const limitOption = req.query.limit || 10;
      const offsetOption = req.query.offset || 0;
      const filterOption = {price:{$gte:req.query.minPrice || 0,$lte:req.query.maxPrice || 10000}};
      const sortOption = {price:req.query.sortby === 'desc' ? -1 : 1 };
      let cateogryList = await Product.find(filterOption).select('_id product_name product_description price category image').populate({path:"category",select:"_id category_name category_description"}).sort(sortOption).skip(offsetOption).limit(limitOption);
      if (cateogryList)
        return res.status(200).send({message:"Product details by price .",data:cateogryList}).json();
    else{
        return next(CustomErrorHandler.userNotExits("Category id not found..!"));
    }
    } catch (err) {
      return next(err);
    }
  }
  static async productDelete(req, res, next) {
    try {
      let productDetail = await Product.findOneAndDelete({_id:req.params.ID});
      if (productDetail)
        return res.status(200).send({message:"Deleted product details",data:{_id:productDetail._id,product_name:productDetail.product_name}}).json();
    else{
        return next(CustomErrorHandler.userNotExits("Invalid product id ..!"));
    }
    } catch (err) {
      return next(err);
    }
  }
  static async productUpdate(req, res, next) {
    try {
        const ID = req.params.ID;
        console.log(ID);
        const { error } = productSchema.validate(req.body);
        if (error) return next(error);
        req.body.image =  `${req.protocol}://${req.get('host')}/${req.file.path}`
      let categoryDetail = await Product.findOneAndUpdate({_id:ID},req.body,{new:true}).select('_id product_name product_description price image category created_on modified_on').populate({path:"category",select:"_id category_name category_description"});
      if (categoryDetail)
        return res.status(200).send({message:"Product updated details",data:categoryDetail}).json();
    else{
        return next(CustomErrorHandler.userNotExits("Invalid product Id..!"));
    }
    } catch (err) {
      return next(err);
    }
  }
  static async productImageUploadById(req, res, next) {
    try {
        const ID = req.params.ID;
        req.body.image =  `${req.protocol}://${req.get('host')}/${req.file.path}`
      let categoryDetail = await Product.findOneAndUpdate({_id:ID},req.body,{new:true}).select('_id product_name product_description price image category created_on modified_on').populate({path:"category",select:"_id category_name category_description"});
      if (categoryDetail)
        return res.status(200).send({message:"Product image uploaded successfully",data:categoryDetail}).json();
    else{
        return next(CustomErrorHandler.userNotExits("Invalid product Id..!"));
    }
    } catch (err) {
      return next(err);
    }
  }
}
export default ProductCateogry;
