/**
 * build.js
 * src/ → dist/ 빌드 스크립트
 *
 * 수행 작업:
 *  1. dist/ 초기화 후 src/ 전체 복사
 *  2. HTML 파일의 data-include를 실제 header/footer로 인라인 처리
 *  3. CSS 파일의 로컬 웹폰트 경로를 CMS 변수로 치환
 *  4. HTML/CSS 파일의 이미지 경로를 CMS 변수로 치환
 *
 * 실행: npm run build
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC  = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");

// ── CMS 경로 변수 설정 ────────────────────────────────────────
// CMS가 런타임에 치환하는 변수명입니다. 필요에 따라 수정하세요.
const CMS = {
  root:     "${rootDirectory}",
  img:      "${imgDirectory}",      // CSS 파일용 이미지 경로 변수
  imgHtml:  "${path.images}",       // HTML 파일용 이미지 경로 변수
  font:     "${fontDirectory}",     // 웹폰트 포함 모든 폰트 경로 변수
};
// ─────────────────────────────────────────────────────────────

// ── 유틸 ─────────────────────────────────────────────────────

function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    entry.isDirectory() ? copyRecursive(s, d) : fs.copyFileSync(s, d);
  }
}

/** url() 안의 로컬 웹폰트 경로를 CMS 변수로 치환 */
function replaceWebfontPaths(css) {
  // ../fonts/ → ${fontDirectory} (나머지 경로 보존)
  return css.replace(/url\((['"]?)\.\.\/fonts\//g, `url($1${CMS.font}`);
}

/** CSS 내 이미지 경로를 CMS 변수로 치환 */
function replaceImgPaths(content) {
  // assets/images/ → ${imgDirectory}
  return content.replace(/assets\/images\//g, CMS.img);
}

/** HTML 내 이미지 경로를 CMS 변수로 치환 */
function replaceImgPathsHtml(content) {
  // assets/images/ → ${path.images}
  return content.replace(/assets\/images\//g, CMS.imgHtml);
}

/** HTML 파일의 data-include 태그를 실제 파일 내용으로 인라인 */
function inlineIncludes(html) {
  return html.replace(
    /<div\s+data-include="([^"]+)"><\/div>/g,
    (match, includePath) => {
      const full = path.join(DIST, includePath);
      if (!fs.existsSync(full)) {
        console.warn(`  ⚠️  include 파일 없음: ${includePath}`);
        return match;
      }
      return fs.readFileSync(full, "utf-8").trim();
    }
  );
}

// ── 빌드 ─────────────────────────────────────────────────────

console.log("\n🏗️  빌드 시작...\n");

// 1. dist/ 초기화
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true });
}
copyRecursive(SRC, DIST);
console.log("✅  src/ → dist/ 복사 완료");

// 2. HTML 처리: include 인라인 + 이미지 경로 치환
const htmlFiles = fs.readdirSync(DIST).filter((f) => f.endsWith(".html"));

for (const file of htmlFiles) {
  const filePath = path.join(DIST, file);
  let html = fs.readFileSync(filePath, "utf-8");

  html = inlineIncludes(html);
  html = replaceImgPathsHtml(html);

  fs.writeFileSync(filePath, html, "utf-8");
  console.log(`✅  ${file} — include 인라인, 이미지 경로 치환 (→ ${CMS.imgHtml})`);
}

// 3. CSS 처리: 웹폰트 경로 + 이미지 경로 치환
const cssDir = path.join(DIST, "assets", "css");
if (fs.existsSync(cssDir)) {
  const cssFiles = fs.readdirSync(cssDir).filter((f) => f.endsWith(".css"));

  for (const file of cssFiles) {
    const filePath = path.join(cssDir, file);
    let css = fs.readFileSync(filePath, "utf-8");

    const before = css;
    css = replaceWebfontPaths(css);
    css = replaceImgPaths(css);

    if (css !== before) {
      fs.writeFileSync(filePath, css, "utf-8");
      console.log(`✅  assets/css/${file} — 경로 치환`);
    }
  }
}

console.log("\n✨ 빌드 완료: dist/\n");
