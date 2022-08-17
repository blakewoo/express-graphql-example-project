window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("acceptButton").addEventListener("click",acceptButtonEvent)
    document.getElementById("cancelButton").addEventListener("click",cancelButtonEvent)
})


function acceptButtonEvent(event) {

    let signupId= document.getElementById("signupID").value;
    let signupPassword = document.getElementById("signupPassword").value
    let signupEmail = document.getElementById("signupEmail").value
    let emailReg = new RegExp("^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\\.[a-zA-Z]{2,6}$");

    if(signupId === "") {
        toastMessage("simple","ID is empty",400,120)
        return
    }

    if(signupPassword === "") {
        toastMessage("simple","Password is empty",400,120)
        return
    }

    if(signupEmail === "") {
        toastMessage("simple","Email is empty",400,120)
        return
    }

    if(!emailReg.test(signupEmail)) {
        toastMessage("simple","Email is invalid",400,120)
        return
    }

    let userObj=  "Id:\""+signupId+"\","+
        "Password:\""+signupPassword+"\""+
        "Email:\""+signupEmail+"\""

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