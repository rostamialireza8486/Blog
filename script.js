// ۱. مدیریت حالت تاریک و روشن (Dark Mode)
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggleBtn.querySelector('i');

// بررسی تم ذخیره شده در مرورگر
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggleBtn.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// ۲. داده‌های تستی حرفه‌ای‌تر (بعداً از API خوانده می‌شود)
const mockPosts = [
    { 
        id: 1, 
        title: "تحلیل پایداری در سیستم‌های کنترل", 
        tag: "پردازش سیگنال",
        excerpt: "بررسی قطب‌ها و صفرها در صفحه S و تاثیر آن‌ها بر پایداری سیستم...", 
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=60",
        date: "۱۴۰۵/۰۴/۲۵" 
    },
    { 
        id: 2, 
        title: "پیاده‌سازی سری فوریه در متلب", 
        tag: "مهندسی",
        excerpt: "چگونه ضرایب سری فوریه (Cn) را برای یک سیگنال متناوب محاسبه کنیم؟", 
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=500&q=60",
        date: "۱۴۰۵/۰۴/۲۰" 
    },
    { 
        id: 3, 
        title: "طراحی مدارهای ترتیبی و ترکیبی", 
        tag: "مدارهای منطقی",
        excerpt: "آشنایی با فلیپ‌فلاپ‌ها و نحوه استفاده از آن‌ها در حافظه‌ها...", 
        image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=500&q=60",
        date: "۱۴۰۵/۰۴/۱۵" 
    }
];

const postsContainer = document.getElementById('blog-posts');
const searchInput = document.getElementById('search-input');

// ۳. تابع رندر کردن مقالات
function renderPosts(posts) {
    postsContainer.innerHTML = '';
    
    if(posts.length === 0) {
        postsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">مقاله‌ای یافت نشد.</p>';
        return;
    }

    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.classList.add('post-card');
        postElement.innerHTML = `
            <div class="post-img" style="background-image: url('${post.image}')"></div>
            <div class="post-content">
                <span class="post-tag">${post.tag}</span>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem;">
                    <a href="#" class="read-more">ادامه مطلب <i class="fas fa-arrow-left"></i></a>
                    <small style="color:#888;">${post.date}</small>
                </div>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// ۴. پیاده‌سازی سیستم جستجوی زنده (Live Search)
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    if(searchTerm === '') {
        renderPosts(mockPosts);
    } else {
        const filteredPosts = mockPosts.filter(post => 
            post.title.includes(searchTerm) || post.tag.includes(searchTerm)
        );
        renderPosts(filteredPosts);
    }
});

// لود اولیه مقالات
renderPosts(mockPosts);
