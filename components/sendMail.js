/**
 *Created by Han on 29/9/2017.
 */

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var xoauth2 = require('xoauth2');

exports.Admin = "";

transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: '', //email
        pass: '' //password
    },
}));

exports.sendMail = function(to, subject, body) {
    var mailOptions = {
        to: to,
        from: '', //email
        subject: subject,
        text: body
    };

    transport.sendMail(mailOptions, function(err) {
        if(err) {
            console.log('send mail', err);
        } else {
            console.log('send mail', 'sent successfully');
        }
    });
};