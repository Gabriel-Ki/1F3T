// app.js

// 우편번호 팝업, 파일 업로드, 버튼 이벤트 바인딩
document.addEventListener('DOMContentLoaded', () => {
  // 1) 도로명주소 검색
  const searchBtn = document.getElementById('search-btn');
  searchBtn.addEventListener('click', () => {
    new daum.Postcode({
      oncomplete: data => {
        const addr = (data.userSelectedType === 'R')
          ? data.roadAddress
          : data.jibunAddress;
        document.getElementById('location').value = addr;
        showToast('주소가 입력되었습니다');
      }
    }).open();
  });

  // 2) 파일 드래그 앤 드롭 & input 선택
  const dropArea     = document.getElementById('resumeDropArea');
  const fileInput    = document.getElementById('cardload');
  const fileNameSpan = document.querySelector('.file-footer .file-name');

  // 공통 방지
  ['dragenter','dragover','dragleave','drop'].forEach(evt => {
    dropArea.addEventListener(evt, e => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  // 하이라이트
  ['dragenter','dragover'].forEach(evt => {
    dropArea.addEventListener(evt, () => dropArea.classList.add('highlight'));
  });
  ['dragleave','drop'].forEach(evt => {
    dropArea.addEventListener(evt, () => dropArea.classList.remove('highlight'));
  });

  // 클릭 → 파일창 열기
  dropArea.addEventListener('click', () => fileInput.click());

  // 파일이 선택되거나 드롭되면
  function updateFile(name) {
    fileInput.files.length && (fileNameSpan.textContent = name);
    showToast(`"${name}" 파일이 등록되었습니다.`);
  }

  dropArea.addEventListener('drop', e => {
    const files = e.dataTransfer.files;
    if (!files.length) return;
    fileInput.files = files;
    updateFile(files[0].name);
  });

  fileInput.addEventListener('change', () => {
    if (!fileInput.files.length) return;
    updateFile(fileInput.files[0].name);
  });

  // 3) 임시저장 / 등록하기 버튼
  const draftBtn  = document.querySelector('.btn.draft');
  const submitBtn = document.querySelector('.btn.submit');

  draftBtn.addEventListener('click', () => {
    showToast('임시저장 되었습니다');
  });

  submitBtn.addEventListener('click', () => {
    localStorage.setItem('registerMessage', '등록이 완료되었습니다');
    window.location.href = '../7공고관리/채용공고관리등록.html';
  });
});

// 토스트 메시지 함수
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
