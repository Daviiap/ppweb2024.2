"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { User, LogOut, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Organization {
  id: string
  name: string
  description: string
  membersCount?: number
}

export default function OrganizationDetailsPage({ id }: { id: string }) {
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("authToken")

    if (!token) {
      router.push("/login")
      return
    }

    const fetchOrganizationDetails = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API}/organization/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const orgData = response.data

        setOrganization(orgData)
        setLoading(false)
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          localStorage.removeItem("authToken")
          router.push("/login")
        } else {
          setError("Failed to load organization details")
          setLoading(false)
        }
      }
    }

    fetchOrganizationDetails()
  }, [id, router])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")

    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="p-4 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-sm font-light">Your Planning Poker / Organizations / Details</h1>
          <button
            onClick={handleLogout}
            className="flex items-center text-sm text-gray-300 hover:text-white transition-colors"
          >
            <LogOut size={16} className="mr-1" />
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Link
            href="/organizations"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Organizations
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading organization details...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : organization ? (
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center rounded mr-4 bg-green-300 text-black font-bold text-2xl">
                {organization.name.charAt(0).toUpperCase()}
              </div>
              <h1 className="text-3xl font-medium">{organization.name}</h1>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Description</h2>
              <p className="text-gray-300">{organization.description || "No description available."}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Members</h2>
              <div className="flex items-center text-gray-300">
                <User size={18} className="mr-2" />
                <span>{organization.membersCount} members</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <h2 className="text-xl font-medium mb-4">Organization Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 mb-1">Organization ID</p>
                  <p className="font-mono text-sm">{organization.id}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Created</p>
                  <p>April 7, 2025</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">Organization not found</div>
        )}
      </main>
    </div>
  )
}
