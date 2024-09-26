class SocketService {
    constructor() {
      this.io = null;
    }

    setIo(io) {
      this.io = io;
    }
  
    emitEvent(roomId, event, data) {
      if (this.io) {
        this.io.to(roomId).emit(event, data);
      }
    }
  }
  
const socketService = new SocketService();
export { socketService }; 
  