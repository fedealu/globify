//const aliasses = require('module-alias');
const path = require('path');

const rootSrc = `./src`;

module.exports.PATHS_ALIASES = {
    "@root": path.resolve(rootSrc),
    "@components": path.resolve(`${rootSrc}/components/`),
    "@hocs": path.resolve(`${rootSrc}/hocs/`),
    "@containers": path.resolve(`${rootSrc}/containers/`),
    "@store": path.resolve(`${rootSrc}/store/store`),
    "@reducers": path.resolve(`${rootSrc}/store/reducers/`),
    "@actions": path.resolve(`${rootSrc}/store/actions/`),
    "@styles": path.resolve(`${rootSrc}/assets/css/`),
    "@img": path.resolve(`${rootSrc}/assets/img/`),
}