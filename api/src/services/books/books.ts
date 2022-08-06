import type {
  QueryResolvers,
  MutationResolvers,
  BookResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const books: QueryResolvers['books'] = () => {
  return db.book.findMany()
}

export const book: QueryResolvers['book'] = ({ id }) => {
  return db.book.findUnique({
    where: { id },
  })
}

export const createBook: MutationResolvers['createBook'] = ({ input }) => {
  return db.book.create({
    data: input,
  })
}

export const updateBook: MutationResolvers['updateBook'] = ({ id, input }) => {
  return db.book.update({
    data: input,
    where: { id },
  })
}

export const deleteBook: MutationResolvers['deleteBook'] = ({ id }) => {
  return db.book.delete({
    where: { id },
  })
}

export const Book: BookResolvers = {
  author: (_obj, { root }) =>
    db.book.findUnique({ where: { id: root.id } }).author(),
  tags: (_obj, { root }) =>
    db.book.findUnique({ where: { id: root.id } }).tags(),
  notes: (_obj, { root }) =>
    db.book.findUnique({ where: { id: root.id } }).notes(),
  Shelf: (_obj, { root }) =>
    db.book.findUnique({ where: { id: root.id } }).Shelf(),
}
