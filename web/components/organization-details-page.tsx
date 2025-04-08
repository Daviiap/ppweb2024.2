"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { User, LogOut, ArrowLeft, CreditCard, FolderKanban, Pencil, Save, X } from "lucide-react"
import Link from "next/link"

interface Member {
  user: {
    id: string
    name: string
    email: string
  }
  role: string
}

interface Card {
  id: string
  name: string
  image: string
  owner: string
  visibility: string
}

interface Project {
  id: string
  name: string
  description: string
  members: any[] 
}

interface Organization {
  id: string
  name: string
  description: string
  cards: Card[]
  members: Member[]
  projects: Project[]
}

interface CurrentUser {
  id: string
  name: string
  email: string
}

export default function OrganizationDetailsPage({ id }: { id: string }) {
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [updateLoading, setUpdateLoading] = useState(false)
  const [updateError, setUpdateError] = useState<string | null>(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [isOwner, setIsOwner] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const userStr = localStorage.getItem("user")

    if (!token) {
      router.push("/login")
      return
    }

    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        setCurrentUser(user)
      } catch (e) {
        console.error("Failed to parse user data", e)
      }
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
        setEditName(orgData.name)
        setEditDescription(orgData.description)

        if (userStr) {
          try {
            const user = JSON.parse(userStr)
            const isUserOwner = orgData.members.some(
              (member: Member) => member.user.id === user.id && member.role === "OWNER",
            )
            setIsOwner(isUserOwner)
          } catch (e) {
            console.error("Failed to check owner status", e)
          }
        }

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

  const handleStartEditing = () => {
    setIsEditing(true)
    setUpdateError(null)
    setUpdateSuccess(false)
  }

  const handleCancelEditing = () => {
    if (organization) {
      setEditName(organization.name)
      setEditDescription(organization.description)
    }
    setIsEditing(false)
    setUpdateError(null)
  }

  const handleSaveChanges = async () => {
    if (!organization) return

    setUpdateLoading(true)
    setUpdateError(null)
    setUpdateSuccess(false)

    try {
      const token = localStorage.getItem("authToken")

      if (!token) {
        router.push("/login")
        return
      }

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_API}/organization/${id}`,
        {
          name: editName,
          description: editDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      setOrganization({
        ...organization,
        name: editName,
        description: editDescription,
      })

      setIsEditing(false)
      setUpdateSuccess(true)

      setTimeout(() => {
        setUpdateSuccess(false)
      }, 3000)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setUpdateError(err.response?.data?.message || "Failed to update organization")
      } else {
        setUpdateError("An unexpected error occurred")
      }
    } finally {
      setUpdateLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
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
          <div>
            <div className="bg-gray-900 rounded-lg p-6 mb-8">
              <div className="flex items-start mb-6">
                <div className="w-16 h-16 flex items-center justify-center rounded mr-4 bg-green-300 text-black font-bold text-2xl flex-shrink-0">
                  {organization.name.charAt(0).toUpperCase()}
                </div>

                <div className="flex-grow">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="org-name" className="block text-sm text-gray-400 mb-1">
                          Organization Name
                        </label>
                        <input
                          id="org-name"
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-xl font-medium focus:outline-none focus:border-green-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="org-description" className="block text-sm text-gray-400 mb-1">
                          Description
                        </label>
                        <textarea
                          id="org-description"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          rows={3}
                          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-green-500"
                        />
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveChanges}
                          disabled={updateLoading}
                          className="flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white transition-colors"
                        >
                          {updateLoading ? (
                            "Saving..."
                          ) : (
                            <>
                              <Save size={16} className="mr-1" />
                              Save
                            </>
                          )}
                        </button>

                        <button
                          onClick={handleCancelEditing}
                          className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
                        >
                          <X size={16} className="mr-1" />
                          Cancel
                        </button>
                      </div>

                      {updateError && <div className="text-red-500 text-sm mt-2">{updateError}</div>}
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center">
                        <h1 className="text-3xl font-medium">{organization.name}</h1>
                        {isOwner && (
                          <button
                            onClick={handleStartEditing}
                            className="ml-2 p-1 text-gray-400 hover:text-white transition-colors"
                            aria-label="Edit organization"
                          >
                            <Pencil size={16} />
                          </button>
                        )}
                      </div>
                      <p className="text-gray-300 mt-1">{organization.description}</p>

                      {updateSuccess && (
                        <div className="text-green-500 text-sm mt-2">Organization updated successfully!</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-800 p-4 rounded-lg flex items-center">
                  <User size={20} className="mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Members</p>
                    <p className="text-xl font-medium">{organization.members.length}</p>
                  </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg flex items-center">
                  <CreditCard size={20} className="mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Cards</p>
                    <p className="text-xl font-medium">{organization.cards.length}</p>
                  </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg flex items-center">
                  <FolderKanban size={20} className="mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Projects</p>
                    <p className="text-xl font-medium">{organization.projects.length}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-medium mb-4">Projects</h2>

              {organization.projects.length === 0 ? (
                <div className="text-center py-8 bg-gray-900 rounded-lg">No projects found</div>
              ) : (
                <div className="space-y-px">
                  {organization.projects.map((project, index) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900 hover:bg-gray-800 cursor-pointer rounded-lg mb-2"
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-12 h-12 flex items-center justify-center rounded mr-4 text-black font-bold text-xl ${
                            index % 2 === 0 ? "bg-gray-300" : "bg-green-300"
                          }`}
                        >
                          {project.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-medium">{project.name}</h3>
                          <p className="text-sm text-gray-400 mt-1 line-clamp-1">{project.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-medium mb-4">Members</h2>

              <div className="bg-gray-900 rounded-lg p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-800">
                      <th className="pb-2">Name</th>
                      <th className="pb-2">Email</th>
                      <th className="pb-2">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organization.members.map((member) => (
                      <tr key={member.user.id} className="border-b border-gray-800">
                        <td className="py-3">{member.user.name}</td>
                        <td className="py-3 text-gray-400">{member.user.email}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              member.role === "OWNER" ? "bg-green-900 text-green-300" : "bg-gray-800 text-gray-300"
                            }`}
                          >
                            {member.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6">
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
