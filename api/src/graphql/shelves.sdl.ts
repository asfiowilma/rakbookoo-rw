export const schema = gql`
  type Shelf {
    id: Int!
    name: String!
    books: [Book]!
    User: User
    userUid: String
  }

  type Query {
    shelves(userUid: String!): [Shelf!]! @skipAuth
    shelf(id: Int!): Shelf @skipAuth
    shelfByUserUid(userUid: String!): Shelf @skipAuth
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
