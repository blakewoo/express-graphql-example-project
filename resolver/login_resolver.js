const mariaDB = require('../mariaDB_connection')
const bcrypt = require('bcrypt')
const config = require('../config')

const resolvers = {
    Mutation: {
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