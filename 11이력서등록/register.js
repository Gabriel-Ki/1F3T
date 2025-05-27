// 파일 업로드 처리
document.getElementById('photoUpload').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        console.log('사진 파일 선택됨:', file.name);
    }
});

document.getElementById('resumeUpload').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        console.log('자기소개서 파일 선택됨:', file.name);
    }
});
document.getElementById('photoUploadBtn').addEventListener('click', () => {
    document.getElementById('photoUpload').click(); // input 강제 클릭
});

document.getElementById('resumeUploadBtn').addEventListener('click', () => {
    document.getElementById('resumeUpload').click();
});

// 이메일 선택 과정
const domainSelect = document.getElementById('domainSelect');
const emailDomain = document.getElementById('emailDomain');


domainSelect.addEventListener('change', () => {
    const selected = domainSelect.value;

    if (selected === 'custom' || selected === '') {
        emailDomain.value = '';
        emailDomain.removeAttribute('readonly');
        emailDomain.focus();
    } else {
        emailDomain.value = selected;
        emailDomain.setAttribute('readonly', true);
    }
});

// 희망 근무지 선택
import { regionData } from './region.js';
const sido = document.getElementById("sidoSelector");
const gugun = document.getElementById("sigugunSelector");
const dong = document.getElementById("dongSelector");
const selectedDongs = document.getElementById("selectedDongs");

// 시/도 선택택
sido.addEventListener("change", () => {
    gugun.innerHTML = '<option value="">구/군 선택</option>';
    dong.innerHTML = '<option value="">동 선택</option>';
    selectedDongs.innerHTML = '';
    if (regionData[sido.value]) {
        gugun.disabled = false;
        Object.keys(regionData[sido.value]).forEach(g => {
            const opt = document.createElement("option");
            opt.value = g;
            opt.textContent = g;
            gugun.appendChild(opt);
        });
    } else {
        gugun.disabled = true;
        dong.disabled = true;
    }
});

// 시/구/군 선택
gugun.addEventListener("change", () => {
    dong.innerHTML = '<option value="">동 선택</option>';
    selectedDongs.innerHTML = '';
    if (regionData[sido.value] && regionData[sido.value][gugun.value]) {
        dong.disabled = false;
        regionData[sido.value][gugun.value].forEach(d => {
            const opt = document.createElement("option");
            opt.value = d;
            opt.textContent = d;
            dong.appendChild(opt);
        });
    } else {
        dong.disabled = true;
    }
});

// 동 선택
dong.addEventListener("change", () => {
    const value = dong.value;
    if (!value) return;

    const existing = [...selectedDongs.children].map(el => el.dataset.value);
    if (existing.length >= 6 || existing.includes(value)) return;

    const badge = document.createElement("div");
    badge.className = "location-badge";
    badge.dataset.value = value;

    const name = document.createElement("span");
    name.className = "location-name";
    name.textContent = value;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "×";
    removeBtn.type = "button";  // 🔥 핵심
    removeBtn.onclick = () => {
        badge.classList.add("fade-out");
        setTimeout(() => badge.remove(), 200);
    };

    badge.appendChild(name);
    badge.appendChild(removeBtn);
    selectedDongs.appendChild(badge);
});

const badge = document.createElement("div");
badge.className = "location-badge";


// 희망직종 선택
const jobSelect = document.getElementById('jobSelectContainer');
const selectedJobs = document.getElementById('selectedJobs');
const charCount = document.querySelector('.character-limit');

jobSelect.addEventListener('change', () => {
    const value = jobSelect.value;
    if (!value) return;

    const existing = [...selectedJobs.children].map(el => el.dataset.value);
    if (existing.length >= 4 || existing.includes(value)) return;

    const badge = document.createElement("div");
    badge.className = "job-badge";
    badge.dataset.value = value;

    const name = document.createElement("span");
    name.textContent = value;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.type = "button";
    removeBtn.textContent = "×";
    removeBtn.onclick = () => {
        badge.classList.add("fade-out");
        setTimeout(() => {
            badge.remove();
            updateCharCount();
        }, 200);
    };

    badge.appendChild(name);
    badge.appendChild(removeBtn);
    selectedJobs.appendChild(badge);

    // 선택 후 초기화
    jobSelect.value = "";

    updateCharCount();
});

function updateCharCount() {
    const count = selectedJobs.children.length;
    charCount.textContent = count;
}

// 드래그 앤 드롭 공통 함수 생성
function enableDragAndDrop(dropAreaId, inputId, fileListId) {
    const dropArea = document.getElementById(dropAreaId);
    const fileInput = document.getElementById(inputId);
    const fileList = document.getElementById(fileListId);

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, e => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('highlight'));
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('highlight'));
    });

    dropArea.addEventListener('click', () => {
        fileInput.click();
    });

    function addFileBadge(fileName) {
        const badge = document.createElement('span');
        badge.className = 'file-badge';
        badge.textContent = fileName;

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.className = 'remove-badge';
        closeBtn.onclick = () => {
            badge.remove();
            fileInput.value = ''; // 파일 초기화
            showToast('파일이 삭제되었습니다');
        };

        badge.appendChild(closeBtn);
        fileList.innerHTML = '';
        fileList.appendChild(badge);
    }

    dropArea.addEventListener('drop', e => {
        const files = e.dataTransfer.files;
        if (files.length) {
            fileInput.files = files;
            addFileBadge(files[0].name);
            showToast('파일이 등록되었습니다');
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            addFileBadge(fileInput.files[0].name);
            showToast('파일이 등록되었습니다');
        }
    });
}

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
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// 실행
enableDragAndDrop('photoDropArea', 'photoUpload', 'photoFileName');
enableDragAndDrop('resumeDropArea', 'resumeUpload', 'resumeFileName');



// 글자 수 카운트
const textareas = document.querySelectorAll('textarea');
textareas.forEach(textarea => {
    const characterCount = textarea.nextElementSibling;
    if (characterCount && characterCount.classList.contains('character-count')) {
        textarea.addEventListener('input', function () {
            const count = this.value.length;
            characterCount.querySelector('.character-limit').textContent = count;
        });
    }
});

// 뒤로가기 버튼
document.querySelector('.back-btn').addEventListener('click', function () {
    history.back();
});
