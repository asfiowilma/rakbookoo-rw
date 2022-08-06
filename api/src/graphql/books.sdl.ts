export const schema = gql`
  type Book {
    id: Int!
    isbn: String
    title: String!
    author: [Author]!
    coverImage: String
    tags: [Tag]!
    blurb: String
    rating: Int!
    notes: [Note]!
    Shelf: Shelf!
    shelfId: Int!
  }

  type Query {
    books: [Book!]! @requireAuth
    book(id: Int!): Book @requireAuth
  }

  input CreateBookInput {
    isbn: String
    title: String!
    coverImage: String
    blurb: String
    rating: Int!
    shelfId: Int!
  }

  input UpdateBookInput {
    isbn: String
    title: String
    coverImage: String
    blurb: String
    rating: Int
    shelfId: Int
  }

  type Mutation {
    createBook(input: CreateBookInput!): Book! @requireAuth
    updateBook(id: Int!, input: UpdateBookInput!): Book! @requireAuth
    deleteBook(id: Int!): Book! @requireAuth
  }
`
