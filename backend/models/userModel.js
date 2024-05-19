import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    lastName: {
      type: String,
    },

    country: {
      type: String,
    },

    city: {
      type: String,
    },

    phone: {
      type: String,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    image: { type: String, default: 'default-user.jpg' },

    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },

    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },

    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],

      validate: {
        // This only works on Create and Save
        validator: function (el) {
          return el === this.password;
        },

        message: 'Passwords are not same!',
      },
    },
  },
  { timestamps: true }
);

//////////////////////////////////

userSchema.pre('save', async function (next) {
  // This === current doc
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

//////////////////////////////////
// Methods

userSchema.methods.matchPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

//////////////////////////////////

const User = mongoose.model('User', userSchema);

export default User;
