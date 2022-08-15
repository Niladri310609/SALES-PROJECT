const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
//const { uploadFile } = require('../controllers/awsUpload')
const jwt = require('jsonwebtoken');
const { isValid, isValidRequestBody,isValidName, isValidEmail, isValidPhone,isValidPassword } = require('../Validation/validation')



const createUser = async function (req, res) {
    try {

        let data = req.body
        
      

        // ====================================== Destructuring the request Body ======================================


        let { fname, lname, phone, email, password} = data

        //============================================validations for inputs================================

        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Input Data for Creating User" })
        }

        
        
        if (!isValid(fname)) {
            return res.status(400).send({ status: false, message: "fname is required..." })
        }
        if (!isValidName(fname)) return res.status(400).send({ status: false, msg: "Please Enter a valid First Name" })

        if (!isValid(lname)) {
            return res.status(400).send({ status: false, message: "lname is required..." })
        }
        if (!isValidName(lname)) return res.status(400).send({ status: false, msg: "Please Enter a valid last Name" })

        if (!(phone)) {
            return res.status(400).send({ status: false, message: "Phone No. is required" })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Email is required" })
        }


        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Password is required" })
        }
         if(!isValidPassword(password)){
             return res.status(400).send({status:false , messsage: "password is invalid (Should Contain Alphabets, numbers, quotation marks  & [@ , . ; : ? & ! _ - $], and the length should be between 8 to 15"})
         }


        //============================================= Validations for email and password ===============================
         if(phone =="") return res.status(400).send({status:false , message : "Phone Number cannot be empty"})
        
        if(phone){
        if (!isValidPhone(phone)) {
            return res.status(400).send({ status: false, message: "please enter a valid Phone no" });
        }
    }

        const isRegisteredphone = await userModel.findOne({ phone }).lean();    //returns a js object instead of mongoose Object..

        if (isRegisteredphone) {
            return res.status(400).send({ status: false, message: "phoneNo number already registered" });
        }

        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Please enter a valid Email" });
        }

        const isRegisteredEmail = await userModel.findOne({ email }).lean();
        if (isRegisteredEmail) {
            return res.status(400).send({ status: false, message: "email id already registered" });
        }

        if (password=="" || password.toString().trim().length < 8) {
            return res.status(400).send({ status: false, message: "Your password must be at least 8 characters" })
        }

        if (password.toString().trim().length > 15) {
            return res.status(400).send({ status: false, message: "Password cannot be more than 15 characters" })
        }

        const bcryptPassword = await bcrypt.hash(password, 6)
        data.password = bcryptPassword

        const userCreated = await userModel.create(data)

        res.status(201).send({ status: true, message: "Success", data: userCreated })

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, error: err.message });
    }
}

//==========================================================Login api =======================================

const loginUser = async (req, res) => {

    try {                                                            //password = Niladri@3199
        let requestBody = req.body;

        // structuring Body

        const { email, password } = requestBody;

        // Validation starts

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "Please enter login credentials" });
        }

        if (!isValid(email)) {
            res.status(400).send({ status: false, msg: "Enter an email" });
            return;
        }

        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, message: `Email should be a valid email address` });
        }

        if (!isValid(password)) {
            res.status(400).send({ status: false, msg: "enter a password" });
            return;
        }

        if (!(password.length >= 8 && password.length <= 15)) {
            return res.status(400).send({ status: false, message: "Password should be Valid min 8 and max 15 " })
        }
        // ===============================================Encrypting the password && create Token=============================

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({ status: false, message: `Invalid login credentials, email id doesn't exist` });
        }

        let hashedPassword = user.password

        const checkPassword = await bcrypt.compare(password, hashedPassword)

        if (!checkPassword) return res.status(401).send({ status: false, message: `Invalid login credentials , Invalid password` });

        const token = jwt.sign({
            userId: user._id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 168 * 60 * 60
        }, 'Hercules')


      

        res.status(200).send({ status: true, messsge: "User Login Successful", data: { userId: user._id, token: token } });
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: error.message });
    }
}

module.exports = {createUser,loginUser}