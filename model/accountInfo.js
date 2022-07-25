const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: Number,
    email:String,
    joinPath: String,
    paymentPlan: mongoose.Schema.Types.ObjectId,
    paymentSetting: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('accountInfo', userSchema);