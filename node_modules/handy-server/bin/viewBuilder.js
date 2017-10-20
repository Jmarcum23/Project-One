(function (moduleFactory) {
    const fileUtils = require('./fileUtils');
    const showdown = require('showdown');

    module.exports = moduleFactory(fileUtils, showdown);
})(function (fileUtils, showdown) {
    'use strict';

    const mdOptions = {
        tables: true,
        disableForced4SpacesIndentedSublists: true
    };
    const mdConverter = new showdown.Converter(mdOptions);
    mdConverter.setFlavor('github');

    const mdStyles = fileUtils.getFile(__dirname + '/../static-files/md.css');

    function transformMarkdown(content) {
        const htmlOutput = mdConverter.makeHtml(content);
        const result =
            '<html>\n' +
            '<style>\n' + mdStyles + '</style>\n' +
            '<body>\n<div class="container">' +
            htmlOutput +
            '</div>\n</body>\n' +
            '</html>';

        return result;
    }

    const transforms = [
        {
            isTransformable: (content, filePath) =>
                typeof filePath === 'string' && /\.md$/.test(filePath),
            transform: transformMarkdown
        }
    ];

    function buildCurrentPath(url) {
        const currentPath = /^\//.test(url) ? url : '/' + url;
        const pathSuffix = /\/$/.test(currentPath) ? '' : '/';

        return currentPath + pathSuffix;
    }

    function buildPathLink(currentPath, nextPath) {
        return `<a href="${currentPath}${nextPath}">${nextPath}</a><br>\n`;
    }

    function addPathLink(currentPath) {
        return function (result, nextPath) {
            const pathLink = buildPathLink(currentPath, nextPath);
            return result + pathLink;
        };
    }

    function buildDirList(filePaths, url) {
        const currentPath = buildCurrentPath(url);

        return filePaths.reduce(addPathLink(currentPath), '');
    }

    function transformContent(filePath) {
        return function (result, transformer) {
            return transformer.isTransformable(result, filePath)
                ? transformer.transform(result)
                : result;
        }
    }

    function getCurrentFile(fileContent, url) {
        return transforms.reduce(transformContent(url), fileContent);
    }

    function buildViewOutput(pathOutput, url) {
        const isFileContent = typeof pathOutput === 'string';

        const responseAction = isFileContent
            ? getCurrentFile
            : buildDirList;

        return responseAction(pathOutput, url);
    }

    function getView(filePath, url) {
        const pathOutput = fileUtils.getFileOrDirectoryList(filePath);
        const isBadPath = pathOutput === null;

        return isBadPath ? null : buildViewOutput(pathOutput, url);
    }

    return {
        getView: getView
    };
});
