// 버튼 눌렀을 때 메시지
function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// 임시 저장 버튼
const tempSaveBtn = document.getElementById('tempSaveBtn');
tempSaveBtn.addEventListener('click', () => {
    showToast('임시저장 되었습니다');
});

// 신청 버튼
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', () => {
    const resumeCheck = document.getElementById('resumeCheck').checked;
    const agreeCheck = document.getElementById('agreeCheck').checked;

    if (!resumeCheck) {
        showToast('이력서 확인에 동의해주세요.');
        return;
    }

    if (!agreeCheck) {
        showToast('개인정보 수집 동의는 필수입니다.');
        return;
    }

    // 다음 페이지 이동 처리
    localStorage.setItem('applyMessage', '신청이 완료되었습니다');
    window.location.href = 'complete.html';
});
