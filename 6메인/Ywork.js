document.addEventListener('DOMContentLoaded', () => {
  const texts = [
    "허위로 구인공고를 내면 처벌을 받을 수 있을까요?",
    "밀린 월급을 받기 위해 노동청에 어떻게 신고할 수 있나요?",
    "청소년이 취업할 수 있는 연령은 언제일까요?",
    "월급을 준다고 하면서 계속 주지 않으면 어떻게 해야 하나요?"
  ];

  let index = 0;
  const textEl = document.getElementById("slider-text");
  const alertLink = document.querySelector(".alert-box a");

  function updateAlertHref() {
    alertLink.href = `../15자주묻는질문/faq.html?question=${index}`;
  }

  function slideText() {
    // 텍스트 위로 사라지기
    textEl.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    textEl.style.transform = "translateY(-100%)";
    textEl.style.opacity = "0";

    setTimeout(() => {
      // 다음 텍스트로 전환
      index = (index + 1) % texts.length;
      textEl.textContent = texts[index];
      updateAlertHref();

      // 아래에서 다시 등장
      textEl.style.transition = "none";
      textEl.style.transform = "translateY(100%)";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          textEl.style.transition = "transform 0.5s ease, opacity 0.5s ease";
          textEl.style.transform = "translateY(0)";
          textEl.style.opacity = "1";
        });
      });
    }, 500);
  }

  updateAlertHref(); // 첫 로딩 시 링크 세팅
  setInterval(slideText, 5000); // 주기적 슬라이드
});
