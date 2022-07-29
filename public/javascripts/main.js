window.addEventListener('DOMContentLoaded', () => {

    document.getElementById("submit").addEventListener("click",function (event) {
        let data = document.getElementById("query_area").value
        let reg= new RegExp('mutation')

        if(reg.test(data)) {
            mutationRequset("/test",data,function (text) {
                document.getElementById("result").innerText = JSON.parse(text).data.allUser[0].firstName
            })
        }
        else {
            queryRequest("/test",data,function (text) {
                document.getElementById("result").innerText = JSON.parse(text).data.allUser[0].firstName
            })
        }
    })

    document.getElementById("userReadRenewButton").addEventListener("click",function (event) {
        let queryString = "\{" +
            "allUser \{" +
            "email " +
            "firstName " +
            "lastName " +
            "phoneNumber " +
            "joinPath " +
            "\}" +
            "\}"

        queryRequest("/user",queryString,function (text) {
            let targetTable = document.getElementById("userTableBody")
            targetTable.innerHTML = ""

            let rawData = JSON.parse(text)
            let Data =rawData.data.allUser
            let tempTable = document.createDocumentFragment()
            for(let i=0;i<Data.length;i++) {
                let temp = document.createElement("tr")
                let emailTd = document.createElement("td")
                let firstNameTd = document.createElement("td")
                let lastNameTd = document.createElement("td")
                let phoneNumberTd = document.createElement("td")
                let joinPathTd = document.createElement("td")

                emailTd.innerText = Data[i].email;
                firstNameTd.innerText = Data[i].firstName;
                lastNameTd.innerText = Data[i].lastName;
                phoneNumberTd.innerText = Data[i].phoneNumber;
                joinPathTd.innerText = Data[i].joinPath;

                temp.appendChild(emailTd)
                temp.appendChild(firstNameTd)
                temp.appendChild(lastNameTd)
                temp.appendChild(phoneNumberTd)
                temp.appendChild(joinPathTd)
                targetTable.appendChild(temp)
            }

            targetTable.appendChild(tempTable)
        })
    })

    document.getElementById("userCreateButton").addEventListener("click",function (event) {
        let firstName = document.getElementById("create_firstName").value
        let lastName = document.getElementById("create_lastName").value
        let email = document.getElementById("create_email").value
        let phoneNumber = document.getElementById("create_phoneNumber").value
        let joinPath = document.getElementById("create_joinPath").value

        let userObj = "" +
            "firstName:\""+firstName+"\","+
            "lastName:\""+lastName+"\","+
            "email:\""+email+"\""

        if(phoneNumber) {
            userObj += ",phoneNumber:\""+phoneNumber+"\""
        }

        if(joinPath) {
            userObj += ",joinPath:\""+joinPath+"\""
        }

        let queryString = `
        mutation {
            createUser(input:{`+userObj+`}
            ){
            email
            firstName
            lastName
            phoneNumber
            joinPath
            }}
        `

        let jsonBody = {
            "query": queryString,
            "variables":null
        }

        mutationRequset("/user",jsonBody,function (text) {
            alert("input complete")
        })
    })
    document.getElementById("userModifyButton").addEventListener("click",function (event) {
        let firstName = document.getElementById("modify_firstName").value
        let lastName = document.getElementById("modify_lastName").value
        let email = document.getElementById("modify_email").value
        let phoneNumber = document.getElementById("modify_phoneNumber").value
        let joinPath = document.getElementById("modify_joinPath").value

        let userObj = "" +
            "firstName:\""+firstName+"\","+
            "lastName:\""+lastName+"\","+
            "email:\""+email+"\""

        if(phoneNumber) {
            userObj += ",phoneNumber:\""+phoneNumber+"\""
        }

        if(joinPath) {
            userObj += ",joinPath:\""+joinPath+"\""
        }

        let queryString = `
        mutation {
            updateUser(updateValue:{`+userObj+`}
            ){
            email
            firstName
            lastName
            phoneNumber
            joinPath
            }}
        `

        let jsonBody = {
            "query": queryString,
            "variables":null
        }

        mutationRequset("/user",jsonBody,function (text) {
            alert("update complete")
        })
    })
    document.getElementById("userDeleteButton").addEventListener("click",function (event) {
        let email = document.getElementById("delete_email").value

        let userObj = "" +
            "email:\""+email+"\""

        let queryString = `
        mutation {
            deleteUser(deleteValue:{`+userObj+`}
            )}
        `

        let jsonBody = {
            "query": queryString,
            "variables":null
        }

        mutationRequset("/user",jsonBody,function (text) {
            alert("delete complete")
        })
    })

})