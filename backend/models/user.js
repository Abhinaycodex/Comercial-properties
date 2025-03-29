import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";


const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true, // Ensures `user_name` is unique
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Ensures emails are unique
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    validate: {
      validator: function (v) {
        return /[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v);
      },
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit",
    },
  },
});

//jwt wala part

userSchema.methods.generateToken = await function ( ){
  try {
    return jwt.sign({
       user_id: this._id.toString(),
       email:this.email.toString(),
       user_name:this.user_name.toString(),
     }, 
     process.env.JWT_SECRET_KEY,
     {
      expiresIn:"30s",
     }
    )

    
  } catch (error) {
    console.errror("Error generating token");
  }
};


//hash func use kra with <pre>
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});


const User = mongoose.model("User", userSchema);

export default User;
