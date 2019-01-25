import { gql } from 'apollo-server-express'

export default gql`
  type Chat {
    id: ID!
    name: String
    users: [User!]!
    messages: [Message!]!
  }
`
