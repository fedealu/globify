//const aliasses = require('module-alias');
const path = require('path');

const rootSrc = `./src`;

module.exports.PATHS_ALIASES = {
    "@root": path.resolve(rootSrc),
    "@components": path.resolve(`${rootSrc}/components/`),
    "@hocs": path.resolve(`${rootSrc}/hocs/`),
    "@containers": path.resolve(`${rootSrc}/containers/`)
}