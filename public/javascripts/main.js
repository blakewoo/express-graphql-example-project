window.addEventListener('DOMContentLoaded', () => {

    document.getElementById("submit").addEventListener("click",function (event) {
        let data = document.getElementById("result").value
        requestFunction("POST","/test", data)
    })

    function requestFunction (method,url,data) {
        const xhr = new XMLHttpRequest();

        // 요청을 초기화 합니다.
        xhr.open(method, url);

        // onreadystatechange 이벤트를 이용해 요청에 대한 응답 결과를 처리합니다.
        xhr.onreadystatechange = function (event) {
            const { target } = event;

            if (target.readyState === XMLHttpRequest.DONE) {
                const { status } = target;

                if (status === 0 || (status >= 200 && status < 400)) {
                    return xhr.responseText
                } else {
                    // 에러가 발생한 경우
                }
            }
        };

        // 서버에 요청을 보냅니다.
        xhr.send();
    }
})