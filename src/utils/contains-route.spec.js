import containsRoute from './contains-route'

describe('Utils: manage-session.js', () => {
  it('containsRoute: Should check whether the route is static or not', () => {
    expect(containsRoute('forgot-password', ['forgot-password', 'test-route'])).to.deep.equal({
      contains: true,
      pageName: 'forgot-password'
    })
    expect(containsRoute('dummy-route', ['forgot-password'])).to.deep.equal({
      contains: false,
      pageName: ''
    })
  })
  it('containsRoute: Should return true even if the current route contains the static route as a substring', () => {
    expect(containsRoute('test/forgot-password/test', ['forgot-password'])).to.deep.equal({
      contains: true,
      pageName: 'forgot-password'
    })
  })
})
