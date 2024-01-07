import React from 'react'

const Home = () => {
  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="display-4 fw-bold mb-4">
            Welcome to Railway Reservation System
          </h1>
          <p className="lead text-dark mb-4">
            This is a simple Railway Reservation System. You can manage tickets,
            reservations, employees, customers, etc.
          </p>
          <p className="lead text-dark mb-5">
            Start exploring the system by navigating through the dashboard!
          </p>
        </div>
      </div>
  )
}

export default Home