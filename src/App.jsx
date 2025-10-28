import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Dashboard from './components/Dashboard'
import Loader from './components/Loader'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader />
  }

  return <Dashboard />
}

export default App