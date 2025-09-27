const User = require('../models/user')
const { UnauthenticatedError } = require('../errors/index')

const register = async (req, res) => {
    let newUser = {}
    try {
        newUser = await User.create({...req.body})
    } catch (error) {
        console.log(error)
        throw new UnauthenticatedError("Please provide all the details")
    }
}

const login = async(req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw error(error, "Please provide both password and email")
    }
    const existingUser = await User.findOne({ email }).select("+password")
    if(!existingUser){
        throw new UnauthenticatedError("Invalid Credentials")
    }
    const isPasswordCorrect = await existingUser.comparePasswords(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Incorrect Password")
    }
    
}


module.exports = {
    register, 
    login
} 