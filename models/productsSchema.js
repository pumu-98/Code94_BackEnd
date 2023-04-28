const mongoose= require("mongoose");
const productsSchema = new mongoose.Schema({
    sku:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    productname:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    des:{
        type:String,
        required:true
    }
});
const products=new mongoose.model("products",productsSchema);
module.exports=products;