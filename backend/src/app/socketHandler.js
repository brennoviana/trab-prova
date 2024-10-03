import axios from 'axios';

export const socketHandler = (io) => {
    io.on("connection", (socket) => {

      socket.on("join-room", (event) => {
        socket.join(event.roomId);
        socket.to(event.roomId).emit(
            "user-connected", 
            `Usuário ${event.userId} entrou na sala ${event.roomId}`
        );

        try {
          const response = axios.post(`http://localhost:3000/api/v1/rooms/${roomId}/join`);
          console.log('Requisição bem-sucedida:', response.data);
        } catch (error) {
          console.error('Erro ao fazer a requisição:', error);
        }

        socket.on('signal', (data) => {
          const { roomId, signalData } = data;

          socket.to(roomId).emit('signal', signalData);
        });

        socket.on('disconnect', () => {
            socket.to(event.roomId).emit('user-disconnected', `Usuário ${event.userId} saiu da sala`);
          });
      });
    });
  };
  