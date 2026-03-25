/**
 * sub.js — sub.html / sub2.html 전용 스크립트
 */

/* ── Active Nav Link 자동 처리 ──────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  // data-include 로더가 완료된 뒤 현재 경로와 일치하는 nav-link에 active 클래스 부여
  const setActiveNav = () => {
    const currentFile = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("#site-header .nav-link").forEach((link) => {
      const href = link.getAttribute("href")?.split("/").pop();
      link.classList.toggle("active", href === currentFile);
    });
  };

  // MutationObserver로 data-include 교체 감지
  const observer = new MutationObserver(() => {
    if (document.querySelector("#site-header")) {
      setActiveNav();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
