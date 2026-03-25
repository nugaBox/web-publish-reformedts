/**
 * setup.js
 * node_modules에서 Bootstrap, Bootstrap Icons, Pretendard 파일을 src/assets 폴더로 복사합니다.
 * npm install 이후 npm run setup 으로 실행하세요.
 *
 * Font Awesome Pro는 별도 라이선스가 필요하므로 수동으로 배치하세요.
 * → src/assets/css/fontawesome.min.css
 * → src/assets/fonts/fontawesome/ (webfonts 파일들)
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const copies = [
  // Bootstrap CSS
  {
    src: "node_modules/bootstrap/dist/css/bootstrap.min.css",
    dest: "src/assets/css/bootstrap.min.css",
  },
  // Bootstrap JS (Popper 포함 번들)
  {
    src: "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
    dest: "src/assets/js/bootstrap.bundle.min.js",
  },
  // Bootstrap Icons CSS
  {
    src: "node_modules/bootstrap-icons/font/bootstrap-icons.min.css",
    dest: "src/assets/css/bootstrap-icons.min.css",
  },
  // Pretendard CSS (static subset)
  {
    src: "node_modules/pretendard/dist/web/static/pretendard.css",
    dest: "src/assets/css/pretendard.css",
  },
];

function copyFile(src, dest) {
  const srcPath = path.join(ROOT, src);
  const destPath = path.join(ROOT, dest);

  if (!fs.existsSync(srcPath)) {
    console.warn(`⚠️  파일 없음 (npm install 확인 필요): ${src}`);
    return;
  }

  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);
  console.log(`✅  복사 완료: ${dest}`);
}

function copyDir(src, dest, logLabel) {
  if (!fs.existsSync(src)) {
    console.warn(`⚠️  폴더 없음: ${src}`);
    return;
  }

  fs.mkdirSync(dest, { recursive: true });
  const files = fs.readdirSync(src);

  files.forEach((file) => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    if (fs.statSync(srcFile).isFile()) {
      fs.copyFileSync(srcFile, destFile);
    }
  });

  console.log(`✅  복사 완료: ${logLabel}`);
}

// ── Bootstrap ────────────────────────────────────────────────────────────────
console.log("\n🚀 셋업 시작...\n");

copies.forEach(({ src, dest }) => copyFile(src, dest));

// Bootstrap Icons webfonts
copyDir(
  path.join(ROOT, "node_modules/bootstrap-icons/font/fonts"),
  path.join(ROOT, "src/assets/fonts/bootstrap-icons"),
  "src/assets/fonts/bootstrap-icons/"
);

// bootstrap-icons.min.css 폰트 경로 패치
const iconCssPath = path.join(ROOT, "src/assets/css/bootstrap-icons.min.css");
if (fs.existsSync(iconCssPath)) {
  let css = fs.readFileSync(iconCssPath, "utf-8");
  css = css.replace(/url\("fonts\//g, 'url("../fonts/bootstrap-icons/');
  fs.writeFileSync(iconCssPath, css, "utf-8");
  console.log(`✅  bootstrap-icons.min.css 경로 패치 완료`);
}

// ── Pretendard ───────────────────────────────────────────────────────────────

// Pretendard woff2 파일만 fonts 폴더로 복사
const pretendardSrc = path.join(ROOT, "node_modules/pretendard/dist/web/static");
const pretendardDest = path.join(ROOT, "src/assets/fonts/pretendard");

if (fs.existsSync(pretendardSrc)) {
  fs.mkdirSync(pretendardDest, { recursive: true });
  const woff2Files = fs.readdirSync(pretendardSrc).filter((f) => f.endsWith(".woff2"));
  woff2Files.forEach((file) => {
    fs.copyFileSync(path.join(pretendardSrc, file), path.join(pretendardDest, file));
  });
  console.log(`✅  복사 완료: src/assets/fonts/pretendard/ (${woff2Files.length}개 파일)`);
} else {
  console.warn(`⚠️  Pretendard 폴더 없음 (npm install 확인 필요)`);
}

// pretendard.css 폰트 경로 패치
const pretendardCssPath = path.join(ROOT, "src/assets/css/pretendard.css");
if (fs.existsSync(pretendardCssPath)) {
  let css = fs.readFileSync(pretendardCssPath, "utf-8");
  css = css.replace(/url\(['"]\.?\//g, (match) => match.replace(/\.?\//, "../fonts/pretendard/"));
  fs.writeFileSync(pretendardCssPath, css, "utf-8");
  console.log(`✅  pretendard.css 경로 패치 완료`);
}

// ── Font Awesome Pro (수동 배치 안내) ────────────────────────────────────────
const faCssPath = path.join(ROOT, "src/assets/css/fontawesome.min.css");
const faFontsPath = path.join(ROOT, "src/assets/fonts/fontawesome");

if (!fs.existsSync(faCssPath) || !fs.existsSync(faFontsPath)) {
  console.warn(`\n⚠️  Font Awesome Pro 파일이 없습니다. 수동으로 배치하세요:`);
  console.warn(`   src/assets/css/fontawesome.min.css`);
  console.warn(`   src/assets/fonts/fontawesome/  (webfonts 파일들)\n`);
} else {
  console.log(`✅  Font Awesome Pro 파일 확인 완료`);
}

console.log("\n✨ 셋업 완료! npm run dev 로 개발 서버를 시작하세요.\n");
