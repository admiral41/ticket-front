import React from 'react'
import { format } from 'date-fns'
import { Menu } from 'lucide-react'

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div className="ml-4 lg:ml-0">
              <h1 className="text-xl font-semibold text-gray-900">
                Ticket Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                {format(new Date(), 'EEEE, MMMM do, yyyy')}
              </p>
            </div>
          </div>

          {/* Right Section - Removed Create Ticket button from header */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@college.edu</p>
              </div>
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-700 font-semibold text-sm">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header