window.addEventListener('DOMContentLoaded', () => {

    document.getElementById("submit").addEventListener("click",function (event) {
        let data = document.getElementById("query_area").value
        let reg= new RegExp('mutation')

        if(reg.test(data)) {
            mutationRequset("/test",data,function (text) {
                console.log(JSON.parse(text))
                document.getElementById("result").innerText = JSON.parse(text).data.allUser[0].firstName
            })
        }
        else {
            queryRequest("/test",data,function (text) {
                console.log(JSON.parse(text))
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
        alert("사용자 추가")
    })
    document.getElementById("userModifyButton").addEventListener("click",function (event) {
        alert("사용자 변경")
    })
    document.getElementById("userDeleteButton").addEventListener("click",function (event) {
        alert("사용자 삭제")
    })


})