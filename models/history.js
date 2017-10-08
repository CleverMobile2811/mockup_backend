/**
 * Created by admin on 10/7/2017.
 */

/**
 * Created by David on 12/14/2016
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Config = require('../components/configs');
/* User schema */

var HistorySchema = new Schema({
    email: String,
    userLog: String,
    dateTime: {
        type: Date,
        default: Date.now(),
    }
}, {collection: 'HistoryCollection', versionKey: false});



module.exports = mongoose.model('HistoryCollection', HistorySchema);