(cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF'
diff --git a/script.js b/script.js
--- a/script.js
+++ b/script.js
@@ -0,0 +1,299 @@
+// Data storage
+let portfolioData = [];
+let blogData = [];
+
+// Load data from localStorage or use defaults
+function loadData() {
+    const savedPortfolio = localStorage.getItem('portfolioData');
+    const savedBlog = localStorage.getItem('blogData');
+    
+    portfolioData = savedPortfolio ? JSON.parse(savedPortfolio) : [
+        {
+            id: 1,
+            title: "Corporate Video",
+            description: "Professional corporate video showcasing company values",
+            image: "https://via.placeholder.com/400x200/3498db/ffffff?text=Corporate+Video",
+            videoUrl: "#",
+            category: "Corporate"
+        },
+        {
+            id: 2,
+            title: "Wedding Highlights",
+            description: "Beautiful wedding day captured and edited",
+            image: "https://via.placeholder.com/400x200/e74c3c/ffffff?text=Wedding+Video",
+            videoUrl: "#",
+            category: "Wedding"
+        },
+        {
+            id: 3,
+            title: "Music Video",
+            description: "Creative music video with artistic editing",
+            image: "https://via.placeholder.com/400x200/2ecc71/ffffff?text=Music+Video",
+            videoUrl: "#",
+            category: "Music"
+        }
+    ];
+    
+    blogData = savedBlog ? JSON.parse(savedBlog) : [
+        {
+            id: 1,
+            title: "5 Tips for Better Video Editing",
+            excerpt: "Learn essential techniques to improve your video editing skills",
+            content: "Video editing is both an art and a science. Here are five essential tips...",
+            image: "https://via.placeholder.com/400x200/9b59b6/ffffff?text=Editing+Tips",
+            date: "2024-01-15",
+            author: "Video Editor"
+        },
+        {
+            id: 2,
+            title: "Choosing the Right Software",
+            excerpt: "A comprehensive guide to video editing software options",
+            content: "With so many video editing software options available, it can be overwhelming...",
+            image: "https://via.placeholder.com/400x200/f39c12/ffffff?text=Software+Guide",
+            date: "2024-01-10",
+            author: "Video Editor"
+        }
+    ];
+    
+    saveData();
+}
+
+// Save data to localStorage
+function saveData() {
+    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
+    localStorage.setItem('blogData', JSON.stringify(blogData));
+}
+
+// Load portfolio items
+function loadPortfolio() {
+    const portfolioGrid = document.getElementById('portfolioGrid');
+    if (!portfolioGrid) return;
+    
+    portfolioGrid.innerHTML = '';
+    
+    portfolioData.slice(0, 3).forEach(item => {
+        const portfolioItem = document.createElement('div');
+        portfolioItem.className = 'portfolio-item';
+        portfolioItem.innerHTML = `
+            <img src="${item.image}" alt="${item.title}">
+            <div class="portfolio-content">
+                <h3>${item.title}</h3>
+                <p>${item.description}</p>
+            </div>
+        `;
+        portfolioGrid.appendChild(portfolioItem);
+    });
+}
+
+// Load blog posts
+function loadBlog() {
+    const blogGrid = document.getElementById('blogGrid');
+    if (!blogGrid) return;
+    
+    blogGrid.innerHTML = '';
+    
+    blogData.slice(0, 3).forEach(post => {
+        const blogItem = document.createElement('div');
+        blogItem.className = 'blog-item';
+        blogItem.innerHTML = `
+            <img src="${post.image}" alt="${post.title}">
+            <div class="blog-content">
+                <h3>${post.title}</h3>
+                <p>${post.excerpt}</p>
+                <div class="blog-meta">${post.date} • ${post.author}</div>
+            </div>
+        `;
+        blogGrid.appendChild(blogItem);
+    });
+}
+
+// Admin functions
+function showAdminTab(tabName) {
+    // Hide all tabs
+    const tabs = document.querySelectorAll('.admin-content');
+    tabs.forEach(tab => tab.classList.remove('active'));
+    
+    // Remove active class from all tab buttons
+    const tabButtons = document.querySelectorAll('.admin-tab');
+    tabButtons.forEach(btn => btn.classList.remove('active'));
+    
+    // Show selected tab
+    document.getElementById(tabName).classList.add('active');
+    event.target.classList.add('active');
+    
+    // Load appropriate data
+    if (tabName === 'portfolio-admin') {
+        loadPortfolioAdmin();
+    } else if (tabName === 'blog-admin') {
+        loadBlogAdmin();
+    }
+}
+
+function loadPortfolioAdmin() {
+    const container = document.getElementById('portfolioList');
+    if (!container) return;
+    
+    container.innerHTML = '';
+    
+    portfolioData.forEach(item => {
+        const itemCard = document.createElement('div');
+        itemCard.className = 'item-card';
+        itemCard.innerHTML = `
+            <h3>${item.title}</h3>
+            <p>${item.description}</p>
+            <p><strong>Category:</strong> ${item.category}</p>
+            <div class="item-actions">
+                <button class="btn" onclick="editPortfolioItem(${item.id})">Edit</button>
+                <button class="btn btn-danger" onclick="deletePortfolioItem(${item.id})">Delete</button>
+            </div>
+        `;
+        container.appendChild(itemCard);
+    });
+}
+
+function loadBlogAdmin() {
+    const container = document.getElementById('blogList');
+    if (!container) return;
+    
+    container.innerHTML = '';
+    
+    blogData.forEach(post => {
+        const itemCard = document.createElement('div');
+        itemCard.className = 'item-card';
+        itemCard.innerHTML = `
+            <h3>${post.title}</h3>
+            <p>${post.excerpt}</p>
+            <p><strong>Date:</strong> ${post.date} | <strong>Author:</strong> ${post.author}</p>
+            <div class="item-actions">
+                <button class="btn" onclick="editBlogPost(${post.id})">Edit</button>
+                <button class="btn btn-danger" onclick="deleteBlogPost(${post.id})">Delete</button>
+            </div>
+        `;
+        container.appendChild(itemCard);
+    });
+}
+
+function addPortfolioItem() {
+    const title = document.getElementById('portfolioTitle').value;
+    const description = document.getElementById('portfolioDescription').value;
+    const image = document.getElementById('portfolioImage').value;
+    const videoUrl = document.getElementById('portfolioVideo').value;
+    const category = document.getElementById('portfolioCategory').value;
+    
+    if (!title || !description) {
+        alert('Please fill in all required fields');
+        return;
+    }
+    
+    const newItem = {
+        id: Date.now(),
+        title,
+        description,
+        image: image || 'https://via.placeholder.com/400x200/3498db/ffffff?text=Portfolio+Item',
+        videoUrl,
+        category
+    };
+    
+    portfolioData.push(newItem);
+    saveData();
+    loadPortfolioAdmin();
+    
+    // Clear form
+    document.getElementById('portfolioForm').reset();
+    alert('Portfolio item added successfully!');
+}
+
+function addBlogPost() {
+    const title = document.getElementById('blogTitle').value;
+    const excerpt = document.getElementById('blogExcerpt').value;
+    const content = document.getElementById('blogContent').value;
+    const image = document.getElementById('blogImage').value;
+    const author = document.getElementById('blogAuthor').value;
+    
+    if (!title || !excerpt || !content) {
+        alert('Please fill in all required fields');
+        return;
+    }
+    
+    const newPost = {
+        id: Date.now(),
+        title,
+        excerpt,
+        content,
+        image: image || 'https://via.placeholder.com/400x200/9b59b6/ffffff?text=Blog+Post',
+        date: new Date().toISOString().split('T')[0],
+        author: author || 'Video Editor'
+    };
+    
+    blogData.push(newPost);
+    saveData();
+    loadBlogAdmin();
+    
+    // Clear form
+    document.getElementById('blogForm').reset();
+    alert('Blog post added successfully!');
+}
+
+function deletePortfolioItem(id) {
+    if (confirm('Are you sure you want to delete this portfolio item?')) {
+        portfolioData = portfolioData.filter(item => item.id !== id);
+        saveData();
+        loadPortfolioAdmin();
+    }
+}
+
+function deleteBlogPost(id) {
+    if (confirm('Are you sure you want to delete this blog post?')) {
+        blogData = blogData.filter(post => post.id !== id);
+        saveData();
+        loadBlogAdmin();
+    }
+}
+
+function editPortfolioItem(id) {
+    const item = portfolioData.find(item => item.id === id);
+    if (item) {
+        document.getElementById('portfolioTitle').value = item.title;
+        document.getElementById('portfolioDescription').value = item.description;
+        document.getElementById('portfolioImage').value = item.image;
+        document.getElementById('portfolioVideo').value = item.videoUrl;
+        document.getElementById('portfolioCategory').value = item.category;
+        
+        // Remove the item from the array
+        portfolioData = portfolioData.filter(item => item.id !== id);
+        saveData();
+        loadPortfolioAdmin();
+    }
+}
+
+function editBlogPost(id) {
+    const post = blogData.find(post => post.id === id);
+    if (post) {
+        document.getElementById('blogTitle').value = post.title;
+        document.getElementById('blogExcerpt').value = post.excerpt;
+        document.getElementById('blogContent').value = post.content;
+        document.getElementById('blogImage').value = post.image;
+        document.getElementById('blogAuthor').value = post.author;
+        
+        // Remove the post from the array
+        blogData = blogData.filter(post => post.id !== id);
+        saveData();
+        loadBlogAdmin();
+    }
+}
+
+// Initialize the application
+document.addEventListener('DOMContentLoaded', function() {
+    loadData();
+    loadPortfolio();
+    loadBlog();
+    
+    // Set up admin tab switching
+    const adminTabs = document.querySelectorAll('.admin-tab');
+    adminTabs.forEach(tab => {
+        tab.addEventListener('click', function() {
+            const tabName = this.getAttribute('onclick').match(/showAdminTab\('([^']+)'\)/)[1];
+            showAdminTab(tabName);
+        });
+    });
+});
EOF
)
