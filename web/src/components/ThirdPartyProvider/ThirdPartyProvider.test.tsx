import { render } from '@redwoodjs/testing/web'

import ThirdPartyProvider from './ThirdPartyProvider'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ThirdPartyProvider', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThirdPartyProvider />)
    }).not.toThrow()
  })
})
