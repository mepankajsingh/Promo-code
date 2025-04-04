import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  // Get IP from headers or connection
  const forwarded = event.node.req.headers['x-forwarded-for']
  const ip = forwarded 
    ? (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : forwarded[0]) 
    : event.node.req.headers['x-real-ip'] || 
      event.node.req.socket.remoteAddress || 
      '0.0.0.0'
  
  return { ip }
})
