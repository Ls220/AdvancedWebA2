"use client"

import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin(ev: any) {
    ev.preventDefault()
    // TODO: Implement login logic here
    console.log("Login:", { email, password })
  }

  return (
    <div className="bg-gray-100 h-screen flex items-center">
      <form className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md" onSubmit={handleLogin}>
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-full focus:outline-none focus:border-primary"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-full focus:outline-none focus:border-primary"
        />
        <button className="w-full px-4 py-2 bg-primary text-white rounded-full">Login</button>
      </form>
    </div>
  )
}

