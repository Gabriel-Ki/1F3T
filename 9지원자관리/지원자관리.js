document.addEventListener('DOMContentLoaded', function() {
  // 채용종료 버튼 처리
  const finishBtn = document.getElementById('finishBtn');
  finishBtn.addEventListener('click', function() {
    if (confirm('채용을 종료하시겠습니까?')) {
      alert('채용이 종료되었습니다.');
      window.location.href = '../7공고관리/채용공고관리마감.html';
    } else {
      alert('취소되었습니다.');
    }
  });

  // 지원자 합격/불합격 처리
  const cards = document.querySelectorAll('.card');
  cards.forEach(function(card) {
    const name = card.querySelector('.name').textContent;

    const acceptBtn = card.querySelector('.btn.accept');
    acceptBtn.addEventListener('click', function() {
      if (confirm(`${name} 님을 합격 처리하시겠습니까?`)) {
        alert(`${name} 님이 합격 처리되었습니다.`);
      } else {
        alert('취소되었습니다.');
      }
    });

    const rejectBtn = card.querySelector('.btn.reject');
    rejectBtn.addEventListener('click', function() {
      if (confirm(`${name} 님을 불합격 처리하시겠습니까?`)) {
        alert(`${name} 님이 불합격 처리되었습니다.`);
      } else {
        alert('취소되었습니다.');
      }
    });
  });

  // 지원자 수 카운터 업데이트
  const countEl = document.querySelector('.count');
  countEl.textContent = `전체 ${cards.length}건`;
});
