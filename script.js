// ===== DOM Elements =====
const navItems = document.querySelectorAll('.nav-item[data-tab]');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item[data-tab]');
const tabContents = document.querySelectorAll('.tab-content');
const schoolTags = document.querySelectorAll('.school-tag');
const groupCards = document.querySelectorAll('.group-card');
const postModal = document.getElementById('post-modal');
const groupModal = document.getElementById('group-modal');

// ===== Tab Navigation =====
function switchTab(tabId, clickedItem, allItems) {
    // Update active nav item
    allItems.forEach(nav => nav.classList.remove('active'));
    clickedItem.classList.add('active');

    // Also sync with sidebar nav if on mobile
    navItems.forEach(nav => {
        nav.classList.remove('active');
        if (nav.dataset.tab === tabId) nav.classList.add('active');
    });
    mobileNavItems.forEach(nav => {
        nav.classList.remove('active');
        if (nav.dataset.tab === tabId) nav.classList.add('active');
    });

    // Show corresponding tab content
    tabContents.forEach(tab => {
        tab.classList.remove('active');
        if (tab.id === `${tabId}-tab`) {
            tab.classList.add('active');
        }
    });

    // Scroll to top when switching tabs on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Desktop sidebar navigation
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab(item.dataset.tab, item, navItems);
    });
});

// Mobile bottom navigation
mobileNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab(item.dataset.tab, item, mobileNavItems);
    });
});

// ===== School Filter =====
schoolTags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Update active tag
        schoolTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');

        const school = tag.dataset.school;

        // Filter groups
        groupCards.forEach(card => {
            if (school === 'all' || card.dataset.school === school || card.dataset.school === 'all') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== Post Modal =====
function openPostModal() {
    postModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePostModal() {
    postModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on backdrop click
postModal.addEventListener('click', (e) => {
    if (e.target === postModal) {
        closePostModal();
    }
});

// ===== Group Detail Modal =====
const groupData = {
    'cntt-huet': {
        name: 'Công nghệ Thông tin - HUET',
        emoji: '💻',
        members: 2450,
        posts: 120,
        desc: 'Cộng đồng sinh viên CNTT trường ĐH Khoa học Huế. Nơi chia sẻ kiến thức lập trình, AI/ML, Web Development, và cơ hội việc làm trong ngành.',
        rules: [
            'Tôn trọng các thành viên khác',
            'Không spam, quảng cáo không liên quan',
            'Chia sẻ kiến thức, hỗ trợ lẫn nhau',
            'Gắn tag phù hợp khi đăng bài'
        ],
        admins: ['Nguyễn Văn Admin', 'Trần Thị Mod']
    },
    'ktqt-hce': {
        name: 'Kinh tế Quốc tế - HCE',
        emoji: '📊',
        members: 1890,
        posts: 85,
        desc: 'Nhóm sinh viên Kinh tế Quốc tế trường ĐH Kinh tế Huế. Thảo luận về tài chính, thương mại quốc tế, marketing.',
        rules: [
            'Chia sẻ thông tin chính xác',
            'Tôn trọng ý kiến khác biệt',
            'Không bàn luận chính trị'
        ],
        admins: ['Lê Văn Admin']
    },
    'tieng-anh-hufl': {
        name: 'Tiếng Anh - HUFL',
        emoji: '🌍',
        members: 3200,
        posts: 150,
        desc: 'Cộng đồng học tiếng Anh lớn nhất Đại học Huế. IELTS, TOEIC, giao tiếp, dịch thuật, và cơ hội du học.',
        rules: [
            'Khuyến khích viết bằng tiếng Anh',
            'Sửa lỗi nhẹ nhàng, không chê bai',
            'Chia sẻ tài liệu miễn phí'
        ],
        admins: ['Phạm Thị Admin', 'Hoàng Văn Mod']
    },
    'sv-nam-1': {
        name: 'Sinh viên Năm Nhất 2026',
        emoji: '🆕',
        members: 5800,
        posts: 320,
        desc: 'Nhóm dành cho tất cả tân sinh viên K50 Đại học Huế. Hỏi đáp, làm quen, tìm bạn cùng lớp, hỗ trợ nhau trong học tập và cuộc sống.',
        rules: [
            'Thân thiện, hòa đồng',
            'Không bắt nạt, kỳ thị',
            'Giúp đỡ các bạn mới'
        ],
        admins: ['Đoàn Thanh niên ĐH Huế']
    }
};

function showGroupDetail(groupId) {
    const group = groupData[groupId];
    if (!group) return;

    const modalTitle = document.getElementById('group-modal-title');
    const modalBody = document.getElementById('group-modal-body');

    modalTitle.textContent = group.name;
    modalBody.innerHTML = `
        <div class="group-detail">
            <div class="group-detail-header" style="text-align: center; padding: 24px; background: linear-gradient(135deg, var(--primary-start), var(--primary-end)); border-radius: var(--border-radius); margin-bottom: 24px;">
                <span style="font-size: 4rem;">${group.emoji}</span>
                <h2 style="margin-top: 12px;">${group.name}</h2>
                <p style="color: rgba(255,255,255,0.8); margin-top: 8px;">👥 ${group.members.toLocaleString()} thành viên • 📝 ${group.posts} bài/tuần</p>
            </div>
            
            <div style="margin-bottom: 24px;">
                <h3 style="margin-bottom: 12px;">📖 Giới thiệu</h3>
                <p style="color: var(--text-secondary);">${group.desc}</p>
            </div>
            
            <div style="margin-bottom: 24px;">
                <h3 style="margin-bottom: 12px;">📋 Quy tắc nhóm</h3>
                <ul style="padding-left: 20px;">
                    ${group.rules.map(rule => `<li style="color: var(--text-secondary); padding: 4px 0;">${rule}</li>`).join('')}
                </ul>
            </div>
            
            <div style="margin-bottom: 24px;">
                <h3 style="margin-bottom: 12px;">👤 Quản trị viên</h3>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    ${group.admins.map(admin => `
                        <div style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--bg-light); border-radius: 50px;">
                            <span>👤</span>
                            <span>${admin}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div style="display: flex; gap: 12px;">
                <button class="btn btn-primary" style="flex: 1;">Vào nhóm</button>
                <button class="btn btn-secondary" onclick="closeGroupModal()">Đóng</button>
            </div>
        </div>
    `;

    groupModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGroupModal() {
    groupModal.classList.remove('active');
    document.body.style.overflow = '';
}

groupModal.addEventListener('click', (e) => {
    if (e.target === groupModal) {
        closeGroupModal();
    }
});

// ===== Like/Interact Animations =====
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Add clicked effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);

        // Toggle like state
        if (this.textContent.includes('Thích')) {
            if (this.classList.contains('liked')) {
                this.classList.remove('liked');
                this.innerHTML = '<span>❤️</span> Thích';
            } else {
                this.classList.add('liked');
                this.innerHTML = '<span>💖</span> Đã thích';
                this.style.color = '#ec4899';
            }
        }
    });
});

// ===== Join Group Buttons =====
document.querySelectorAll('.btn-join, .group-card .btn-primary').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (this.textContent.includes('Tham gia')) {
            this.textContent = '✓ Đã tham gia';
            this.classList.remove('btn-primary');
            this.classList.add('btn-secondary', 'joined');

            // Show notification
            showNotification('Đã tham gia nhóm thành công! 🎉');
        }
    });
});

// ===== Simple Notification Toast =====
function showNotification(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        padding: 16px 24px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border-radius: 12px;
        font-weight: 500;
        box-shadow: 0 10px 40px rgba(99, 102, 241, 0.4);
        z-index: 3000;
        animation: slideUp 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== Search Functionality =====
const searchBox = document.querySelector('.search-box input');
if (searchBox) {
    searchBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchBox.value.trim();
            if (query) {
                showNotification(`Đang tìm kiếm: "${query}"`);
            }
        }
    });
}

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // Escape to close modals
    if (e.key === 'Escape') {
        closePostModal();
        closeGroupModal();
        closePremiumModal();
    }

    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchBox?.focus();
    }
});

// ===== Premium Modal =====
const premiumModal = document.getElementById('premium-modal');

function openPremiumModal() {
    premiumModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePremiumModal() {
    premiumModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close premium modal on backdrop click
premiumModal.addEventListener('click', (e) => {
    if (e.target === premiumModal) {
        closePremiumModal();
    }
});

// Plan card selection
document.querySelectorAll('.plan-card').forEach(card => {
    card.addEventListener('click', function () {
        document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
    });
});

// ===== Animation Keyframes =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
    }
    
    .action-btn.liked {
        color: #ec4899 !important;
    }
`;
document.head.appendChild(styleSheet);

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎓 HueUni Connect - Mạng xã hội Sinh viên Đại học Huế');
    console.log('📚 Demo version - All data is mock data');

    // Add smooth reveal for posts
    const posts = document.querySelectorAll('.post');
    posts.forEach((post, index) => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(20px)';
        setTimeout(() => {
            post.style.transition = 'all 0.4s ease';
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ===== Header Scroll Effect =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===== Simulate Real-time Notifications =====
let notificationCount = 3;

setInterval(() => {
    // Random chance to add notification
    if (Math.random() > 0.7) {
        notificationCount++;
        const badge = document.querySelector('.header-btn .notification-badge');
        if (badge) {
            badge.textContent = notificationCount;
            badge.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                badge.style.animation = '';
            }, 300);
        }
    }
}, 30000); // Every 30 seconds

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(pulseStyle);
