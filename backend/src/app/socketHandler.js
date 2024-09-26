export const socketHandler = (io) => {
    io.on("connection", (socket) => {

      socket.on("join-room", (event) => {
        socket.join(event.roomId);
        socket.to(event.roomId).emit(
            "user-connected", 
            `Usuário ${event.userId} entrou na sala ${event.roomId}`
        );

        socket.on('disconnect', () => {
            socket.to(event.roomId).emit('user-disconnected', `Usuário ${event.userId} saiu da sala`);
          });
      });
    });
  };
  