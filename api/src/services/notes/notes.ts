import type {
  QueryResolvers,
  MutationResolvers,
  NoteResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const notes: QueryResolvers['notes'] = () => {
  return db.note.findMany()
}

export const note: QueryResolvers['note'] = ({ id }) => {
  return db.note.findUnique({
    where: { id },
  })
}

export const createNote: MutationResolvers['createNote'] = ({ input }) => {
  return db.note.create({
    data: input,
  })
}

export const updateNote: MutationResolvers['updateNote'] = ({ id, input }) => {
  return db.note.update({
    data: input,
    where: { id },
  })
}

export const deleteNote: MutationResolvers['deleteNote'] = ({ id }) => {
  return db.note.delete({
    where: { id },
  })
}

export const Note: NoteResolvers = {
  Book: (_obj, { root }) =>
    db.note.findUnique({ where: { id: root.id } }).Book(),
}
