
exports.createServer = function (req, res, next) {
    let {Server} = require("socket.io");

    const io = new Server(8080);

    io.on("connect", (socket) => {
        // receive a message from the client
        socket.on("fileUpload", (...args) => {
            console.log(args)
        });
    });
}