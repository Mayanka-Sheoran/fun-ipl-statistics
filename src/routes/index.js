// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Dashboard from './Dashboard.js'
import Team from './Team'
import Player from './Player.js'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Dashboard,
  childRoutes: [
    Team, Player
  ]
})

export default createRoutes
