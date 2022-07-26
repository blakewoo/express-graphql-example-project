function requestFunction(method_type,url,send_data,callback) {
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
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
    }
    else {
        xhr.open(method_type,url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(sender));
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