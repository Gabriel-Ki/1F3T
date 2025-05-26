

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

dong.addEventListener("change", () => {
    const value = dong.value;
    if (!value) return;
    const existing = [...selectedDongs.children].map(b => b.textContent);
    if (existing.length >= 4 || existing.includes(value)) return;

    const btn = document.createElement("button");
    btn.className = "btn btn-secondary";
    btn.textContent = value;
    btn.onclick = () => btn.remove();
    selectedDongs.appendChild(btn);
});

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

dong.addEventListener("change", () => {
    const value = dong.value;
    if (!value) return;
    const existing = [...selectedDongs.children].map(b => b.textContent);
    if (existing.length >= 4 || existing.includes(value)) return;

    const btn = document.createElement("button");
    btn.className = "btn btn-secondary";
    btn.textContent = value;
    btn.onclick = () => btn.remove();
    selectedDongs.appendChild(btn);
});

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
// 드래그 앤 드롭 공통 함수 생성
function enableDragAndDrop(dropAreaId, inputId) {
    const dropArea = document.getElementById(dropAreaId);
    const fileInput = document.getElementById(inputId);

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

    dropArea.addEventListener('drop', e => {
        const files = e.dataTransfer.files;
        if (files.length) {
            fileInput.files = files;
            console.log(`${inputId} 드롭 파일 선택됨:`, files[0].name);
        }
    });
}

// 실행
enableDragAndDrop('photoDropArea', 'photoUpload');
enableDragAndDrop('resumeDropArea', 'resumeUpload');



// 글자 수 카운트
const textareas = document.querySelectorAll('textarea');
textareas.forEach(textarea => {
    const characterCount = textarea.nextElementSibling;
    if (characterCount && characterCount.classList.contains('character-count')) {
        textarea.addEventListener('input', function () {
            const count = this.value.length;
            const limit = characterCount.textContent.split('/')[1];
            characterCount.querySelector('.character-limit').textContent = count;
        });
    }
});

// 뒤로가기 버튼
document.querySelector('.back-btn').addEventListener('click', function () {
    history.back();
});
