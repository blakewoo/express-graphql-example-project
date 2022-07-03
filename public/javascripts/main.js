window.addEventListener('DOMContentLoaded', () => {

    document.getElementById("submit").addEventListener("click",function (event) {
        let data = document.getElementById("query_area").value
        let sendData = {
            data : data
        }
        console.log(sendData)
        requestFunction("POST","/test", sendData,function (text) {
            document.getElementById("result").innerText = text
        })
    })

    function requestFunction(method_type,url,send_data,callback) {
        let xhr = new XMLHttpRequest();
        let data = send_data ? send_data:{};

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

        let sender = data;
        xhr.open(method_type,url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(sender));
    }
})