export const schema = gql`
  type Shelf {
    id: Int!
    name: String!
    books(limit: Int): [Book]!
    User: User
    userUid: String
  }

  type Query {
    shelves: [Shelf!]! @requireAuth
    shelf(id: Int!): Shelf! @requireAuth
  }

  input CreateShelfInput {
    name: String!
    userUid: String
  }

  input UpdateShelfInput {
    name: String
    userUid: String
  }

  type Mutation {
    createShelf(input: CreateShelfInput!): Shelf! @requireAuth
    updateShelf(id: Int!, input: UpdateShelfInput!): Shelf! @requireAuth
    deleteShelf(id: Int!): Shelf! @requireAuth
  }
`
