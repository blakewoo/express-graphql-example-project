const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    previousPaidDate : Date,
    PaidDate:Date
});

module.exports = mongoose.model('paymentSetting', userSchema);