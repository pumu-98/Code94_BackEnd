const express=require("express");
const router = express.Router();
const products=require("../models/productsSchema");


//send data post method
router.post("/addProd",async(req,res)=>{
    const {sku,image,productname,price,des}=req.body;

    if(!sku || !image || !productname || !price || !des){
        res.status(422).json("Please fillup the Data")
    }

    try{
        const preprod=await products.findOne({price:price});

        if(preprod){
            res.status(422).json("Already added")

        }else{
            const addproduct =new products ({sku,image,productname,price,des});
            await addproduct.save();
            res.status(201).json(addproduct)
        }
    }catch(err){
        res.status(422).json(err)
    }
});

//get product Data
router.get("/getprod", async(req,res)=>{
    try{
        const proddata= await products.find();
        res.status(201).json(proddata);
    }catch(err){
        res.status(422).json(err)
    }
})

//get single product Data
router.get("/getprod/:id", async(req,res)=>{
    try{
       const {id}=req.params;
       const singleprod=await products.findById({_id:id});
       res.status(201).json(singleprod);
    }catch(err){
        res.status(422).json(err);
    }
})


//Delete product Data
router.delete("/deleteprod/:id", async(req,res)=>{
    try{
       const {id} = req.params;
       const deltprod=await products.findByIdAndDelete({_id:id});
       res.status(201).json(deltprod);
    }catch(err){
        res.status(422).json(err);
    }
})

// update product data
router.patch("/updateprod/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateprod = await products.findByIdAndUpdate(id,req.body,{
            new:true
        });

        res.status(201).json(updateprod);

    } catch (error) {
        res.status(422).json(error);
    }
})
module.exports=router;