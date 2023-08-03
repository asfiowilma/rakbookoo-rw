import { requireAuth } from 'src/lib/auth'
import type {
  QueryResolvers,
  MutationResolvers,
  BookResolvers,
} from 'types/graphql'

import { validateWith } from '@redwoodjs/api'

import { db } from 'src/lib/db'

export const books: QueryResolvers['books'] = () => {
  requireAuth()
  console.log(context.currentUser)

  return db.book.findMany({
    take: 24,
    where: {
      Shelf: {
        userUid: { equals: context.currentUser.sub as string },
      },
    },
    orderBy: [{ title: 'asc' }],
  })
}

export const book: QueryResolvers['book'] = ({ id }) => {
  return db.book.findUnique({
    where: { id },
  })
}

export const createBook: MutationResolvers['createBook'] = ({ input }) => {
  /* TODO: add validations
  - one book can only have max 12 tags
  - one book can only have max 12 authors
  - https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
  */
  validateWith(() => {
    if (input.authors.length > 12)
      throw 'This book has too many authors. Please enter no more than 12 authors'
  })
  validateWith(() => {
    if (input.tags.length > 12)
      throw 'This book has too many tags. Please enter no more than 12 tags'
  })

  const authors = {
    connect: input.authors.filter((a) => a.id).map((a) => ({ id: a.id })),
    create: input.authors.filter((a) => !a.id).map((a) => ({ name: a.name })),
  }

  const tags = {
    connect: input.tags.filter((t) => t.id).map((t) => ({ id: t.id })),
    create: input.tags.filter((t) => !t.id).map((t) => ({ name: t.name })),
  }

  const data = { ...input, authors, tags }
  return db.book.create({ data })
}

export const updateBook: MutationResolvers['updateBook'] = ({ id, input }) => {
  /* TODO: add validations
  - one book can only have max 12 tags
  - one book can only have max 12 authors */

  validateWith(() => {
    if (input.authors.length > 12)
      throw 'This book has too many authors. Please enter no more than 12 authors'
  })
  validateWith(() => {
    if (input.tags.length > 12)
      throw 'This book has too many tags. Please enter no more than 12 tags'
  })

  const authors = {
    connect: input.authors.filter((a) => a.id).map((a) => ({ id: a.id })),
    create: input.authors.filter((a) => !a.id).map((a) => ({ name: a.name })),
  }

  const tags = {
    connect: input.tags.filter((t) => t.id).map((t) => ({ id: t.id })),
    create: input.tags.filter((t) => !t.id).map((t) => ({ name: t.name })),
  }

  const data = { ...input, authors, tags }
  return db.book.update({ data, where: { id } })
}

export const deleteBook: MutationResolvers['deleteBook'] = ({ id }) => {
  return db.book.delete({
    where: { id },
  })
}

export const Book: BookResolvers = {
  authors: (_obj, { root }) =>
    db.book.findUnique({ where: { id: root.id } }).authors(),
  tags: (_obj, { root }) =>
    db.book.findUnique({ where: { id: root.id } }).tags(),
  notes: (_obj, { root }) =>
    db.book.findUnique({ where: { id: root.id } }).notes(),
  Shelf: (_obj, { root }) =>
    db.book.findUnique({ where: { id: root.id } }).Shelf(),
}
