export const DELETE_NOTE_MUTATION = gql`
  mutation DeleteNoteMutation($id: Int!) {
    deleteNote(id: $id) {
      id
    }
  }
`

export const CREATE_NOTE_MUTATION = gql`
  mutation createNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      content
      bookId
    }
  }
`

export const UPDATE_NOTE_MUTATION = gql`
  mutation UpdateNoteMutation($id: Int!, $input: UpdateNoteInput!) {
    updateNote(id: $id, input: $input) {
      content
      id
    }
  }
`

export const DELETE_BOOK_MUTATION = gql`
  mutation DeleteNoteMutation($id: Int!) {
    deleteNote(id: $id) {
      id
    }
  }
`
