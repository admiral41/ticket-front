import React from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import KanbanColumn from './KanbanColumn'
import { updateTicket } from '../services/api'

const KanbanBoard = ({ tickets, onTicketUpdate, onEditTicket, onDeleteTicket, onAddTicket, loading }) => {
  const columns = {
    open: {
      title: 'Open',
      color: 'bg-blue-500',
      tickets: tickets.filter(ticket => ticket.status === 'open')
    },
    in_progress: {
      title: 'In Progress',
      color: 'bg-yellow-500',
      tickets: tickets.filter(ticket => ticket.status === 'in_progress')
    },
    resolved: {
      title: 'Resolved',
      color: 'bg-green-500',
      tickets: tickets.filter(ticket => ticket.status === 'resolved')
    },
    closed: {
      title: 'Closed',
      color: 'bg-gray-500',
      tickets: tickets.filter(ticket => ticket.status === 'closed')
    }
  }

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result

    // If dropped outside any column
    if (!destination) return

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return

    // Find the ticket being dragged
    const ticket = tickets.find(t => t._id === draggableId)
    if (!ticket) return

    // Update ticket status
    const updatedTicket = {
      ...ticket,
      status: destination.droppableId
    }

    try {
      await updateTicket(ticket._id, updatedTicket)
      onTicketUpdate(ticket._id, updatedTicket)
    } catch (error) {
      console.error('Error updating ticket status:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4">
            <img
              src="/logo.png"
              alt="Loading"
              className="w-full h-full object-contain animate-pulse"
            />
          </div>
          <p className="text-gray-600">Loading tickets...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Board Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ticket Board</h2>
          <p className="text-gray-600">Drag and drop tickets to update their status</p>
        </div>
        <div className="text-sm text-gray-500">
          Total Tickets: {tickets.length}
        </div>
      </div>

      {/* Create Ticket Button */}
      <div className="flex justify-end">
        <button
          onClick={onAddTicket}
          className="bg-red-700 hover:bg-red-900 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="font-medium">Create Ticket</span>
        </button>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {Object.entries(columns).map(([columnId, column]) => (
            <KanbanColumn
              key={columnId}
              columnId={columnId}
              title={column.title}
              color={column.color}
              tickets={column.tickets}
              onEditTicket={onEditTicket}
              onDeleteTicket={onDeleteTicket}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

export default KanbanBoard