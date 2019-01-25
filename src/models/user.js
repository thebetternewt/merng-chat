import mongoose from 'mongoose'
import { hash } from 'bcryptjs'

const { Schema } = mongoose

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: email => User.doesntExist({ email }),
        message: 'Email already taken!'
      }
    },
    name: String,
    username: {
      type: String,
      validate: {
        validator: username => User.doesntExist({ username }),
        message: 'Username already taken!'
      }
    },
    password: String,
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function () {
  // NOTE: Must be a normal (not arrow) function because of 'this'!
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
})

userSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const User = mongoose.model('User', userSchema)

export default User
