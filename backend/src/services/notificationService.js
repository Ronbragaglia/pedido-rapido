function notifyOrder(io, orderId, event, data) {
  io.to(`order:${orderId}`).emit(event, data)
}

module.exports = { notifyOrder }
