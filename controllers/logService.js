/**
 *Created by Han on 4/10/2017.
  */
'use strict';

var mongoose = require('mongoose');
var randomString = require('randomstring');
var async = require('async');
var HistoryCollection = require('../models/history');
var Utils = require('../components/utils');
var P = require('./parameters');
var S = require('./status');
var Config = require('../components/configs');

exports.addLog = function (req, res, next) {
    console.log('---addLog', 'start', req.body);
    var params = req.body;

    var record= {};

    var userLog = params.userLog;
    var email = params.email;

    async.waterfall([
        function (next) {
            var loginDetail = new HistoryCollection();
            loginDetail.email = email;
            loginDetail.userLog = userLog;
            loginDetail.save(function(err) {
                next(err);
            });
        }],
        function(err) {
            if (err) {
                console.log('--err-addLog', err);
                res.status(S.SERVERERR_INTERNAL_SERVER_ERROR)
                    .json({status: S.SERVERERR_INTERNAL_SERVER_ERROR, msg: err});
            } else {
                console.log('--success-addLog');
                res.status(S.SUCCESS_OK)
                    .json({status: S.SUCCESS_OK, msg: 'success'});
            }
        }
    );
}

exports.getAllLogs = function (req, res, next) {
    var searchID = req.query.search.value;
    console.log('---getAllLogs', 'start', searchID);
    var dataTableObject = {};
    dataTableObject.draw = parseInt(req.query.draw) || 0;
    dataTableObject.paginationStart = parseInt(req.query.start) || 0;
    dataTableObject.paginationLength = parseInt(req.query.length) || 10;
    dataTableObject.searchString = req.query.search.value;
    async.waterfall([
            function (next) {
                HistoryCollection.aggregate([
                    {$match: {$or: [
                        {email: {"$regex": searchID, "$options": "i"}},
                        {userLog: {"$regex": searchID, "$options": "i"}}
                    ]}},
                ], function (err, result) {
                    next(err, result);
                });
            }],
        function(err, data) {
            if (err) {
                console.log('--err-getAllLogs', err);
                res.status(S.SERVERERR_INTERNAL_SERVER_ERROR)
                    .json({status: S.SERVERERR_INTERNAL_SERVER_ERROR, msg: err, recordsFiltered: 0, recordsTotal: 0});
            } else {
                console.log('---getAllLogs', 'success');
                var recordsFiltered = data.length;
                var recordsTotal = data.length;
                data = data.slice(dataTableObject.paginationStart, dataTableObject.paginationStart + dataTableObject.paginationLength);
                res.status(S.SUCCESS_OK)
                    .json({status: S.SUCCESS_OK, msg: 'success', data: data, recordsFiltered: recordsFiltered, recordsTotal: recordsTotal});
            }
        }
    );
}

