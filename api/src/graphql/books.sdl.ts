export const schema = gql`
  type Book {
    id: Int!
    isbn: String
    title: String!
    authors: [Author]!
    coverImage: String
    tags: [Tag]!
    blurb: String
    rating: Int!
    notes: [Note]!
    Shelf: Shelf!
    shelfId: Int!
  }

  type Query {
    books(limit: Int = 10, offset: Int = 0): [Book!]! @requireAuth
    book(id: Int!): Book! @requireAuth
  }

  input CreateBookInput {
    isbn: String
    title: String!
    coverImage: String
    blurb: String
    rating: Int!
    shelfId: Int!
    authors: [BaseItemInput]
    tags: [BaseItemInput]
  }

  input UpdateBookInput {
    isbn: String
    title: String
    coverImage: String
    blurb: String
    rating: Int
    shelfId: Int
    authors: [BaseItemInput]
    tags: [BaseItemInput]
  }

  input BaseItemInput {
    id: Int
    name: String!
  }

  type Mutation {
    createBook(input: CreateBookInput!): Book! @requireAuth
    updateBook(id: Int!, input: UpdateBookInput!): Book! @requireAuth
    deleteBook(id: Int!): Book! @requireAuth
  }
`
