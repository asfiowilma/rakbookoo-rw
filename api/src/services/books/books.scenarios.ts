import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.BookCreateArgs>({
  book: {
    one: {
      data: {
        title: 'String',
        rating: 7925890,
        Shelf: {
          create: {
            name: 'String',
            User: { create: { uid: 'String4042439' } },
          },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        rating: 3539837,
        Shelf: {
          create: {
            name: 'String',
            User: { create: { uid: 'String3480209' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
