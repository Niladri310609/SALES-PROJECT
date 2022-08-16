const productModel = require('../Models/ProductModel')

const { uploadFile } = require('../Controllers/awsUpload')

const{isValid,isValidRequestBody,isValidObjectId,isValidScripts,validString,validQuantity,isValidDate} = require("../Validation/validation")





const createProduct = async (req, res) => {
    try {
        let userId = req.params.userId;
        const requestBody = req.body;
        //========================================== validations for inputs===============================================
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid params received in request body' })
        }
        
const { name,pricePerUnit,currencyId,quantity, revenueDate} = requestBody;

//=================================== validation for UserId===================
if (!isValidObjectId(userId)) {
    return res.status(400).send({ status: false, message: "Please provide valid User Id" });
}

        //========================================== validations for name ================================================ 

        if (name == "") {
            return res.status(400).send({ status: false, message: "name  cannot be empty" })
        } else if (name) {
            if (!validString(name) || !isValidScripts(name))
                return res.status(400).send({ status: false, message: "name is invalid (Should Contain Alphabets, numbers, quotation marks  & [@ , . ; : ? & ! _ - $]." })
            const isnameAlreadyUsed = await productModel.findOne({ name });

            if (isnameAlreadyUsed) {
                return res.status(400).send({ status: false, message: 'name is already used.' })
            }
        }
        


        //========================================== validations for Price ================================================ 
        if (!validString(pricePerUnit)) {
            return res.status(400).send({ status: false, message: 'pricePerUnit is required' })
        }

        if (!(!isNaN(Number(pricePerUnit)))) {
            return res.status(400).send({ status: false, message: `pricePerUnit should be a valid number` })
        }
        if (pricePerUnit <= 0) {
            return res.status(400).send({ status: false, message: `pricePerUnit cannot be Zero` })
        }
        //========================================== validations for currencyId ================================================ 
        if (!validString(currencyId)) {
            return res.status(400).send({ status: false, message: 'CurrencyId is required' })
        }

        if (!(currencyId == "INR")) {
            return res.status(400).send({ status: false, message: 'currencyId should be INR' })
        }


    //============================== Validations for quantity ===============
    if(!quantity) {quantity=1}
         
         
          else if(quantity){
        if (!isValid(quantity) || !validQuantity(quantity)) {
            return res.status(400).send({ status: false, message: "Please provide valid quantity & it must be greater than zero." });
        }
    }

    //===============validations for revenueDate===================

     if(!isValid( revenueDate)){
         return res.status(400).send({status:false, message: "revenueDate is required"})
     }
      if(!isValidDate(revenueDate)){
         return res.status(400).send({status:false, messsage: "revenueDate should be in valid format"})
      }
        
      
        //========================================== validations for file upload ================================================ 
        let productImage = req.files;
        if (!(productImage && productImage.length > 0)) {
            return res.status(400).send({ status: false, msg: "product image is required" });
        }

        let productImageUrl = await uploadFile(productImage[0]);



        //==========================================  structuring the data ================================================ 

        const newProductData = { 
            name,
            productImage: productImageUrl,
            pricePerUnit,
            currencyId,
            quantity,
           totalPrice: Math.floor(pricePerUnit * quantity),
           revenueDate
            
        }

        //======================================================= creating new product data ==============================

        const saveProductDetails = await productModel.create(newProductData)
        res.status(201).send({ status: true, message: "Product Successfully Created", data: saveProductDetails })

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: error.message });
    }
}

//===================================== getTopsellingProducts================================

 const getProduct = async function(req,res){
  try {
     let userId = req.params.userId 
     if(!isValidObjectId(userId)){
         return res.status(404).send({status: false , message: "User Id is Not Valid"})
     }
 
      
  let getTopsellingProducts =  await productModel.find().select({_id: 0, name:1, productImage:1, quantity : 1}).sort({"quantity": -1}).limit(5);

   //console.log(getTopsellingProducts)
    res.status(200).send({ status: true, message: "Top 5 best selling Products list",data:getTopsellingProducts })
 }
 catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: error.message });
}
 }


 //====================revenueList By date===========================

  const getRevenueByDate = async  function(req,res){
     try{
         let userId = req.params.userId
         let data = req.query
         let revenueDate = req.query.revenueDate;
         let filter = {}

          if(Object.keys(data).length ==0)
          return res.status(400).send({status:false, message: "please fill the required field to fetch the data"})

        const value = [revenueDate]
        const valueString = ["revenueDate"]

        for (let i = 0; i < value.length; i++) {
            let key = `${value[i]}`                         
            if (key == '') {
                return res.status(400).send({ status: false, message: `${valueString[i]} can not be empty` })
            }
        }

         if(!isValidObjectId(userId)){
             return res.status(400).send({status: false,message: "Invalid UserId"})
         }
         
        //validation for revenueDate===========

         if(!isValid(revenueDate)){
         
         return res.status(400).send({ status: false, message: "revenue date is required"})
         }
         if(!isValidDate(revenueDate)){
            return res.status(400).send({ status: false, message: "revenue date should be in Valid format"}) 
        } 
         filter["revenueDate"] = revenueDate

        const findRevenue = await productModel.find(filter).select({name:1,pricePerUnit:1,quantity:1,totalPrice:1, revenueDate:1})
         //console.log(findRevenue ,filter)
          if(findRevenue.length ==0){
             return res.status(404).send({ status: false, message: "No such Data found for this date "})
          } 
         res.status(200).send({status:true, message: "Revenue Details Found" , data:findRevenue})
     }
     catch(error){
         console.log(error);
        return res.status(500).send({status:false, message:error.message})
     }
  }

module.exports= {createProduct, getProduct ,getRevenueByDate}