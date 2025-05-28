document.addEventListener('DOMContentLoaded', () => {
    const texts = [
        "허위로 구인공고를 내면 처벌을 받을 수 있을까요?",
        "청소년도 주휴수당을 받을 수 있습니다.",
        "일한 시간만큼 정확하게 급여를 받아야 합니다.",
        "근로계약서는 반드시 작성해야 합니다!"
    ];

    let index = 0;
    const textEl = document.getElementById("slider-text");

    function slideText() {
        // 위로 사라지기
        textEl.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        textEl.style.transform = "translateY(-100%)";
        textEl.style.opacity = "0";

        setTimeout(() => {
            // 다음 텍스트 교체
            index = (index + 1) % texts.length;
            textEl.textContent = texts[index];

            // 아래에서 시작
            textEl.style.transition = "none";
            textEl.style.transform = "translateY(100%)";

            // 아래 → 제자리로 애니메이션
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    textEl.style.transition = "transform 0.5s ease, opacity 0.5s ease";
                    textEl.style.transform = "translateY(0)";
                    textEl.style.opacity = "1";
                });
            });
        }, 500);
    }

    // 5초마다 슬라이드
    setInterval(slideText, 5000);
});
