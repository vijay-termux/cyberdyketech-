// Global variables and utility functions
const API_BASE_URL = "/api"
const currentUser = {
  id: 1,
  name: "Your Name",
  title: "Student at Gemini University",
  avatar: "https://i.pravatar.cc/150?u=currentUser",
}

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
  return date.toLocaleDateString()
}

function showToast(message, type = "success") {
  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`
  toast.textContent = message
  toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === "success" ? "var(--success)" : "var(--danger)"};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `

  document.body.appendChild(toast)
  setTimeout(() => {
    toast.remove()
  }, 3000)
}

// API functions
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API call failed:", error)
    showToast("Something went wrong. Please try again.", "error")
    throw error
  }
}

// Navigation helpers
function setActiveNavItem(page) {
  const navItems = document.querySelectorAll(".bottom-navbar a")
  navItems.forEach((item) => {
    item.classList.remove("active")
    if (item.getAttribute("href") === page) {
      item.classList.add("active")
    }
  })
}

// Modal helpers
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
}

// Initialize common functionality
document.addEventListener("DOMContentLoaded", () => {
  // Set active nav item based on current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  setActiveNavItem(currentPage)

  // Add click handlers for modal close buttons
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-close") || e.target.classList.contains("modal")) {
      const modal = e.target.closest(".modal")
      if (modal) {
        modal.classList.remove("active")
        document.body.style.overflow = "auto"
      }
    }
  })

  // Handle form submissions
  document.addEventListener("submit", (e) => {
    e.preventDefault()
    // Form handling will be implemented in individual page scripts
  })
})
