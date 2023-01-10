import type {
  QueryResolvers,
  MutationResolvers,
  ShelfResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const shelves: QueryResolvers['shelves'] = () => {
  return db.shelf.findMany({
    where: { userUid: context.currentUser.sub },
    orderBy: { id: 'asc' },
  })
}

export const shelf: QueryResolvers['shelf'] = ({ id }) => {
  return db.shelf.findUnique({
    where: { id },
  })
}

export const createShelf: MutationResolvers['createShelf'] = ({ input }) => {
  return db.shelf.create({
    data: input,
  })
}

export const updateShelf: MutationResolvers['updateShelf'] = ({
  id,
  input,
}) => {
  return db.shelf.update({
    data: input,
    where: { id },
  })
}

export const deleteShelf: MutationResolvers['deleteShelf'] = ({ id }) => {
  return db.shelf.delete({
    where: { id },
  })
}

export const Shelf: ShelfResolvers = {
  books: (_obj, { root }) =>
    db.shelf.findUnique({ where: { id: root.id } }).books({ take: _obj.limit }),
  User: (_obj, { root }) =>
    db.shelf.findUnique({ where: { id: root.id } }).User(),
}
