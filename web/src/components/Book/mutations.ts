export const DELETE_BOOK_MUTATION = gql`
  mutation DeleteBookMutation($id: Int!) {
    deleteBook(id: $id) {
      id
    }
  }
`

export const CREATE_BOOK_MUTATION = gql`
  mutation CreateBookMutation($input: CreateBookInput!) {
    createBook(input: $input) {
      id
    }
  }
`

export const UPDATE_BOOK_MUTATION = gql`
  mutation UpdateBookMutation($id: Int!, $input: UpdateBookInput!) {
    updateBook(id: $id, input: $input) {
      id
      isbn
      title
      coverImage
      blurb
      rating
      shelfId
    }
  }
`
