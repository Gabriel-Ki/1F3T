// 뒤로가기
document.querySelector('.back-btn').addEventListener('click', function() {
    window.history.back();
});

// 전화하기 버튼
document.querySelector('.btn-primary').addEventListener('click', function() {
    alert('전화 연결 중...');
});

// 문자메시지 버튼
document.querySelector('.btn-secondary').addEventListener('click', function() {
    alert('문자 메시지 화면으로 이동합니다.');
});

// 온라인 지원서 작성 버튼
document.querySelector('.btn-full').addEventListener('click', function() {
    alert('온라인 지원서 작성 페이지로 이동합니다.');
});

// 네비게이션 메뉴 클릭 효과
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// 태그 클릭 효과
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// 지도 클릭 시 확대
document.querySelector('.map-container').addEventListener('click', function() {
    alert('지도 확대 보기');
});
