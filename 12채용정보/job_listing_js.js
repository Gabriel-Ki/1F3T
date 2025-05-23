// Global variables
let currentFilter = 'all';
let favorites = [];
let selectedFilters = {
    region: [],
    industry: [],
    period: [],
    wage: []
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    loadJobListings();
    setupEventListeners();
});

// Back button functionality
function goBack() {
    // In a real app, this would use history.back() or navigate to previous page
    console.log('뒤로 가기');
    alert('이전 페이지로 돌아갑니다.');
}

// Filter functionality
function initializeFilters() {
    const filterTabs = document.querySelectorAll('.tab-btn');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            currentFilter = this.getAttribute('data-filter');
            filterJobListings();
        });
    });
}

// Toggle filter panel
function toggleFilterPanel() {
    const filterPanel = document.getElementById('filterPanel');
    filterPanel.classList.toggle('active');
}

// Apply filters
function applyFilters() {
    // Get selected filters
    const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]:checked');
    
    selectedFilters = {
        region: [],
        industry: [],
        period: [],
        wage: []
    };
    
    checkboxes.forEach(checkbox => {
        const value = checkbox.value;
        const section = checkbox.closest('.filter-section');
        const sectionTitle = section.querySelector('h3').textContent;
        
        if (sectionTitle === '지역') {
            selectedFilters.region.push(value);
        } else if (sectionTitle === '업계별') {
            selectedFilters.industry.push(value);
        }
    });
    
    console.log('적용된 필터:', selectedFilters);
    filterJobListings();
    toggleFilterPanel();
}

// Reset filters
function resetFilters() {
    const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    selectedFilters = {
        region: [],
        industry: [],
        period: [],
        wage: []
    };
    
    filterJobListings();
}

// Filter job listings based on current filter and selected options
function filterJobListings() {
    const jobCards = document.querySelectorAll('.job-card');
    
    jobCards.forEach(card => {
        let shouldShow = true;
        
        // Apply category filter
        if (currentFilter !== 'all' && currentFilter !== 'all') {
            // Here you would implement logic based on job data
            // For demo purposes, showing all cards
        }
        
        // Apply detailed filters
        if (selectedFilters.region.length > 0 || selectedFilters.industry.length > 0) {
            // Here you would check if the job matches the selected filters
            // For demo purposes, showing all cards
        }
        
        if (shouldShow) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Toggle favorite status
function toggleFavorite(button) {
    const jobCard = button.closest('.job-card');
    const jobId = getJobId(jobCard);
    
    button.classList.toggle('active');
    
    if (button.classList.contains('active')) {
        favorites.push(jobId);
        console.log(`채용공고 ${jobId} 즐겨찾기에 추가됨`);
    } else {
        favorites = favorites.filter(id => id !== jobId);
        console.log(`채용공고 ${jobId} 즐겨찾기에서 제거됨`);
    }
    
    updateFavoriteStorage();
}

// Get job ID from job card (helper function)
function getJobId(jobCard) {
    // In a real app, this would get the actual job ID from data attributes
    const jobCards = Array.from(document.querySelectorAll('.job-card'));
    return jobCards.indexOf(jobCard) + 1;
}

// View job details
function viewDetails(jobId) {
    console.log(`채용공고 ${jobId} 상세보기`);
    alert(`채용공고 ${jobId}의 상세 정보를 확인합니다.`);
    
    // In a real app, this would navigate to job details page
    // window.location.href = `/job-details/${jobId}`;
}

// Apply for job
function applyJob(jobId) {
    console.log(`채용공고 ${jobId}에 지원`);
    
    // Show confirmation dialog
    if (confirm(`채용공고 ${jobId}에 지원하시겠습니까?`)) {
        alert('지원이 완료되었습니다!');
        
        // In a real app, this would send application data to server
        // submitJobApplication(jobId);
    }
}

// Load job listings (simulated API call)
function loadJobListings() {
    // In a real app, this would fetch data from an API
    console.log('채용공고 목록 로딩 완료');
    
    // Load saved favorites
    loadFavorites();
}

// Save favorites to localStorage
function updateFavoriteStorage() {
    localStorage.setItem('job_favorites', JSON.stringify(favorites));
}

// Load favorites from localStorage
function loadFavorites() {
    const saved = localStorage.getItem('job_favorites');
    if (saved) {
        favorites = JSON.parse(saved);
        
        // Update UI to show saved favorites
        favorites.forEach(jobId => {
            const jobCards = document.querySelectorAll('.job-card');
            if (jobCards[jobId - 1]) {
                const favoriteBtn = jobCards[jobId - 1].querySelector('.favorite-btn');
                favoriteBtn.classList.add('active');
            }
        });
    }
}

// Setup additional event listeners
function setupEventListeners() {
    // Close filter panel when clicking outside
    document.addEventListener('click', function(event) {
        const filterPanel = document.getElementById('filterPanel');
        const filterButton = document.querySelector('.filter-icon-btn');
        
        if (!filterPanel.contains(event.target) && !filterButton.contains(event.target)) {
            filterPanel.classList.remove('active');
        }
    });
    
    // Handle navigation buttons
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            console.log(`${text} 탭 클릭`);
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // In a real app, this would handle navigation
            if (text !== '채용') {
                alert(`${text} 페이지로 이동합니다.`);
            }
        });
    });
}

// Search functionality (can be added later)
function searchJobs(query) {
    console.log('검색어:', query);
    // Implement search logic here
}

// Sort functionality (can be added later)
function sortJobs(sortBy) {
    console.log('정렬 기준:', sortBy);
    // Implement sorting logic here
}

// Add more job cards dynamically (for infinite scroll)
function loadMoreJobs() {
    console.log('더 많은 채용공고 로딩');
    // Implement load more functionality here
}

// Export functions for potential external use
window.jobListingApp = {
    goBack,
    toggleFilterPanel,
    applyFilters,
    resetFilters,
    toggleFavorite,
    viewDetails,
    applyJob,
    searchJobs,
    sortJobs,
    loadMoreJobs
};