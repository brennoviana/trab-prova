export const socketHandler = (io) => {
    io.on("connection", (socket) => {
      console.log("Novo socket conectado:", socket.id);
  
      socket.emit("test", "Bem-vindo! Testando evento...");
  
      socket.on("join-room", (roomId) => {
        console.log(`Socket ${socket.id} entrou na sala ${roomId}`);
        socket.join(roomId);
  
        socket.to(roomId).emit("user-joined", `Usuário ${socket.id} entrou na sala ${roomId}`);
      });
  
      socket.on("send-message", ({ roomId, message }) => {
        console.log(`Mensagem de ${socket.id} na sala ${roomId}: ${message}`);
  
        socket.to(roomId).emit("receive-message", {
          message,
          sender: socket.id,
        });
      });
  
      socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} desconectado`);
      });
    });
  };
  