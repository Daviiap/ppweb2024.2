"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Search, User, LogOut } from "lucide-react"

interface Member {
  user: {
    id: string
    name: string
    email: string
  }
  role: string
}

interface Organization {
  id: string
  name: string
  description: string
  members?: Member[]
}

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("authToken")

    if (!token) {
      router.push("/login")
      return
    }

    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API}/organizations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setOrganizations(response.data.organizations)
        setLoading(false)
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          localStorage.removeItem("authToken")
          router.push("/login")
        } else {
          setError("Failed to load organizations")
          setLoading(false)
        }
      }
    }

    fetchOrganizations()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")

    router.push("/login")
  }

  const handleOrganizationClick = (orgId: string) => {
    router.push(`/organization/${orgId}`)
  }

  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-4 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-sm font-light">Your Planning Poker / Organizations</h1>
          <button
            onClick={handleLogout}
            className="flex items-center text-sm text-gray-300 hover:text-white transition-colors"
          >
            <LogOut size={16} className="mr-1" />
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-medium mb-8">Organizations</h1>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="search or filter results..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-gray-500"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search size={18} className="text-gray-500" />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading organizations...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : filteredOrganizations.length === 0 ? (
          <div className="text-center py-8">No organizations found</div>
        ) : (
          <div className="space-y-px">
            {filteredOrganizations.map((org, index) => (
              <div
                key={org.id}
                className="flex items-center justify-between p-4 border-b border-gray-800 hover:bg-gray-900 cursor-pointer"
                onClick={() => handleOrganizationClick(org.id)}
              >
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded mr-4 text-black font-bold text-xl ${
                      index % 2 === 0 ? "bg-gray-300" : "bg-green-300"
                    }`}
                  >
                    {org.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-medium">{org.name}</h3>
                    {org.description && <p className="text-sm text-gray-400 mt-1 line-clamp-1">{org.description}</p>}
                  </div>
                </div>
                <div className="flex items-center text-gray-400">
                  <User size={16} className="mr-2" />
                  <span>{org.members ? org.members.length : 0}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
