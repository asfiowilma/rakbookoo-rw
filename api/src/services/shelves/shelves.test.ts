import {
  shelves,
  shelf,
  createShelf,
  updateShelf,
  deleteShelf,
} from './shelves'
import type { StandardScenario } from './shelves.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('shelves', () => {
  scenario('returns all shelves', async (scenario: StandardScenario) => {
    const result = await shelves()

    expect(result.length).toEqual(Object.keys(scenario.shelf).length)
  })

  scenario('returns a single shelf', async (scenario: StandardScenario) => {
    const result = await shelf({ id: scenario.shelf.one.id })

    expect(result).toEqual(scenario.shelf.one)
  })

  scenario('creates a shelf', async () => {
    const result = await createShelf({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a shelf', async (scenario: StandardScenario) => {
    const original = await shelf({ id: scenario.shelf.one.id })
    const result = await updateShelf({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a shelf', async (scenario: StandardScenario) => {
    const original = await deleteShelf({ id: scenario.shelf.one.id })
    const result = await shelf({ id: original.id })

    expect(result).toEqual(null)
  })
})
