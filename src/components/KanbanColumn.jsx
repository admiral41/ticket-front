import React from 'react'
import { Droppable, Draggable } from '@hello-pangea/dnd'
import KanbanCard from './KanbanCard'

const KanbanColumn = ({ columnId, title, color, tickets, onEditTicket, onDeleteTicket }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Column Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        <span className="bg-gray-100 text-gray-600 text-sm font-medium px-2 py-1 rounded-full">
          {tickets.length}
        </span>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              min-h-[200px] p-4 space-y-3 transition-colors
              ${snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-gray-50'}
            `}
          >
            {tickets.map((ticket, index) => (
              <Draggable key={ticket._id} draggableId={ticket._id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <KanbanCard
                      ticket={ticket}
                      isDragging={snapshot.isDragging}
                      onEdit={() => onEditTicket(ticket)}
                      onDelete={onDeleteTicket}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default KanbanColumn