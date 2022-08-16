let User = require('../model/accountInfo');
let Plan = require('../model/paymentPlan');
let Setting = require('../model/acocuntPaymentSetting')
const mariaDB = require('../mariaDB_connection')
const bcrypt = require('bcrypt')
const config = require('../config')

const resolvers = {
    Query: {
        async allUser() {
            try{
                let users = await User.find().lean();
                let planMap = new Map()
                let queryArr = []
                for(let i=0;i<users.length;i++) {
                    if(users[i].paymentPlan) {
                        queryArr.push({_id:users[i].paymentPlan})
                    }
                }

                let payplan = []
                if(queryArr.length !== 0) {
                    payplan = await Plan.find({$or:queryArr})
                }

                for(let i=0;i<payplan.length;i++) {
                    planMap.set(payplan[i]._id.toString(),payplan[i])
                }

                for(let i=0;i<users.length;i++) {
                    if(users[i].paymentPlan) {
                        users[i].paymentPlan = planMap.get(users[i].paymentPlan.toString())
                    }
                    else {
                        users[i].paymentPlan = null
                    }
                }
                return users
            }
            catch(e) {
                console.log(e)
                return []
            }
        }
    },
    Mutation: {
        async createUser(root,{input}) {
            return await User.create(input);
        },

        async updateUser(root,{updateValue}) {
            let updateQuery = {}
            if(updateValue.firstName) {
                updateQuery.firstName = updateValue.firstName
            }

            if(updateValue.lastName) {
                updateQuery.lastName = updateValue.lastName
            }

            if (updateValue.phoneNumber) {
                updateQuery.phoneNumber = updateValue.phoneNumber
            }

            if(updateValue.joinPath) {
                updateQuery.joinPath = updateValue.joinPath
            }

            try{
                await User.updateOne({email:updateValue.email},updateQuery)
                return await User.findOne({email:updateValue.email});
            }
            catch(e) {
                return await User.findOne({email:updateValue.email});
            }
        },

        async deleteUser(root,{deleteValue}) {
            try{
                await User.deleteOne({email:deleteValue.email})
                return true
            }
            catch(e) {
                console.log(e)
                return false
            }
        },

        async planToUser(root,{mappingValue}) {
            try{
                let prevPaymentSetting = User.findOne({email:mappingValue.email})
                let planTarget = await Plan.findOne({name:mappingValue.name})
                if(prevPaymentSetting.paymentSetting) {
                    let prevSetting = Setting.findOne({_id:prevPaymentSetting.paymentSetting})
                    await Setting.updateOne({_id:prevPaymentSetting.paymentSetting},{previousPaidDate:prevSetting.PaidDate,PaidDate:new Date()})
                    await User.updateOne({email:mappingValue.email},{paymentPlan:planTarget._id})
                }
                else{
                    let newSetting = await Setting.create({previousPaidDate:null,PaidDate:new Date()})
                    await User.updateOne({email:mappingValue.email},{paymentPlan:planTarget._id,paymentSetting:newSetting._id})
                }
                return true
            }
            catch(e) {
                console.log(e)
                return false
            }
        },

        async verifyAdminUser(root,{verifyTarget},req) {
            try{
                if(verifyTarget.Id === null) {
                    return false
                }

                if(verifyTarget.Password === null) {
                    return false
                }

                let conn = await mariaDB.getConnection();
                await conn.query('USE login')
                const rows = await conn.query(`SELECT * FROM login Where ID=?`,verifyTarget.Id);
                let result = null
                if(rows[0]) {
                    result = bcrypt.compareSync(verifyTarget.Password, rows[0].PASSWORD)
                }

                if(result) {
                    req.session.isLogin = true
                    return true
                }
                else {
                    return false
                }
            }
            catch(e) {
                console.log(e)
                return false
            }
        },

        async adminUserInsertion(root,{addAdminUser}) {
            try{
                let id = addAdminUser.Id
                let date = new Date().toISOString().slice(0,19).split("T").join(" ")

                let conn = await mariaDB.getConnection();
                await conn.query('USE login')

                let priviousQuery = "SELECT * FROM login WHERE ID="+"\""+id+"\""
                const priviousID = await conn.query(priviousQuery);
                if(priviousID[0]) {
                    return false
                }
                else {
                    let hash = bcrypt.hashSync(addAdminUser.Password, config.saltRound)
                    await conn.query("INSERT INTO login (ID,PASSWORD,EMAIL,CREATEDATE) VALUES (?,?,?,?)",[id,hash,addAdminUser.Email,date]);
                    return true
                }
            }
            catch(e) {
                console.log(e)
                return false
            }
        }
    }
}

module.exports = resolvers