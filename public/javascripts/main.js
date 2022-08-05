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
                let paymentPlanTd = document.createElement("td")

                emailTd.innerText = Data[i].email;
                firstNameTd.innerText = Data[i].firstName;
                lastNameTd.innerText = Data[i].lastName;
                phoneNumberTd.innerText = Data[i].phoneNumber;
                joinPathTd.innerText = Data[i].joinPath;
                paymentPlanTd.innerText = Data[i].paymentPlan ? Data[i].paymentPlan:"없음";

                temp.appendChild(emailTd)
                temp.appendChild(firstNameTd)
                temp.appendChild(lastNameTd)
                temp.appendChild(phoneNumberTd)
                temp.appendChild(joinPathTd)
                temp.appendChild(paymentPlanTd)
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


    document.getElementById("paymentPlanReadRenewButton").addEventListener("click",function (event) {
        let queryString = "\{" +
            "allPlan \{" +
            "name "+
            "monthlyCostPerPerson "+
            "isFirstFunctionOpen "+
            "isSecondFunctionOpen "+
            "isThirdFunctionOpen "+
            "isForthFunctionOpen "+
            "\}" +
            "\}"

        queryRequest("/paymentPlan",queryString,function (text) {
            let targetTable = document.getElementById("paymentPlanTableBody")
            targetTable.innerHTML = ""

            let rawData = JSON.parse(text)
            let Data =rawData.data.allPlan
            let tempTable = document.createDocumentFragment()
            for(let i=0;i<Data.length;i++) {
                let temp = document.createElement("tr")
                let nameTd = document.createElement("td")
                let monthlyCostPerPersonTd = document.createElement("td")
                let isFirstFunctionOpenTd = document.createElement("td")
                let isSecondFunctionOpenTd = document.createElement("td")
                let isThirdFunctionOpenTd = document.createElement("td")
                let isForthFunctionOpenTd = document.createElement("td")

                nameTd.innerText = Data[i].name;
                monthlyCostPerPersonTd.innerText = Data[i].monthlyCostPerPerson;
                isFirstFunctionOpenTd.innerText = Data[i].isFirstFunctionOpen;
                isSecondFunctionOpenTd.innerText = Data[i].isSecondFunctionOpen;
                isThirdFunctionOpenTd.innerText = Data[i].isThirdFunctionOpen;
                isForthFunctionOpenTd.innerText = Data[i].isForthFunctionOpen;

                temp.appendChild(nameTd)
                temp.appendChild(monthlyCostPerPersonTd)
                temp.appendChild(isFirstFunctionOpenTd)
                temp.appendChild(isSecondFunctionOpenTd)
                temp.appendChild(isThirdFunctionOpenTd)
                temp.appendChild(isForthFunctionOpenTd)
                targetTable.appendChild(temp)
            }

            targetTable.appendChild(tempTable)
        })
    })

    document.getElementById("planCreateButton").addEventListener("click",function (event) {
        let name = document.getElementById("targetPlanName").value
        let count = document.getElementById("personCount").value
        let firstFun = document.getElementById("firstFunctionFlag").value
        let secondFunc = document.getElementById("secondFunctionFlag").value
        let thirdFunc = document.getElementById("thirdFunctionFlag").value
        let forthFunc = document.getElementById("forthFunctionFlag").value

        let planObj = "" +
            "name:\""+name+"\","+
            "monthlyCostPerPerson:"+count+","+
            "isFirstFunctionOpen:"+firstFun+","+
            "isSecondFunctionOpen:"+secondFunc+","+
            "isThirdFunctionOpen:"+thirdFunc+","+
            "isForthFunctionOpen:"+forthFunc+""


        let queryString = `
        mutation {
            createPlan(input:{`+planObj+`}
            ){
                name
                monthlyCostPerPerson
                isFirstFunctionOpen
                isSecondFunctionOpen
                isThirdFunctionOpen
                isForthFunctionOpen
            }}
        `

        let jsonBody = {
            "query": queryString,
            "variables":null
        }

        mutationRequset("/paymentPlan",jsonBody,function (text) {
            alert("create complete")
        })
    })

    document.getElementById("planModifyButton").addEventListener("click",function (event) {
        let name = document.getElementById("modifyTargetPlanName").value
        let count = document.getElementById("modifyPersonCount").value
        let firstFun = document.getElementById("modifyFirstFunctionFlag").value
        let secondFunc = document.getElementById("modifySecondFunctionFlag").value
        let thirdFunc = document.getElementById("modifyThirdFunctionFlag").value
        let forthFunc = document.getElementById("modifyForthFunctionFlag").value

        let planObj = "" +
            "name:\""+name+"\","+
            "monthlyCostPerPerson:"+count+","+
            "isFirstFunctionOpen:"+firstFun+","+
            "isSecondFunctionOpen:"+secondFunc+","+
            "isThirdFunctionOpen:"+thirdFunc+","+
            "isForthFunctionOpen:"+forthFunc+""


        let queryString = `
        mutation {
            updatePlan(updateValue:{`+planObj+`}
            ){
                name
                monthlyCostPerPerson
                isFirstFunctionOpen
                isSecondFunctionOpen
                isThirdFunctionOpen
                isForthFunctionOpen
            }}
        `

        let jsonBody = {
            "query": queryString,
            "variables":null
        }

        mutationRequset("/paymentPlan",jsonBody,function (text) {
            alert("modify complete")
        })
    })

    document.getElementById("planDeleteButton").addEventListener("click",function (event) {
        let name = document.getElementById("deleteTargetPlanName").value

        let planObj = "" +
            "name:\""+name+"\""


        let queryString = `
        mutation {
            deletePlan(deleteValue:{`+planObj+`})}`

        let jsonBody = {
            "query": queryString,
            "variables":null
        }

        mutationRequset("/paymentPlan",jsonBody,function (text) {
            alert("delete complete")
        })
    })

    document.getElementById("planToUserButton").addEventListener("click",function (event) {
        let userEmail = document.getElementById("pointTargetUserEmail").value
        let planName = document.getElementById("pointTargetPlanName").value

        let planObj = "" +
            "email:\""+userEmail+"\"," +
            "name:\""+planName+"\""

        let queryString = `
        mutation {
            planToUser(mappingValue:{`+planObj+`})}`

        let jsonBody = {
            "query": queryString,
            "variables":null
        }

        mutationRequset("/user",jsonBody,function (text) {
            alert("mapping complete")
        })
    })
})