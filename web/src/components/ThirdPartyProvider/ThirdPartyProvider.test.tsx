import ThirdPartyProvider from './ThirdPartyProvider'
import { render } from '@redwoodjs/testing/web'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ThirdPartyProvider', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThirdPartyProvider loading={false} />)
    }).not.toThrow()
  })
})
