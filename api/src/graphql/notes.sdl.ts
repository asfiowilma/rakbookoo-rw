export const schema = gql`
  type Note {
    id: Int!
    createdAt: DateTime!
    content: String!
    Book: Book
    bookId: Int
  }

  type Query {
    notes: [Note!]! @requireAuth
    note(id: Int!): Note @requireAuth
  }

  input CreateNoteInput {
    content: String!
    bookId: Int
  }

  input UpdateNoteInput {
    content: String
    bookId: Int
  }

  type Mutation {
    createNote(input: CreateNoteInput!): Note! @requireAuth
    updateNote(id: Int!, input: UpdateNoteInput!): Note! @requireAuth
    deleteNote(id: Int!): Note! @requireAuth
  }
`
