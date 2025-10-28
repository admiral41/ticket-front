import React from 'react'
import { Edit2, Clock, Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'

const KanbanCard = ({ ticket, isDragging, onEdit, onDelete }) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  }

  const priorityIcons = {
    low: '🔵',
    medium: '🟡',
    high: '🟠',
    urgent: '🔴'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleDelete = async (e) => {
    e.stopPropagation()

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      focusCancel: true,
    })

    if (result.isConfirmed) {
      onDelete(ticket._id)
      Swal.fire({
        title: 'Deleted!',
        text: 'Your ticket has been deleted.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      })
    }
  }

  return (
    <div
      className={`
        bg-white rounded-lg border border-gray-200 p-4 shadow-sm cursor-pointer transition-all
        ${isDragging ? 'rotate-2 shadow-lg' : 'hover:shadow-md'}
      `}
      onClick={onEdit}
    >
      {/* Card Header */}
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 flex-1 mr-2">
          {ticket.title}
        </h4>
        <div className="flex space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
            className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
          >
            <Edit2 className="h-3 w-3" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-xs mb-3 line-clamp-3">
        {ticket.description}
      </p>

      {/* Card Footer */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColors[ticket.priority]}`}
        >
          {priorityIcons[ticket.priority]}{' '}
          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
        </span>

        <div className="flex items-center space-x-1 text-gray-500">
          <Clock className="h-3 w-3" />
          <span className="text-xs">{formatDate(ticket.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default KanbanCard
