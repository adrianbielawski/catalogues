const { compose } = require('redux')

declare interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: compose
}