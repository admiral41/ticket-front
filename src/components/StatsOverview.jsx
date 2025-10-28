import React from 'react'
import { Ticket, Clock, CheckCircle, Archive } from 'lucide-react'

const StatsOverview = ({ tickets }) => {
  const stats = {
    total: tickets.length,
    open: tickets.filter(ticket => ticket.status === 'open').length,
    inProgress: tickets.filter(ticket => ticket.status === 'in_progress').length,
    resolved: tickets.filter(ticket => ticket.status === 'resolved').length,
    closed: tickets.filter(ticket => ticket.status === 'closed').length,
  }

  const statCards = [
    {
      label: 'Total Tickets',
      value: stats.total,
      icon: Ticket,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      label: 'Open',
      value: stats.open,
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    },
    {
      label: 'Resolved',
      value: stats.resolved,
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      label: 'Closed',
      value: stats.closed,
      icon: Archive,
      color: 'bg-gray-500',
      textColor: 'text-gray-600'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                <Icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StatsOverview