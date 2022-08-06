export const schema = gql`
  type User {
    uid: String!
    name: String
    shelf: [Shelf]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    uid: String!
    name: String
  }

  input UpdateUserInput {
    uid: String
    name: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
