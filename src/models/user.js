import mongoose from 'mongoose'
import { hash } from 'bcryptjs'

const { Schema } = mongoose

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function() {
  // NOTE: Must be a normal (not arrow) function because of 'this'!
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
})

export default mongoose.model('User', userSchema)
