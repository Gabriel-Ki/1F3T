// ✅ 전역 상태 관리 변수
let currentFilter = 'all';
let favorites = [];
let selectedFilters = {
    region: [],
    industry: [],
    period: [],
    wage: []
};

document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();      // 필터 탭 초기화 
    setupEventListeners();    // 모든 버튼 이벤트 연결
    setupFilterOptionButtons();
});

// ====================================
// 🔹 badge 생성 함수: 필터 조건 추가
// ====================================
function createBadge(value, containerId, filterKey) {
    const container = document.getElementById(containerId);
    if ([...container.children].some(el => el.dataset.value === value)) return;

    const badge = document.createElement("div");
    badge.className = "job-badge";
    badge.dataset.value = value;
    badge.textContent = value;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "×";
    removeBtn.addEventListener("click", () => {
        badge.remove();
        selectedFilters[filterKey] = selectedFilters[filterKey].filter(v => v !== value);
    });

    badge.appendChild(removeBtn);
    container.appendChild(badge);
    selectedFilters[filterKey].push(value);
}

// ====================================
// 🔹 필터 탭(지역/업계/기간/시급) 상단 버튼 클릭 핸들링
// ====================================
function initializeFilters() {
    const filterTabs = document.querySelectorAll('.tab-btn');
    const filterPanel = document.getElementById('filterPanel');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const alreadyActive = tab.classList.contains('active');

            // 모든 탭 초기화
            filterTabs.forEach(t => t.classList.remove('active'));

            if (!alreadyActive) {
                // 자신만 활성화
                tab.classList.add('active');
                filterPanel.classList.add('active');
                showFilterSection(tab.dataset.filter); // 각 섹션 보여줌
            } else {
                // 다시 누르면 닫기
                filterPanel.classList.remove('active');
            }
        });
    });
}


// ====================================
// 🔹 필터 패널 열기/닫기
// ====================================
function toggleFilterPanel() {
    const panel = document.getElementById('filterPanel');
    panel.classList.toggle('active');
}
function showFilterSection(filterType) {
    const sectionMap = {
        '지역': 'regionSection',
        '업계별': 'industrySection',
        '기간': 'periodSection'
    };

    document.querySelectorAll('.filter-section').forEach(section => {
        section.style.display = 'none';
    });

    const target = document.getElementById(sectionMap[filterType]);
    if (target) {
        target.style.display = 'block';
    }
}


// ====================================
// 🔹 필터 적용 버튼 클릭 시
// ====================================
function applyFilters() {
    const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]:checked');
    selectedFilters = { region: [], industry: [], period: [], wage: [] };

    checkboxes.forEach(cb => {
        const value = cb.value;
        const section = cb.closest('.filter-section');
        const title = section.querySelector('h3').textContent;

        if (title === '지역') selectedFilters.region.push(value);
        else if (title === '업계별') selectedFilters.industry.push(value);
        // period, wage 필터는 현재 없음
    });

    console.log('적용된 필터:', selectedFilters);
    filterJobListings();
    toggleFilterPanel();
}


// ====================================
// 🔹 필터 초기화 버튼 클릭 시
// ====================================
function resetFilters() {
    // 모든 selected 클래스 제거
    document.querySelectorAll('.option-buttons button.selected').forEach(btn => {
        btn.classList.remove('selected');
    });

    // selectedFilters 초기화
    selectedFilters = {
        region: [],
        industry: [],
        period: [],
        wage: []
    };

    // ✅ badge container를 올바르게 초기화
    const badgeContainer = document.getElementById('filterBadges');
    if (badgeContainer) badgeContainer.innerHTML = '';

    filterJobListings(); // 필요 시 목록 리프레시
}

// ====================================
// 🔹 필터에 맞게 채용공고 목록 보여주기 (현재는 기능 없음)
// ====================================
function filterJobListings() {
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.style.display = 'block';  // 필터 조건 적용은 추후 구현
    });
}


// ====================================
// 🔹 즐겨찾기 추가/제거 기능
// ====================================
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

function getJobId(jobCard) {
    const jobCards = Array.from(document.querySelectorAll('.job-card'));
    return jobCards.indexOf(jobCard) + 1; // index 기준 ID 생성
}


// ====================================
// 🔹 상세보기 기능
// ====================================
function viewDetails(jobId) {
    console.log(`채용공고 ${jobId} 상세보기`);
    alert(`채용공고 ${jobId}의 상세 정보를 확인합니다.`);
    // 실제 이동: window.location.href = `/job-details/${jobId}`;
}


// ====================================
// 🔹 즐겨찾기 목록 저장/불러오기
// ====================================
function updateFavoriteStorage() {
    localStorage.setItem('job_favorites', JSON.stringify(favorites));
}

function loadFavorites() {
    const saved = localStorage.getItem('job_favorites');
    if (saved) {
        favorites = JSON.parse(saved);
        favorites.forEach(jobId => {
            const jobCards = document.querySelectorAll('.job-card');
            if (jobCards[jobId - 1]) {
                jobCards[jobId - 1].querySelector('.favorite-btn')?.classList.add('active');
            }
        });
    }
}


// ====================================
// 🔹 이벤트 바인딩 (클릭 등)
// ====================================
function setupEventListeners() {
    // 필터 외부 클릭 시 닫기
    document.addEventListener('click', (e) => {
        const panel = document.getElementById('filterPanel');
        const toggleBtn = document.querySelector('[data-toggle-panel]');
        if (!panel.contains(e.target) && !toggleBtn.contains(e.target)) {
            panel.classList.remove('active');
        }
    });

    // 필터 관련 버튼
    document.querySelector('[data-toggle-panel]')?.addEventListener('click', toggleFilterPanel);
    document.querySelector('[data-apply]')?.addEventListener('click', applyFilters);
    document.querySelector('[data-reset]')?.addEventListener('click', resetFilters);

    // 즐겨찾기 버튼
    document.querySelectorAll('[data-fav]').forEach(btn =>
        btn.addEventListener('click', () => toggleFavorite(btn))
    );

    // 상세보기 버튼
    document.querySelectorAll('[data-detail]').forEach(btn =>
        btn.addEventListener('click', () => {
            const jobId = btn.dataset.detail;
            viewDetails(jobId);
        })
    );

    // 하단 내비게이션 버튼
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            const text = this.querySelector('span')?.textContent;
            if (text && text !== '채용') {
                alert(`${text} 페이지로 이동합니다.`);
            }
        });
    });
}
// ====================================
// 🔹 필터 옵션 버튼 (지역/업계/요일) 클릭 이벤트 연결
// ====================================
function setupFilterOptionButtons() {
    // 공통 처리
    function toggleOption(button, filterKey) {
        const value = button.dataset.value;
        const container = document.getElementById('filterBadges'); // ✅ 항상 여기에 추가
        const isSelected = button.classList.toggle("selected");

        if (isSelected) {
            if ([...container.children].some(el => el.dataset.value === value)) return;

            const badge = document.createElement("div");
            badge.className = "job-badge";
            badge.dataset.value = value;
            badge.textContent = value;

            const removeBtn = document.createElement("button");
            removeBtn.className = "remove-btn";
            removeBtn.textContent = "×";
            removeBtn.addEventListener("click", () => {
                badge.remove();
                selectedFilters[filterKey] = selectedFilters[filterKey].filter(v => v !== value);
                button.classList.remove("selected");
            });

            badge.appendChild(removeBtn);
            container.appendChild(badge);
            selectedFilters[filterKey].push(value);
        } else {
            selectedFilters[filterKey] = selectedFilters[filterKey].filter(v => v !== value);
            const badge = [...container.children].find(el => el.dataset.value === value);
            badge?.remove();
        }
    }


    function loadJobListings() {
        // 추후 구현용
        console.log('채용공고 데이터를 불러오는 중...');
    }

    document.querySelectorAll("#regionButtons button").forEach(btn =>
        btn.addEventListener("click", () => toggleOption(btn, "region"))
    );

    document.querySelectorAll("#industryButtons button").forEach(btn =>
        btn.addEventListener("click", () => toggleOption(btn, "industry"))
    );

    document.querySelectorAll("#weekdayButtons button").forEach(btn =>
        btn.addEventListener("click", () => toggleOption(btn, "period"))
    );
}


