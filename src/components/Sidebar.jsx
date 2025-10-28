import React from 'react'
import { X, LayoutDashboard, Plus } from 'lucide-react'
import logo from "../assets/logo.png";
const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    // { icon: Plus, label: 'Create Ticket' },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-48 h-10">
                <img
                  src={logo}
                  alt="College Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={index}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors
                    ${item.active
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          
          
        </div>
      </div>
    </>
  )
}

export default Sidebar