const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    monthlyCostPerPerson : Number,
    isFirstFunctionOpen : Boolean,
    isSecondFunctionOpen : Boolean,
    isThirdFunctionOpen : Boolean,
    isForthFunctionOpen : Boolean,
});

module.exports = mongoose.model('accountInfo', userSchema);