// ========================================================
// Check if the currentRoute(routeToCheck) contains any of the passed string (staticRoutes, array of routes)
// ========================================================

const containsRoute = (routeToCheck, staticRoutes) => {
  let contains = false
  let pageName = ''
  staticRoutes.every((staticRoute) => {
    if (routeToCheck.indexOf(staticRoute) > -1) {
      contains = true
      pageName = staticRoute
      return false
    } else return true
  })
  return {
    contains,
    pageName
  }
}
export default containsRoute
