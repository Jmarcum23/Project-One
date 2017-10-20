(function (moduleFactory) {
    const path = require('path');

    module.exports = moduleFactory(path);
})(function (path) {
    'use strict';

    const upDirPattern = /^\.\.\//;

    function cleanPath(filePath) {
        let cleanedPath = filePath.split(/[\\\/]/).join(path.sep);
        return path.normalize(cleanedPath);
    }

    function getSafePath(filePath) {
        let result = typeof filePath === 'string' ? filePath : '';

        while (upDirPattern.test(result)) {
            result = result.replace(upDirPattern, '');
        }

        return result;
    }

    function getFullPath(basePath, filePath) {
        const cleanBasePath = basePath.replace(/[\\\/]$/, '')
        const safeFilePath = getSafePath(filePath);
        return cleanPath(cleanBasePath + path.sep + safeFilePath);
    }

    function getPathTokens(pathStr) {
        return pathStr.split(path.sep);
    }

    function joinPathTokens(pathTokens) {
        return pathTokens.join(path.sep);
    }

    return {
        getFullPath: getFullPath,
        getPathTokens: getPathTokens,
        joinPathTokens: joinPathTokens
    };
});
