function requestFunction(method_type,url,send_data,callback,ContentType="application/json") {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if(xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            }
            else {
                console.error(xhr.responseText);
            }
        }
    }

    let sender = send_data;

    if(method_type==="GET") {
        if(sender) {
            xhr.open(method_type,url+sender);
        }
        else {
            xhr.open(method_type,url);
        }
        xhr.setRequestHeader('Content-Type', ContentType);
        xhr.send();
    }
    else {
        if(ContentType === "multipart/form-data") {
            xhr.open(method_type,url);
            // xhr.setRequestHeader('Content-Type', ContentType);
            xhr.send(sender);
        }
        else {
            xhr.open(method_type,url);
            xhr.setRequestHeader('Content-Type', ContentType);
            xhr.send(JSON.stringify(sender));
        }
    }
}

function queryRequest(PATH,queryData,callback) {
    let target = null
    if(queryData) {
        target = "?query="+queryData
    }

    requestFunction("GET",PATH,target,function (value) {
        return callback(value)
    })
}

function mutationRequset(PATH,mutationData,callback) {
    requestFunction("POST",PATH,mutationData,function (value) {
        return callback(value)
    })
}

function toastMessage(type,message,width=400,height=200) {
    let html = document.getElementsByTagName("html")[0]

    let toastMessageDiv = document.createElement("div")
    toastMessageDiv.style.position = "absolute"
    toastMessageDiv.style.width =width+"px"
    toastMessageDiv.style.height =height+"px"
    toastMessageDiv.style.top = "calc(50% - "+height/2+"px)"
    toastMessageDiv.style.left = "calc(50% - "+width/2+"px)"
    toastMessageDiv.style.border = "#10ff00 1px solid"
    toastMessageDiv.style.background = "black"
    toastMessageDiv.style.textAlign = "center"

    if(type === "custom") {
        toastMessageDiv.innerHTML = ""
        html.appendChild(toastMessageDiv)
    }
    else if(type === "simple") {
        let title = document.createElement("h2")
        title.innerText=message
        let closeButton = document.createElement("input")
        closeButton.type="button"
        closeButton.value="close"
        closeButton.id="closeThisDiv"

        toastMessageDiv.appendChild(title)
        toastMessageDiv.appendChild(closeButton)
        html.appendChild(toastMessageDiv)

        document.getElementById("closeThisDiv").addEventListener("click",function (event) {
            event.currentTarget.parentNode.remove()
        })

    }
    else {
        toastMessageDiv.innerHTML = ""
        html.appendChild(toastMessageDiv)
    }


}