const io = require("socket.io")(8000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("join", (id) => {
    console.log('join: ' , id);
    socket.join(id);
  });
  socket.on("sendMessage", (data) => {

    data.users.forEach(element => {
      element.forEach(person=>{
        console.log(person._id);
        if(person._id != data.sender)
        socket.to(person._id).emit('sendMessage',{message:data.message,sender:data.sender})
      })
    });
 //   socket.in(data.id).emit('sendMessage',data.users[0]);
  });
});
