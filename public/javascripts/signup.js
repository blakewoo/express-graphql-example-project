window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("acceptButton").addEventListener("click",acceptButtonEvent)
    document.getElementById("cancelButton").addEventListener("click",cancelButtonEvent)
})


function acceptButtonEvent(event) {
    let userObj= {}

    let signupQuery = `{
        mutation {
            adminUserInsertion(adminUserData:{`+userObj+`}
        )}
    }
    `

    mutationRequset("/user",signupQuery,function (value){
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