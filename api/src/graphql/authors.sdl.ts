export const schema = gql`
  type Author {
    id: Int!
    name: String!
    Book: [Book]!
  }

  type Query {
    authors: [Author!]! @skipAuth
    author(id: Int!): Author @skipAuth
  }

  input CreateAuthorInput {
    name: String!
  }

  input UpdateAuthorInput {
    name: String
  }

  type Mutation {
    createAuthor(input: CreateAuthorInput!): Author! @requireAuth
  }
`
