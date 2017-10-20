(function (moduleFactory) {
    const fs = require('fs');
    const pathUtils = require('./pathUtils');

    module.exports = moduleFactory(fs, pathUtils);
})(function (fs, pathUtils) {
    'use strict';

    const getPathTokens = pathUtils.getPathTokens;
    const getFullPath = pathUtils.getFullPath;
    const joinPathTokens = pathUtils.joinPathTokens;
    const statFile = pathUtils.statFile;

    function buildNextPath(basePath) {
        const basePathTokens = getPathTokens(basePath);
        const tokenLength = basePathTokens.length;
        const nextPathTokens = basePathTokens.slice(0, tokenLength - 1);

        return joinPathTokens(nextPathTokens);
    }

    function findInParentPath(basePath) {
        const isEmptyPath = basePath === '';
        const nextPath = buildNextPath(basePath);

        return isEmptyPath ? null : findConfig(nextPath);
    }

    function findConfig(basePath) {
        const configPath = getFullPath(basePath, 'handyserver.conf.js');
        const configExists = statFile(configPath);

        return configExists
            ? require(configPath)
            : findInParentPath(basePath);
    }
});
