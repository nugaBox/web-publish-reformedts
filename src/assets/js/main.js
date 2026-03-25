/**
 * main.js — index.html 전용 스크립트
 */

document.addEventListener("DOMContentLoaded", () => {

  /* ── Navbar 스크롤 shadow ──────────────────────────────────── */
  // 스크롤이 내려가면 navbar에 그림자를 추가해 부유 효과를 강조
  const onScroll = () => {
    const navbar = document.querySelector("#site-header .navbar");
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.style.boxShadow = "0 4px 30px rgba(0,0,0,0.12)";
    } else {
      navbar.style.boxShadow = "";
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── data-include 완료 후 active nav 처리 ─────────────────── */
  const setActiveNav = () => {
    const currentFile = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("#site-header .nav-link:not(.dropdown-toggle)").forEach((link) => {
      const href = (link.getAttribute("href") || "").split("/").pop();
      link.classList.toggle("active", href === currentFile);
    });
    // 드롭다운 부모 항목: 드롭다운 내 active가 있으면 부모도 active 처리
    document.querySelectorAll("#site-header .dropdown").forEach((dd) => {
      const hasActive = dd.querySelector(".dropdown-item.active");
      dd.querySelector(".dropdown-toggle")?.classList.toggle("active", !!hasActive);
    });
  };

  const observer = new MutationObserver(() => {
    if (document.querySelector("#site-header")) {
      setActiveNav();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

});
