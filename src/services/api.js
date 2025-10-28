import axios from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Tickets API
export const getTickets = () => api.get('/tickets')
export const getTicketById = (id) => api.get(`/tickets/${id}`)
export const createTicket = (ticketData) => api.post('/tickets', ticketData)
export const updateTicket = (id, ticketData) => api.put(`/tickets/${id}`, ticketData)
export const updateTicketStatus = (id, status) => api.patch(`/tickets/${id}/status`, status)
export const deleteTicket = (id) => api.delete(`/tickets/${id}`)

export default api