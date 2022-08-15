const productModel = require('../Models/ProductModel')
const { uploadFile } = require('../Controllers/awsUpload')
const{isValid,isValidRequestBody,isValidObjectId,isValidScripts,validString,validQuantity} = require("../Validation/validation")





const createProduct = async (req, res) => {
    try {
        let userId = req.params.userId;
        const requestBody = req.body;
        //========================================== validations for inputs===============================================
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid params received in request body' })
        }
        
const { name,pricePerUnit,currencyId,quantity} = requestBody;

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
           totalPrice: pricePerUnit * quantity
            
        }

        //======================================================= creating new product data ==============================

        const saveProductDetails = await productModel.create(newProductData)
        res.status(201).send({ status: true, message: "Product Successfully Created", data: saveProductDetails })

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: error.message });
    }
}

module.exports= {createProduct}