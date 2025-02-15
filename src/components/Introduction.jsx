import React from 'react'
import { Link } from 'react-router-dom'

const Introduction = () => {
  return (
    <div>
      <button>
        <Link to="/signIn">
            SignUp
        </Link>
      </button>
    </div>
  )
}

export default Introduction
