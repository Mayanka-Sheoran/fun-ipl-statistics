# fun-ipl-statistics 

Some fun facts about the Indian Premier League and analysis of team performances and player performances through the seasons.

 * PWA (Progressive Web App)
 * Responsive web app for both mobile and web

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files.|

## Browser Compatibility 

| [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| No clue| Yes | Yes | Yes| Yes


Tools and Technologies used

  * React, Redux
  * Lodash for data manipulation
  * Webpack for bundling
  * Highcharts for data visualisations
  
Features in Progress

  * Ground Analysis for matches won and lost on each cricket stadium 
  * Adding a type ahead drop down for selecting players and cricket stadiums since it is hard to pick from a long dropdown
  * Offline access to the application
  * Filter the heat map based on a team to show the runs made by a team in each and every match
  * Move only the facts on the carousal and not the image 
  * Add appropriate messages when a certain player has not been part of a season and hence no data to show
  
Technical Debt

  * Move javascript logic from jsx files
  * Optimize data load instead of loading all the data on the dashboard page
  * Move data to firebase or AWS
  * Add unit tests
