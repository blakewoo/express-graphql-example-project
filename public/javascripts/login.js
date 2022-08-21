window.addEventListener('DOMContentLoaded', () => {
    matrixBackGround("background_matrix")

    document.getElementById("loginButton").addEventListener("click",loginButtonEvent)
    document.getElementById("signupButton").addEventListener("click",signupButtonEvent)
})

function loginButtonEvent(event) {
    let inputId = document.getElementById("loginID").value.toString()
    let inputPassword = document.getElementById("loginPassword").value.toString()


    if(!inputId) {
        toastMessage("simple","ID를 입력해주십시오",400,130)
        return
    }

    if(!inputPassword) {
        toastMessage("simple","PASSWORD를 입력해주십시오",400,130)
        return
    }


    let userObj = "" +
        "Id:\""+inputId+"\","+
        "Password:\""+inputPassword+"\""


    let loginQuery = `
        mutation {
            verifyAdminUser(verifyTarget:{`+userObj+`})
        }
    `

    let jsonBody = {
        "query": loginQuery,
        "variables":null
    }

    mutationRequset("/loginuser",jsonBody,function (value){
        let result = JSON.parse(value)
        if(result.data.verifyAdminUser === true) {
            location.replace(location.protocol+"//"+location.host+"/")
        }
        else {
            toastMessage("simple","ID or password is invalid",400,120)
        }
    })
}

function signupButtonEvent(event) {
    location.href = location.protocol + "//" + location.host +"/signup"
}

function matrixBackGround(id) {
    // geting canvas by Boujjou Achraf
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");

    //making the canvas full screen
    c.height = window.innerHeight;
    c.width = window.innerWidth;

    //chinese characters - taken from the unicode charset
    var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    //converting the string into an array of single characters
    matrix = matrix.split("");

    var font_size = 10;
    var columns = c.width/font_size; //number of columns for the rain
    //an array of drops - one per column
    var drops = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for(var x = 0; x < columns; x++)
        drops[x] = 1;

    //drawing the characters
    function draw()
    {
        //Black BG for the canvas
        //translucent BG to show trail
        ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
        ctx.fillRect(0, 0, c.width, c.height);

        ctx.fillStyle = "#10ff00";//green text
        ctx.font = font_size + "px arial";
        //looping over drops
        for(var i = 0; i < drops.length; i++)
        {
            //a random chinese character to print
            var text = matrix[Math.floor(Math.random()*matrix.length)];
            //x = i*font_size, y = value of drops[i]*font_size
            ctx.fillText(text, i*font_size, drops[i]*font_size);

            //sending the drop back to the top randomly after it has crossed the screen
            //adding a randomness to the reset to make the drops scattered on the Y axis
            if(drops[i]*font_size > c.height && Math.random() > 0.975)
                drops[i] = 0;

            //incrementing Y coordinate
            drops[i]++;
        }
    }

    setInterval(draw, 35);
}