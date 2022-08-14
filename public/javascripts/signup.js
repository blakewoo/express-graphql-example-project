window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("acceptButton").addEventListener("click",acceptButtonEvent)
    document.getElementById("cancelButton").addEventListener("click",cancelButtonEvent)
})


function acceptButtonEvent(event) {
    let userObj=  "Id:\""+document.getElementById("signupID").value+"\","+
        "Password:\""+document.getElementById("signupPassword").value+"\""+
        "Email:\""+document.getElementById("signupEmail").value+"\""

    let signupQuery = `
         mutation {
            adminUserInsertion(addAdminUser:{`+userObj+`}
        )}
    `

    let jsonBody = {
        "query": signupQuery,
        "variables":null
    }

    mutationRequset("/user",jsonBody,function (value){
        if(value) {
            location.href = location.protocol+"//"+location.host+"/login"
        }
        else {
            // 가입 안되었다고 알리는 알림!
        }
    })
}

function cancelButtonEvent(event) {
    location.href = location.protocol+"//"+location.host+"/login"
}