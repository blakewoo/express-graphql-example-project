const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstPayingDate:Date,
    previousPayingDate : Date,
    nextPayingDate:Date,
    usedCount:Number
});

module.exports = mongoose.model('paymentSetting', userSchema);