export const socketHandler = (io) => {
    io.on("connection", (socket) => {
        
      socket.on("join-room", (event) => {
        socket.join(event.room_id);
        socket.to(event.room_id).emit(
            "user-connected", 
            `Usuário ${socket.id} entrou na sala ${event.room_id}`
        );

        socket.on('disconnect', () => {
            socket.to(event.room_id).emit('user-disconnected', `Usuário ${socket.id} saiu da sala`);
          });
      });
    });
  };
  