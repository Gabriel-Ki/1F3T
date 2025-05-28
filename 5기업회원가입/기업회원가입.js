// 전체동의 & 개별체크 토글
document.addEventListener('DOMContentLoaded', function () {
  const agreeAll = document.getElementById('agreeAll');
  const childCheckboxes = document.querySelectorAll('.agreements ul li input[type="checkbox"]');

  // 1) 전체동의 클릭 시 하위 모두 체크/언체크
  agreeAll.addEventListener('change', () => {
    childCheckboxes.forEach(cb => cb.checked = agreeAll.checked);
  });

  // 2) 개별 해제/모두 체크에 따른 전체동의 토글
  childCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      if (!cb.checked) {
        agreeAll.checked = false;
      } else if ([...childCheckboxes].every(c => c.checked)) {
        agreeAll.checked = true;
      }
    });
  });
});

// 드래그 앤 드롭 파일 업로드
function enableDragAndDrop(dropAreaId, inputId, fileListId) {
  const dropArea = document.getElementById(dropAreaId);
  const fileInput = document.getElementById(inputId);
  const fileList = document.getElementById(fileListId);

  ['dragenter','dragover','dragleave','drop'].forEach(evt => {
    dropArea.addEventListener(evt, e => {
      e.preventDefault(); e.stopPropagation();
    });
  });
  ['dragenter','dragover'].forEach(evt => {
    dropArea.addEventListener(evt, () => dropArea.classList.add('highlight'));
  });
  ['dragleave','drop'].forEach(evt => {
    dropArea.addEventListener(evt, () => dropArea.classList.remove('highlight'));
  });
  dropArea.addEventListener('click', () => fileInput.click());

  function addFileBadge(name) {
    const badge = document.createElement('span');
    badge.className = 'file-badge';
    badge.textContent = name;
    const close = document.createElement('button');
    close.textContent = '×'; close.className = 'remove-badge'; close.type='button';
    close.onclick = () => { badge.remove(); fileInput.value=''; showToast('파일이 삭제되었습니다.'); };
    badge.appendChild(close);
    fileList.innerHTML = '';
    fileList.appendChild(badge);
  }

  dropArea.addEventListener('drop', e => {
    const files = e.dataTransfer.files;
    if (files.length) {
      fileInput.files = files;
      addFileBadge(files[0].name);
      showToast(`"${files[0].name}" 파일이 등록되었습니다.`);
    }
  });
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
      addFileBadge(fileInput.files[0].name);
      showToast(`"${fileInput.files[0].name}" 파일이 등록되었습니다.`);
    }
  });
}

// 파일 선택 뱃지 업데이트 (드롭 영역 외)
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('cardload');
  const fileNameSpan = document.querySelector('.file-footer .file-name');
  const dropArea = document.getElementById('resumeDropArea');

  fileInput.addEventListener('change', () => {
    fileNameSpan.textContent = fileInput.files.length
      ? fileInput.files[0].name
      : '선택된 파일 없음';
  });

  ['dragenter','dragover','dragleave','drop'].forEach(evt =>
    dropArea.addEventListener(evt, e => { e.preventDefault(); e.stopPropagation(); })
  );
  ['dragenter','dragover'].forEach(evt =>
    dropArea.addEventListener(evt, () => dropArea.classList.add('highlight'))
  );
  ['dragleave','drop'].forEach(evt =>
    dropArea.addEventListener(evt, () => dropArea.classList.remove('highlight'))
  );
  dropArea.addEventListener('drop', e => {
    const files = e.dataTransfer.files;
    if (!files.length) return;
    fileInput.files = files;
    fileNameSpan.textContent = files[0].name;
  });
});

// 폼 제출 유효성 검사
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let missing = false;

    form.querySelectorAll('.form-group').forEach(group => {
      if (group.querySelector('span.required')) {
        const field = group.querySelector('input, select, textarea');
        if (!field) return;
        if (field.type === 'file') {
          if (!field.files || field.files.length === 0) missing = true;
        } else {
          if (!field.value.trim()) missing = true;
        }
      }
    });

    if (missing) {
      alert('작성하지 않은 항목이 있습니다.');
    } else {
      alert('가입되었습니다.');
      form.submit();
    }
  });
});

// 주소 검색
document.getElementById('searchAddressBtn').addEventListener('click', function () {
  new daum.Postcode({
    oncomplete: function (data) {
      const addr = data.userSelectedType === 'R'
        ? data.roadAddress
        : data.jibunAddress;
      document.getElementById('addressInput').value = addr;
      showToast('주소가 입력되었습니다');
    }
  }).open();
});

// 인증 방식 토글
document.addEventListener('DOMContentLoaded', () => {
  const radios = document.querySelectorAll('input[name="auth"]');
  const contents = document.querySelectorAll('.auth-content');
  function update() {
    const sel = document.querySelector('input[name="auth"]:checked').value;
    contents.forEach(b => {
      b.dataset.auth === sel
        ? b.classList.remove('hidden')
        : b.classList.add('hidden');
    });
  }
  update();
  radios.forEach(r => r.addEventListener('change', update));
});

// 휴대폰 번호 입력 제어 (숫자만 · 최대 11자리)
document.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.getElementById('phoneInput');
  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 11);
  });
});
