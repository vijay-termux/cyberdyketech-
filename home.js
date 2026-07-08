document.addEventListener("DOMContentLoaded", () => {
  const postsData = [
    {
      id: 1,
      authorName: "Arjun Sharma",
      authorTitle: "Software Engineer at Google | Startup Founder",
      authorAvatar: "https://i.pravatar.cc/150?u=arjun",
      content:
        "Excited to share a project I've been working on! Building an AI-powered study assistant for students. #OpenSource #StudentSuccess #AI",
      reactions: 42,
      commentsCount: 8,
      sharesCount: 5,
      isReacted: false,
      timestamp: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      authorName: "Priya Kumari",
      authorTitle: "Medical Student at AIIMS",
      authorAvatar: "https://i.pravatar.cc/150?u=priya",
      content:
        "Just finished my final exams for the semester! 🩺 The journey has been challenging but incredibly rewarding. #MedStudent #AIIMS #FinalsDone",
      reactions: 112,
      commentsCount: 15,
      sharesCount: 9,
      isReacted: false,
      timestamp: "2024-01-14T15:45:00Z",
    },
  ]

  const suggestedUsersData = [
    {
      id: 1,
      name: "Priya Kumari",
      title: "Medical Student at AIIMS",
      avatar: "https://i.pravatar.cc/150?u=priya",
      status: "none",
    },
    {
      id: 2,
      name: "Rahul Gupta",
      title: "Startup Founder | Ex-Microsoft",
      avatar: "https://i.pravatar.cc/150?u=rahul",
      status: "none",
    },
    {
      id: 3,
      name: "Sneha Patel",
      title: "Data Scientist at Amazon",
      avatar: "https://i.pravatar.cc/150?u=sneha",
      status: "none",
    },
  ]

  const communitiesData = [
    {
      id: 1,
      name: "AI & Machine Learning",
      members: 1250,
      category: "Technology",
    },
    {
      id: 2,
      name: "Startup Founders",
      members: 890,
      category: "Business",
    },
    {
      id: 3,
      name: "Medical Students",
      members: 2100,
      category: "Education",
    },
  ]

  const feedContainer = document.getElementById("feedContainer")
  const suggestionsContainer = document.getElementById("suggestionsContainer")
  const communitiesContainer = document.getElementById("communitiesContainer")
  const postInput = document.getElementById("post-input")
  const postSubmitBtn = document.getElementById("post-submit-btn")

  // Declare variables before using them
  const currentUser = {
    name: "John Doe",
    title: "Software Developer",
    avatar: "https://i.pravatar.cc/150?u=john",
  }

  const showToast = (message) => {
    alert(message)
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  // Global functions for button handlers
  window.handleReact = (postId) => {
    const post = postsData.find((p) => p.id === postId)
    if (post) {
      if (post.isReacted) {
        post.reactions--
        post.isReacted = false
        showToast("Reaction removed")
      } else {
        post.reactions++
        post.isReacted = true
        showToast("Post liked!")
      }
      renderFeed()
    }
  }

  window.handleLinkUp = (userId) => {
    const user = suggestedUsersData.find((u) => u.id === userId)
    if (user) {
      user.status = "pending"
      showToast(`LinkUp request sent to ${user.name}`)
      renderSuggestions()
    }
  }

  const handleCreatePost = () => {
    const postContent = postInput.value.trim()
    if (postContent) {
      const newPost = {
        id: Date.now(),
        authorName: currentUser.name,
        authorTitle: currentUser.title,
        authorAvatar: currentUser.avatar,
        content: postContent,
        reactions: 0,
        commentsCount: 0,
        sharesCount: 0,
        isReacted: false,
        timestamp: new Date().toISOString(),
      }

      postsData.unshift(newPost)
      postInput.value = ""
      renderFeed()
      showToast("Post created successfully!")
    }
  }

  const renderFeed = () => {
    if (!feedContainer) return

    feedContainer.innerHTML = ""
    postsData.forEach((post) => {
      const postElement = document.createElement("article")
      postElement.className = "card post-card"
      postElement.innerHTML = `
                <div class="post-header">
                    <img src="${post.authorAvatar}" alt="${post.authorName}" class="avatar">
                    <div class="post-author-info">
                        <h4>${post.authorName}</h4>
                        <p>${post.authorTitle} • ${formatDate(post.timestamp)}</p>
                    </div>
                    <button class="btn-ghost">⋯</button>
                </div>
                <p class="post-content">${post.content}</p>
                <div class="post-stats">
                    <span>👍 ${post.reactions}</span>
                    <span>${post.commentsCount} Comments • ${post.sharesCount} Shares</span>
                </div>
                <div class="post-actions">
                    <button class="btn-ghost ${post.isReacted ? "active" : ""}" onclick="handleReact(${post.id})">
                        👍 ${post.isReacted ? "Liked" : "Like"}
                    </button>
                    <button class="btn-ghost">💬 Comment</button>
                    <button class="btn-ghost">↪️ Share</button>
                </div>
            `
      feedContainer.appendChild(postElement)
    })
  }

  const renderSuggestions = () => {
    if (!suggestionsContainer) return

    suggestionsContainer.innerHTML = ""
    suggestedUsersData.slice(0, 3).forEach((user) => {
      const userElement = document.createElement("div")
      userElement.className = "list-item"

      let buttonHTML
      if (user.status === "none") {
        buttonHTML = `<button class="btn btn-secondary" style="padding: 0.3rem 0.8rem;" onclick="handleLinkUp(${user.id})">LinkUp</button>`
      } else {
        buttonHTML = `<button class="btn btn-secondary" style="padding: 0.3rem 0.8rem;" disabled>Pending</button>`
      }

      userElement.innerHTML = `
                <img src="${user.avatar}" alt="${user.name}" class="avatar" style="width: 40px; height: 40px;">
                <div class="list-item-info">
                    <h4>${user.name}</h4>
                    <p>${user.title}</p>
                </div>
                ${buttonHTML}
            `
      suggestionsContainer.appendChild(userElement)
    })
  }

  const renderCommunities = () => {
    if (!communitiesContainer) return

    communitiesContainer.innerHTML = ""
    communitiesData.slice(0, 3).forEach((community) => {
      const communityElement = document.createElement("div")
      communityElement.className = "list-item"
      communityElement.innerHTML = `
                <div style="width: 40px; height: 40px; background: var(--primary); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                    ${community.name.charAt(0)}
                </div>
                <div class="list-item-info">
                    <h4>${community.name}</h4>
                    <p>${community.members} members</p>
                </div>
                <button class="btn btn-secondary" style="padding: 0.3rem 0.8rem;">Join</button>
            `
      communitiesContainer.appendChild(communityElement)
    })
  }

  // Notification simulation
  const checkNotifications = () => {
    const messengerNotification = document.getElementById("messenger-notification")
    const notificationDot = document.getElementById("notification-dot")

    // Simulate notifications
    const hasUnread = localStorage.getItem("hasUnreadMessages") === "true"
    if (messengerNotification && hasUnread) {
      messengerNotification.style.display = "block"
    }

    if (notificationDot) {
      notificationDot.style.display = "block"
    }
  }

  // Simulate receiving notifications
  setTimeout(() => {
    localStorage.setItem("hasUnreadMessages", "true")
    checkNotifications()
  }, 5000)

  // Event listeners
  if (postSubmitBtn) {
    postSubmitBtn.addEventListener("click", handleCreatePost)
  }

  if (postInput) {
    postInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleCreatePost()
      }
    })
  }

  // Initialize renders
  renderFeed()
  renderSuggestions()
  renderCommunities()
  checkNotifications()
})
