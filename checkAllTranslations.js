const fs = require("fs");
const path = require("path");

// المسارات
const CODE_DIR = path.join(__dirname, "apps/web/src");
const LOCALES_DIR = path.join(__dirname, "locales");

// دالة لقراءة كل الملفات من مجلد
function getAllFiles(dir, ext, files = []) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, ext, files);
    } else if (file.endsWith(ext)) {
      files.push(fullPath);
    }
  });
  return files;
}

// استخراج النصوص من الكود (t('...'))
function extractKeysFromCode() {
  const files = getAllFiles(CODE_DIR, ".tsx");
  let keys = new Set();

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf8");
    const regex = /t\(['"`](.*?)['"`]\)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      keys.add(match[1]);
    }
  });

  return Array.from(keys);
}

// قراءة ملف ترجمة
function getKeysFromLocale(filePath) {
  const json = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return Object.keys(json);
}

// تشغيل الفحص
function main() {
  const codeKeys = extractKeysFromCode();

  console.log("✅ Found keys in code:", codeKeys.length);

  const localeFiles = fs.readdirSync(LOCALES_DIR).filter((f) => f.endsWith(".json"));

  localeFiles.forEach((file) => {
    const localePath = path.join(LOCALES_DIR, file);
    const localeKeys = getKeysFromLocale(localePath);

    const missingInJson = codeKeys.filter((key) => !localeKeys.includes(key));
    const unusedInCode = localeKeys.filter((key) => !codeKeys.includes(key));

    console.log(`\n🌍 Checking ${file}`);
    console.log(" - Missing in JSON (موجودة في الكود بس مو موجودة في الترجمة):");
    console.log(missingInJson.length ? missingInJson : "✔️ لا يوجد");

    console.log(" - Unused in Code (موجودة في الترجمة بس مو مستخدمة):");
    console.log(unusedInCode.length ? unusedInCode : "✔️ لا يوجد");
  });
}

main();
