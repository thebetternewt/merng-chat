import Joi from 'joi'
import mongoose from 'mongoose'
import { User } from '../models'
import { UserInputError } from 'apollo-server-express'
import { signUp } from '../validation';

export default {
  Query: {
    users: async (root, args, context, info) => {
      checkSignedIn()

      return User.find({})
    },
    user: async (root, { id }, context, info) => {
      checkSignedIn()

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError('User not found.')
      }

      return User.findById(id)
    },
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      checkSignedOut()

      await Joi.validate(args, signUp, { abortEarly: false })

      return User.create(args)
    },
  },
}
