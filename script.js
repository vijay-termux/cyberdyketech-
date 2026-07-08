// User management and role-based access control
class UserManager {
  constructor() {
    this.currentUser = null
    this.mentorshipPrograms = []
    this.founderSessions = []
    this.init()
  }

  init() {
    // Show login modal on page load if no user is logged in
    const storedUser = localStorage.getItem("currentUser")
    if (!storedUser) {
      this.showLoginModal()
    } else {
      this.currentUser = JSON.parse(storedUser)
      this.setupDashboard()
    }

    this.setupEventListeners()
    this.loadStoredData()
  }

  setupEventListeners() {
    // Login form
    document.getElementById("loginForm").addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleLogin()
    })

    // Mentorship form
    document.getElementById("mentorshipForm").addEventListener("submit", (e) => {
      e.preventDefault()
      this.createMentorshipProgram()
    })

    // Session form
    document.getElementById("sessionForm").addEventListener("submit", (e) => {
      e.preventDefault()
      this.createFounderSession()
    })
  }

  showLoginModal() {
    document.getElementById("loginModal").style.display = "flex"
    document.getElementById("dashboard").classList.add("hidden")
  }

  handleLogin() {
    const email = document.getElementById("email").value
    const role = document.getElementById("userRole").value

    // Simple validation
    if (!email || !role) {
      alert("Please fill in all fields")
      return
    }

    // Set current user
    this.currentUser = {
      email: email,
      role: role,
      name: email.split("@")[0], // Use email prefix as name
    }

    // Hide login modal and show dashboard
    document.getElementById("loginModal").style.display = "none"
    document.getElementById("dashboard").classList.remove("hidden")

    // Setup dashboard based on role
    this.setupDashboard()

    // Save to localStorage
    localStorage.setItem("currentUser", JSON.stringify(this.currentUser))
  }

  setupDashboard() {
    // Update welcome message
    document.getElementById("userWelcome").textContent = `Welcome, ${this.currentUser.name} (${this.currentUser.role})`

    // Show/hide role-specific tabs and actions
    this.updateRoleBasedAccess()

    // Load content
    this.loadMentorshipPrograms()
    this.loadFounderSessions()

    loadDashboardData()
  }

  updateRoleBasedAccess() {
    const mentorshipTab = document.getElementById("mentorshipTab")
    const founderSessionsTab = document.getElementById("founderSessionsTab")

    // Get all role-specific elements
    const roleSpecificElements = document.querySelectorAll(".role-specific")
    const roleActionElements = document.querySelectorAll(".role-action")

    // Show special tabs and actions only for founders and mentors
    if (this.currentUser.role === "founder" || this.currentUser.role === "mentor") {
      // Show tabs
      if (mentorshipTab) mentorshipTab.classList.remove("hidden")
      if (founderSessionsTab) founderSessionsTab.classList.remove("hidden")

      // Show role-specific elements (bottom nav items, etc.)
      roleSpecificElements.forEach((element) => {
        element.classList.remove("hidden")
      })

      // Show create/edit buttons
      roleActionElements.forEach((element) => {
        element.classList.remove("hidden")
      })
    } else {
      // Hide for students
      if (mentorshipTab) mentorshipTab.classList.add("hidden")
      if (founderSessionsTab) founderSessionsTab.classList.add("hidden")

      roleSpecificElements.forEach((element) => {
        element.classList.add("hidden")
      })

      roleActionElements.forEach((element) => {
        element.classList.add("hidden")
      })
    }
  }

  canAccessFeature(feature) {
    const role = this.currentUser?.role

    switch (feature) {
      case "mentorship":
      case "founders":
      case "founder-sessions":
        return role === "founder" || role === "mentor"
      default:
        return true
    }
  }

  createMentorshipProgram() {
    if (!this.canAccessFeature("mentorship")) {
      alert("Access denied: Only founders and mentors can create mentorship programs")
      return
    }

    const title = document.getElementById("mentorshipTitle").value
    const description = document.getElementById("mentorshipDescription").value
    const duration = document.getElementById("mentorshipDuration").value
    const capacity = document.getElementById("mentorshipCapacity").value

    const program = {
      id: Date.now(),
      title,
      description,
      duration,
      capacity,
      creator: this.currentUser.name,
      creatorRole: this.currentUser.role,
      createdAt: new Date().toISOString(),
      participants: 0,
    }

    this.mentorshipPrograms.push(program)
    this.saveMentorshipPrograms()
    this.loadMentorshipPrograms()
    this.closeModal("createMentorshipModal")

    // Reset form
    document.getElementById("mentorshipForm").reset()
  }

  createFounderSession() {
    if (!this.canAccessFeature("founder-sessions")) {
      alert("Access denied: Only founders and mentors can create founder sessions")
      return
    }

    const title = document.getElementById("sessionTitle").value
    const description = document.getElementById("sessionDescription").value
    const date = document.getElementById("sessionDate").value
    const type = document.getElementById("sessionType").value

    const session = {
      id: Date.now(),
      title,
      description,
      date,
      type,
      creator: this.currentUser.name,
      creatorRole: this.currentUser.role,
      createdAt: new Date().toISOString(),
      attendees: 0,
    }

    this.founderSessions.push(session)
    this.saveFounderSessions()
    this.loadFounderSessions()
    this.closeModal("createSessionModal")

    // Reset form
    document.getElementById("sessionForm").reset()
  }

  loadMentorshipPrograms() {
    const grid = document.getElementById("mentorshipGrid")

    if (this.mentorshipPrograms.length === 0) {
      grid.innerHTML =
        '<div class="card"><p class="text-center">No mentorship programs yet. Create your first one!</p></div>'
      return
    }

    grid.innerHTML = this.mentorshipPrograms
      .map(
        (program) => `
            <div class="mentorship-card">
                <div class="card-header">
                    <div>
                        <h4 class="card-title">${program.title}</h4>
                        <div class="card-meta">
                            By ${program.creator} • Created ${new Date(program.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                    <span class="role-badge">${program.creatorRole}</span>
                </div>
                <p>${program.description}</p>
                <div class="mentorship-meta">
                    <span>Duration: ${program.duration} weeks</span>
                    <span>Participants: ${program.participants}/${program.capacity}</span>
                </div>
                <div class="mentorship-actions">
                    ${
                      this.currentUser.name === program.creator
                        ? `<button class="btn btn-sm btn-secondary" onclick="userManager.editProgram(${program.id})">Edit</button>
                         <button class="btn btn-sm btn-danger" onclick="userManager.deleteProgram(${program.id})">Delete</button>`
                        : `<button class="btn btn-sm btn-primary">Join Program</button>`
                    }
                </div>
            </div>
        `,
      )
      .join("")
  }

  loadFounderSessions() {
    const grid = document.getElementById("sessionsGrid")

    if (this.founderSessions.length === 0) {
      grid.innerHTML =
        '<div class="card"><p class="text-center">No founder sessions scheduled. Create your first one!</p></div>'
      return
    }

    grid.innerHTML = this.founderSessions
      .map(
        (session) => `
            <div class="session-card">
                <div class="card-header">
                    <div>
                        <h4 class="card-title">${session.title}</h4>
                        <div class="card-meta">
                            ${session.type} • By ${session.creator}
                        </div>
                    </div>
                    <span class="role-badge">${session.creatorRole}</span>
                </div>
                <p>${session.description}</p>
                <div class="session-meta">
                    <span>📅 ${new Date(session.date).toLocaleDateString()}</span>
                    <span>⏰ ${new Date(session.date).toLocaleTimeString()}</span>
                    <span>👥 ${session.attendees}/50 attendees</span>
                </div>
                <div class="session-actions">
                    ${
                      this.currentUser.name === session.creator
                        ? `<button class="btn btn-sm btn-secondary" onclick="userManager.editSession(${session.id})">Edit</button>
                         <button class="btn btn-sm btn-danger" onclick="userManager.deleteSession(${session.id})">Delete</button>`
                        : `<button class="btn btn-sm btn-primary">Register</button>`
                    }
                </div>
            </div>
        `,
      )
      .join("")
  }

  deleteProgram(id) {
    if (confirm("Are you sure you want to delete this mentorship program?")) {
      this.mentorshipPrograms = this.mentorshipPrograms.filter((p) => p.id !== id)
      this.saveMentorshipPrograms()
      this.loadMentorshipPrograms()
    }
  }

  deleteSession(id) {
    if (confirm("Are you sure you want to delete this founder session?")) {
      this.founderSessions = this.founderSessions.filter((s) => s.id !== id)
      this.saveFounderSessions()
      this.loadFounderSessions()
    }
  }

  saveMentorshipPrograms() {
    localStorage.setItem("mentorshipPrograms", JSON.stringify(this.mentorshipPrograms))
  }

  saveFounderSessions() {
    localStorage.setItem("founderSessions", JSON.stringify(this.founderSessions))
  }

  loadStoredData() {
    // Load stored user
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser)
      document.getElementById("loginModal").style.display = "none"
      document.getElementById("dashboard").classList.remove("hidden")
      this.setupDashboard()
    }

    // Load stored programs and sessions
    const storedPrograms = localStorage.getItem("mentorshipPrograms")
    if (storedPrograms) {
      this.mentorshipPrograms = JSON.parse(storedPrograms)
    }

    const storedSessions = localStorage.getItem("founderSessions")
    if (storedSessions) {
      this.founderSessions = JSON.parse(storedSessions)
    }
  }

  closeModal(modalId) {
    document.getElementById(modalId).style.display = "none"
  }
}

function showTab(tabName) {
  // Check access for role-specific tabs
  if ((tabName === "mentorship" || tabName === "founders") && !userManager.canAccessFeature(tabName)) {
    alert("Access denied: This feature is only available to founders and mentors")
    return
  }

  // Hide all tab contents
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Remove active class from all tab buttons
  document.querySelectorAll(".tab-button").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Remove active class from all bottom nav items
  document.querySelectorAll(".bottom-nav-item").forEach((item) => {
    item.classList.remove("active")
  })

  // Show selected tab content
  const selectedTab = document.getElementById(tabName)
  if (selectedTab) {
    selectedTab.classList.add("active")
  }

  // Add active class to clicked tab button
  const clickedButton = event?.target?.closest(".tab-button")
  if (clickedButton) {
    clickedButton.classList.add("active")
  }

  // Add active class to bottom nav item
  const activeBottomNavItem = document.querySelector(`.bottom-nav-item[onclick*="${tabName}"]`)
  if (activeBottomNavItem) {
    activeBottomNavItem.classList.add("active")
  }
}

// Modal functions
function openCreateMentorshipModal() {
  if (!userManager.canAccessFeature("mentorship")) {
    alert("Access denied: Only founders and mentors can create mentorship programs")
    return
  }
  document.getElementById("createMentorshipModal").style.display = "flex"
}

function openCreateSessionModal() {
  if (!userManager.canAccessFeature("founder-sessions")) {
    alert("Access denied: Only founders and mentors can create founder sessions")
    return
  }
  document.getElementById("createSessionModal").style.display = "flex"
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none"
}

function logout() {
  localStorage.removeItem("currentUser")
  location.reload()
}

// Initialize the application
const userManager = new UserManager()

// Close modals when clicking outside
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none"
  }
})

// Comprehensive dashboard data and rendering functions
const dashboardData = {
  user: {
    firstName: "Alex", // Example user
  },

  stats: {
    posts: 12,
    followers: 234,
    profileViews: 89,
  },

  recentActivity: [
    {
      id: "1",
      type: "like",
      user: { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=1" },
      content: "liked your post about machine learning",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "follow",
      user: { name: "Marcus Johnson", avatar: "https://i.pravatar.cc/150?img=2" },
      content: "started following you",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      type: "comment",
      user: { name: "Dr. Emily Rodriguez", avatar: "https://i.pravatar.cc/150?img=3" },
      content: "commented on your startup idea post",
      timestamp: "1 day ago",
    },
    {
      id: "4",
      type: "job_application",
      user: { name: "TechCorp", avatar: "https://i.pravatar.cc/150?img=4" },
      content: "viewed your application for Software Engineer Intern",
      timestamp: "2 days ago",
    },
  ],

  recommendations: [
    {
      id: "1",
      type: "job",
      title: "Frontend Developer Intern",
      description: "Join our team building the next generation of web applications",
      company: "TechStart Inc.",
      location: "San Francisco, CA",
      badge: "New",
    },
    {
      id: "2",
      type: "person",
      title: "Alex Thompson",
      description: "Senior Software Engineer at Google • Mentor",
      image: "https://i.pravatar.cc/150?img=5",
      badge: "Recommended",
    },
    {
      id: "3",
      type: "community",
      title: "AI & Machine Learning",
      description: "Connect with 2.3k students and professionals in AI",
      badge: "Trending",
    },
    {
      id: "4",
      type: "mentor",
      title: "Jessica Park",
      description: "Startup Founder • 5+ years experience • Available for mentorship",
      image: "https://i.pravatar.cc/150?img=6",
      badge: "Available",
    },
  ],
}

// Dashboard rendering functions
function renderStats() {
  const statsContainer = document.getElementById("stats-container")
  if (!statsContainer) return

  statsContainer.innerHTML = `
    <div class="card"><div class="stats-card"><div><p class="text-muted">Posts</p><p class="text-2xl">${dashboardData.stats.posts}</p></div><span class="icon"><i data-lucide="share-2"></i></span></div></div>
    <div class="card"><div class="stats-card"><div><p class="text-muted">Followers</p><p class="text-2xl">${dashboardData.stats.followers}</p></div><span class="icon"><i data-lucide="users"></i></span></div></div>
    <div class="card"><div class="stats-card"><div><p class="text-muted">Profile Views</p><p class="text-2xl">${dashboardData.stats.profileViews}</p></div><span class="icon"><i data-lucide="eye"></i></span></div></div>
  `
}

function getActivityIcon(type) {
  const icons = {
    like: `<i data-lucide="heart" style="color: #ef4444;"></i>`,
    comment: `<i data-lucide="message-square" style="color: #3b82f6;"></i>`,
    follow: `<i data-lucide="users" style="color: #22c55e;"></i>`,
    job_application: `<i data-lucide="briefcase" style="color: #8b5cf6;"></i>`,
  }
  return icons[type] || `<i data-lucide="bell"></i>`
}

function renderActivity() {
  const activityList = document.getElementById("recent-activity-list")
  if (!activityList) return

  let activityHTML = ""
  dashboardData.recentActivity.forEach((activity) => {
    activityHTML += `
      <div class="activity-item">
        <div class="avatar"><img src="${activity.user.avatar}" alt="${activity.user.name}"></div>
        <div class="activity-content">
          <p style="display: flex; align-items: center; gap: 0.5rem;">
            ${getActivityIcon(activity.type)}
            <span><span class="font-medium">${activity.user.name}</span> ${activity.content}</span>
          </p>
          <div class="activity-timestamp">
            <i data-lucide="clock" style="width: 0.75rem; height: 0.75rem;"></i>
            <span>${activity.timestamp}</span>
          </div>
        </div>
      </div>
    `
  })
  activityList.innerHTML = activityHTML
}

function getRecommendationIcon(type) {
  const icons = {
    job: `<i data-lucide="briefcase" style="color: #2563eb;"></i>`,
    person: `<i data-lucide="users" style="color: #16a34a;"></i>`,
    community: `<i data-lucide="message-circle" style="color: #7c3aed;"></i>`,
    mentor: `<i data-lucide="award" style="color: #d97706;"></i>`,
  }
  return icons[type] || `<i data-lucide="target"></i>`
}

function renderRecommendations() {
  const recommendationsList = document.getElementById("recommendations-list")
  if (!recommendationsList) return

  let recommendationsHTML = ""
  dashboardData.recommendations.forEach((rec) => {
    recommendationsHTML += `
      <div class="recommendation-item">
        <div class="recommendation-icon-wrapper">
          ${rec.image ? `<div class="avatar" style="width:2.5rem; height:2.5rem;"><img src="${rec.image}" alt="${rec.title}"></div>` : getRecommendationIcon(rec.type)}
        </div>
        <div class="recommendation-content">
          <div class="rec-header">
            <h4 class="rec-title">${rec.title}</h4>
            ${rec.badge ? `<span class="badge">${rec.badge}</span>` : ""}
          </div>
          <p class="text-muted">${rec.description}</p>
          ${
            rec.company || rec.location
              ? `
          <div class="rec-meta">
            ${rec.company ? `<span><i data-lucide="building-2" style="width:0.75rem; height:0.75rem; vertical-align: middle;"></i> ${rec.company}</span>` : ""}
            ${rec.location ? `<span><i data-lucide="map-pin" style="width:0.75rem; height:0.75rem; vertical-align: middle;"></i> ${rec.location}</span>` : ""}
          </div>
          `
              : ""
          }
        </div>
      </div>
    `
  })
  recommendationsList.innerHTML = recommendationsHTML
}

// Dashboard data loading function
function loadDashboardData() {
  const loader = document.getElementById("loader")
  const dashboardContent = document.getElementById("dashboard-content")
  const welcomeMessage = document.getElementById("welcome-message")

  // Simulate loading delay
  setTimeout(() => {
    if (welcomeMessage && userManager.currentUser) {
      welcomeMessage.textContent = `Welcome back, ${userManager.currentUser.name}! 👋`
    }

    renderStats()
    renderActivity()
    renderRecommendations()

    // This is crucial: It renders the icon placeholders into actual SVGs
    // Declare lucide variable before using it
    const lucide = window.lucide
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }

    // Hide loader and show content
    if (loader) loader.style.display = "none"
    if (dashboardContent) dashboardContent.style.visibility = "visible"
  }, 500) // 0.5 second delay
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize dashboard data if user is already logged in
  setTimeout(() => {
    if (userManager.currentUser) {
      loadDashboardData()
    }
  }, 1000)
})
