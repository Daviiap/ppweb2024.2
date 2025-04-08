"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/login")
    }
  }, [router])

  return {
    isAuthenticated: !!localStorage.getItem("authToken"),
    logout: () => {
      localStorage.removeItem("authToken")
      localStorage.removeItem("user")
      router.push("/login")
    },
    getUser: () => {
      const userStr = localStorage.getItem("user")
      return userStr ? JSON.parse(userStr) : null
    },
  }
}
