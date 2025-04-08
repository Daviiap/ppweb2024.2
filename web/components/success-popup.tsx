"use client"

import { useEffect } from "react"

interface SuccessPopupProps {
  message: string
  buttonText: string
  onButtonClick: () => void
}

export default function SuccessPopup({ message, buttonText, onButtonClick }: SuccessPopupProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center">{message}</h2>

        <button
          onClick={onButtonClick}
          className="w-full p-3 mt-4 text-white bg-green-400 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}
