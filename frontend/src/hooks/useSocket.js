import { useEffect } from 'react'
import { io } from 'socket.io-client'

let socket = null
function getSocket() {
  if (!socket) socket = io({ transports: ['websocket'] })
  return socket
}

export function useSocket(event, callback, room) {
  useEffect(() => {
    const s = getSocket()
    if (room) s.emit('join', room)
    s.on(event, callback)
    return () => {
      s.off(event, callback)
      if (room) s.emit('leave', room)
    }
  }, [event, callback, room])
}
