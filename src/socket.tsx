import { io } from 'socket.io-client'

export const socket = io('http://localhost:8080')
//import.meta.env.VITE_API_URL

socket.on('connect', () => {
    console.log('WebSocket connected')
})