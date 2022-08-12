export const schema = gql`
  type Tag {
    id: Int!
    name: String!
    Book: [Book]!
  }

  type Query {
    tags: [Tag!]! @skipAuth
    tag(id: Int!): Tag @skipAuth
  }

  input CreateTagInput {
    name: String!
  }

  input UpdateTagInput {
    name: String
  }

  type Mutation {
    createTag(input: CreateTagInput!): Tag! @requireAuth
  }
`
