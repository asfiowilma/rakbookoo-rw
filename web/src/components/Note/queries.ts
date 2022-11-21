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
      bookId
    }
  }
`
