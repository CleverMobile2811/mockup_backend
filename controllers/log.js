'use strict';

var url = require('url');


var urService = require('./logService');


module.exports.addLog = function addLog (req, res, next) {
    urService.addLog (req, res, next);
};
module.exports.getAllLogs = function getAllLogs(req, res, next) {
    urService.getAllLogs(req, res, next);
};
