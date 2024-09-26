export const socketHandler = (io) => {
    io.on("connection", (socket) => {
      console.log("Novo socket conectado:", socket.id);
              
      socket.on("join-room", (event) => {
        console.log(event.room_id);
        console.log(`Socket ${socket.id} entrou na sala ${event.room_id}`);
        socket.join(event.room_id);
  
        socket.to(event.room_id).emit("user-joined", `Usuário ${socket.id} entrou na sala ${event.room_id}`);
      });
  
      socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} desconectado`);
      });
    });
  };
  