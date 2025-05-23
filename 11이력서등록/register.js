const regionSelector = document.getElementById("regionSelector");
const selectedRegions = document.getElementById("selectedRegions");

regionSelector.addEventListener("change", () => {
    const region = regionSelector.value;
    if (region && ![...selectedRegions.children].some(btn => btn.textContent === region)) {
        const button = document.createElement("button");
        button.className = "btn btn-secondary";
        button.textContent = region;
        button.onclick = () => button.remove();
        selectedRegions.appendChild(button);
    }
    regionSelector.value = "";
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
