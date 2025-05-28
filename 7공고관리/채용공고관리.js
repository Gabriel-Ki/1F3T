document.addEventListener('DOMContentLoaded', async () => {
  // 1) 화면 내 공고 개수 업데이트
  const totalEl = document.querySelector('.filter-bar .total');
  const localCount = document.querySelectorAll('.content .card').length;
  totalEl.textContent = `전체 ${localCount}건`;

  // 2) 각 탭의 remote 페이지에서 카드 개수 불러와서 채우기
  const tabs = document.querySelectorAll('.tabs .tab');
  for (const tab of tabs) {
    const href = tab.getAttribute('href');
    try {
      const res  = await fetch(href, { cache: 'no-cache' });
      const text = await res.text();
      const doc  = new DOMParser().parseFromString(text, 'text/html');
      const cnt  = doc.querySelectorAll('.content .card').length;
      tab.querySelector('.count').textContent = cnt;
    } catch (e) {
      console.error(`Failed to load ${href}:`, e);
      tab.querySelector('.count').textContent = '0';
    }
  }

  // 3) 현재 페이지에 맞춰 active 클래스 붙이기
  const currentPage = location.pathname.split('/').pop();
  tabs.forEach(tab => {
    if (tab.getAttribute('href') === currentPage) {
      tab.classList.add('active');
    }
  });
});
