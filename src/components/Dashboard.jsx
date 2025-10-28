import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import KanbanBoard from './KanbanBoard'
import TicketForm from './TicketForm'
import { getTickets, createTicket, updateTicket, deleteTicket } from '../services/api'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showTicketForm, setShowTicketForm] = useState(false)
  const [editingTicket, setEditingTicket] = useState(null)
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const response = await getTickets()
      setTickets(response.data.data || response.data)
    } catch (error) {
      console.error('Error fetching tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTicket = async (ticketData) => {
    try {
      await createTicket(ticketData)
      await fetchTickets()
      setShowTicketForm(false)
    } catch (error) {
      console.error('Error creating ticket:', error)
    }
  }

  const handleUpdateTicket = async (ticketId, ticketData) => {
    try {
      await updateTicket(ticketId, ticketData)
      await fetchTickets()
      setEditingTicket(null)
      setShowTicketForm(false)
    } catch (error) {
      console.error('Error updating ticket:', error)
    }
  }

  const handleDeleteTicket = async (ticketId) => {
    try {
      await deleteTicket(ticketId)
      await fetchTickets()
    } catch (error) {
      console.error('Error deleting ticket:', error)
    }
  }

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket)
    setShowTicketForm(true)
  }

  const handleAddTicket = () => {
    setEditingTicket(null)
    setShowTicketForm(true)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <KanbanBoard 
            tickets={tickets}
            onTicketUpdate={handleUpdateTicket}
            onEditTicket={handleEditTicket}
            onDeleteTicket={handleDeleteTicket}
            onAddTicket={handleAddTicket}
            loading={loading}
          />
        </main>
      </div>

      {/* Ticket Form Modal */}
      {showTicketForm && (
        <TicketForm
          ticket={editingTicket}
          onSubmit={editingTicket ? 
            (data) => handleUpdateTicket(editingTicket._id, data) : 
            handleCreateTicket
          }
          onClose={() => {
            setShowTicketForm(false)
            setEditingTicket(null)
          }}
        />
      )}
    </div>
  )
}

export default Dashboard