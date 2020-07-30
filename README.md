# investments-ui

Repo to host UI part of my investments project. It uses TS/React (No state management like Redux/Recoil/Mobx) for it and this project was created by create-react-app. This project is intended to give me the ability to manage some of my investments, either stocks or funds, instead of using my old spreadsheet.

Main used technologies:
* TS
* React
* React-Router
* Tailwind (themes + css)
* Styled-components
* Jest
* fp-ts as support for functional programming
* This also contains a tiny "client"(check Api.ts) for my GraphQL calls - Database using Hasura

# RoadMap

* Cover it with more tests - There are some unit/integration tests. Check `StockOverviewGrid.spec.tsx` which uses `server-handlers.js` and `server.js` as infrastructure to the API calls (fetch is not mocked so we have a mocked server based on service-workers provided by `msw`).
* Implement Dividends pages
* Make it responsive - For now the styles/colors are pretty messed because I'm trying to create my very own dark mode so that's won't be beaufitul but since it's using Tailwind it's already using my very own theme.

# Tech Debts

* Handle errors more decently - Hasura errors are *not* being handled at the moment just plain fetch rejections (check investments-cron for it)
* Fix some typings. - Wrapping some Material-ui components on styled-components messes with the typings so now I'm using a plain *any*
* Use observable-hooks/rxjs to deal with async calls - Some calls might fail and would be nice to retry them and rxjs can handle it with a single line with `stream.pipe(map(...), retry()/retryWhen()`
* Play with some libs like Recoil/Koa or maybe just using Redux/ReduxToolkit
* Apollo client if things get more complex

