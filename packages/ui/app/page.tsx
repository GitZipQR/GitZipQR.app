// -----------------------------
"use client";
import { useEffect, useRef, useState } from "react";
import "./globals.css";

// Backend is hardcoded; no IP field in UI

type Plan = "oss" | "pro";
type Lang = "en" | "ru" | "kk" | "ar" | "zh";

const T: Record<Lang, any> = {
  en: {
    enc: "Encrypt → QR", dec: "Decrypt from QR", pick: "Browse…",
    selected: "Selected", dropFile: "Click/Drop a file or folder", outName: "Output name",
    runEncode: "Run Encode", cancel: "Cancel",
    openPdf: "Open PDF", open: "Open", showInFolder: "Show in folder",
    browsePdf: "Browse… PDF / Images", collect: "Assemble & Decrypt",
    logs: "Logs", bindPhoto: "Bind to photo", choosePhoto: "Choose photo",
    pass: "Password (≥20 chars)", passFile: "Use .txt/.bin", passText: "Type text",
    paperxToggle: "Enable PaperStorageX (all your data in page formatted A)",
    pxType: "Archive type", pxPage: "Page", pxDpi: "DPI", pxMargin: "Margin (mm)", pxCell: "Cell (px)", pxNano: "Nanotech",
    wallet: "Wallet", copy: "Copy", copied: "Copied!",
    support: "Support the project", supportNote: "Donations keep GitZipQR alive. Encryption/Decryption is free now.",
    liveScan: "Live Scan", stego: "Stego (WEBP)",
    browser: "Browser", webModeTitle: "Web mode",
    webModeText: "Encryption/decryption run on the server. Results will be available for download. Some desktop-only actions may be unavailable.",
    desktopRequired: "Desktop app required", copyNotAvailable: "Copy not available",
    webNote: "Web mode: processing runs on the server; results are provided for download.",
    donePdf: "Done: PDF ready", doneOpen: "Done: you may open",
  },
  ru: {
    enc: "Шифрование → QR", dec: "Расшифровка из QR", pick: "Выбрать…",
    selected: "Выбрано", dropFile: "Клик/Перетащите файл или папку", outName: "Имя выходного файла",
    runEncode: "Запустить шифрование", cancel: "Отмена",
    openPdf: "Открыть PDF", open: "Открыть", showInFolder: "Показать в папке",
    browsePdf: "Выбрать… PDF / Изображения", collect: "Собрать и Расшифровать",
    logs: "Логи", bindPhoto: "Привязать к фото", choosePhoto: "Выбрать фото",
    pass: "Пароль (≥20 символов)", passFile: "Файл .txt/.bin", passText: "Текстом",
    paperxToggle: "Включить PaperStorageX (Все ваши данные в листах формата A)",
    pxType: "Тип архива", pxPage: "Страница", pxDpi: "DPI", pxMargin: "Поле (мм)", pxCell: "Ячейка (px)", pxNano: "Nanotech",
    wallet: "Кошелёк", copy: "Скопировать", copied: "Скопировано!",
    support: "Поддержать проект", supportNote: "Пожертвования держат GitZipQR в строю. Кредиты для шифрования/расшифровки больше не нужны.",
    liveScan: "Live Scan", stego: "Стего (WEBP)",
    browser: "Браузер", webModeTitle: "Веб-режим",
    webModeText: "Шифрование/расшифровка выполняются на сервере. Результат будет доступен для скачивания. Часть действий доступна только в десктопной версии.",
    desktopRequired: "Нужен десктопный клиент", copyNotAvailable: "Копирование недоступно",
    webNote: "Веб-режим: обработка идёт на сервере, результат можно скачать.",
    donePdf: "Готово: PDF создан", doneOpen: "Готово: можно открыть",
  },
  kk: {
    enc: "Шифрлау → QR", dec: "QR-дан шешу", pick: "Таңдау…",
    selected: "Таңдалды", dropFile: "Файлды/қалтаны басып не сүйреп тастаңыз", outName: "Шығыс файлының атауы",
    runEncode: "Шифрлауды іске қосу", cancel: "Бас тарту",
    openPdf: "PDF ашу", open: "Ашу", showInFolder: "Қалтада көрсету",
    browsePdf: "Таңдау… PDF / Суреттер", collect: "Жинап, шешу",
    logs: "Логтар", bindPhoto: "Фотомен байланыстыру", choosePhoto: "Фотосурет таңдау",
    pass: "Құпиясөз (≥20 таңба)", passFile: ".txt/.bin файлын қолдану", passText: "Мәтінмен",
    paperxToggle: "PaperStorageX қосу (Барлық дерек A пішімді беттерде)",
    pxType: "Мұрағат түрі", pxPage: "Бет", pxDpi: "DPI", pxMargin: "Жиек (мм)", pxCell: "Ұяшық (px)", pxNano: "Nanotech",
    wallet: "Әмиян", copy: "Көшіру", copied: "Көшірілді!",
    support: "Жобаны қолдау", supportNote: "Донаттар GitZipQR-ды қолдайды. Шифрлау/шешу қазір тегін.",
    liveScan: "Тікелей скан", stego: "Стего (WEBP)",
    browser: "Браузер", webModeTitle: "Веб-режим",
    webModeText: "Шифрлау/шешу серверде орындалады. Нәтиже жүктеу үшін дайын болады. Кейбір әрекеттер тек десктопта қолжетімді.",
    desktopRequired: "Десктоп клиенті қажет", copyNotAvailable: "Көшіру қолжетімсіз",
    webNote: "Веб-режим: өңдеу серверде орындалады, нәтижені жүктеуге болады.",
    donePdf: "Дайын: PDF жасалды", doneOpen: "Дайын: ашуға болады",
  },
  ar: {
    enc: "تشفير → QR", dec: "فك التشفير من QR", pick: "اختر…",
    selected: "تم الاختيار", dropFile: "انقر/اسحب ملفًا أو مجلدًا", outName: "اسم ملف الإخراج",
    runEncode: "بدء التشفير", cancel: "إلغاء",
    openPdf: "فتح PDF", open: "فتح", showInFolder: "إظهار في المجلد",
    browsePdf: "اختر… PDF / صور", collect: "تجميع وفك التشفير",
    logs: "السجلات", bindPhoto: "ربط بصورة", choosePhoto: "اختر صورة",
    pass: "كلمة المرور (≥20 حرفًا)", passFile: "استخدام ملف .txt/.bin", passText: "إدخال نص",
    paperxToggle: "تفعيل PaperStorageX (كل بياناتك في صفحات بحجم A)",
    pxType: "نوع الأرشيف", pxPage: "الصفحة", pxDpi: "الدقة", pxMargin: "الهامش (مم)", pxCell: "الخلية (بكسل)", pxNano: "Nanotech",
    wallet: "المحفظة", copy: "نسخ", copied: "تم النسخ!",
    support: "ادعم المشروع", supportNote: "التبرعات تبقي GitZipQR حيًا. التشفير/فك التشفير مجاني الآن.",
    liveScan: "مسح مباشر", stego: "ستيجو (WEBP)",
    browser: "المتصفح", webModeTitle: "وضع الويب",
    webModeText: "يتم التشفير/فك التشفير على الخادم. ستكون النتيجة متاحة للتنزيل. بعض الإجراءات متاحة فقط على سطح المكتب.",
    desktopRequired: "يتطلب تطبيق سطح المكتب", copyNotAvailable: "النسخ غير متاح",
    webNote: "وضع الويب: تتم المعالجة على الخادم والنتيجة جاهزة للتنزيل.",
    donePdf: "تم: PDF جاهز", doneOpen: "تم: يمكنك الفتح",
  },
  zh: {
    enc: "加密 → QR", dec: "从 QR 解密", pick: "选择…",
    selected: "已选择", dropFile: "点击/拖放文件或文件夹", outName: "输出名称",
    runEncode: "开始加密", cancel: "取消",
    openPdf: "打开 PDF", open: "打开", showInFolder: "在文件夹中显示",
    browsePdf: "选择… PDF / 图片", collect: "汇总并解密",
    logs: "日志", bindPhoto: "绑定照片", choosePhoto: "选择照片",
    pass: "密码（≥20 个字符）", passFile: "使用 .txt/.bin 文件", passText: "文本",
    paperxToggle: "启用 PaperStorageX（所有数据以 A 格式页面保存）",
    pxType: "归档类型", pxPage: "页面", pxDpi: "DPI", pxMargin: "边距 (mm)", pxCell: "单元格 (px)", pxNano: "Nanotech",
    wallet: "钱包", copy: "复制", copied: "已复制！",
    support: "支持项目", supportNote: "捐赠可让 GitZipQR 持续运行。现在加密/解密免费。",
    liveScan: "实时扫描", stego: "隐写 (WEBP)",
    browser: "浏览器", webModeTitle: "网页模式",
    webModeText: "加密/解密在服务器上进行，结果可下载。部分操作仅限桌面版。",
    desktopRequired: "需要桌面应用", copyNotAvailable: "无法复制",
    webNote: "网页模式：在服务器处理，结果可下载。",
    donePdf: "完成：PDF 已生成", doneOpen: "完成：可以打开",
  }
};

const WALLET_ADDR = "0xa8b3A40008EDF9AF21D981Dc3A52aa0ed1cA88fD";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const useIPC = (ch: string) => async (payload?: any) => await (window as any)?.electron?.ipc?.invoke?.(ch, payload);

function Toast({ msg, kind }: { msg: string; kind?: "ok" | "err" }) {
  if (!msg) return null;
  return <div className={`toast ${kind === "err" ? "err" : ""}`}>{msg}</div>;
}
function Progress({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value | 0));
  return (<div><div className="progress"><span style={{ width: `${v}%` }} /></div><div style={{ marginTop: 6, fontSize: 12 }}>{v}%</div></div>);
}

export default function Page() {
  const [lang, setLang] = useState<Lang>("ru"); const tr = T[lang];
  const isRtl = lang === "ar";
  const [plan, setPlan] = useState<Plan>("pro"); // default PRO UI
  const [toast, setToast] = useState<{ m: string; k?: "ok" | "err" } | null>(null);
  const notify = (m: string, k?: "ok" | "err") => { setToast({ m, k }); setTimeout(() => setToast(null), 2200); };

  const [hasIPC, setHasIPC] = useState(false);
  const [hasBridge, setHasBridge] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const encFileRef = useRef<HTMLInputElement | null>(null);
  const decFileRef = useRef<HTMLInputElement | null>(null);
  const decDirRef = useRef<HTMLInputElement | null>(null);
  const bridgeReady = hasBridge || hasIPC;

  useEffect(() => {
    setIsClient(true);
    const w: any = window as any;
    setHasBridge(Boolean(w?.gzqrExtra || w?.electron?.ipc));
    setHasIPC(Boolean((window as any)?.electron?.ipc));
  }, []);

  // Keep hidden pickers configured depending on bridge availability
  useEffect(() => {
    if (encFileRef.current) {
      encFileRef.current.multiple = true;
      if (!bridgeReady) {
        encFileRef.current.setAttribute("webkitdirectory", "true");
        encFileRef.current.setAttribute("directory", "true");
      } else {
        encFileRef.current.removeAttribute("webkitdirectory");
        encFileRef.current.removeAttribute("directory");
      }
    }
    if (decFileRef.current) {
      decFileRef.current.multiple = true;
      decFileRef.current.removeAttribute("webkitdirectory");
      decFileRef.current.removeAttribute("directory");
    }
    if (decDirRef.current) {
      decDirRef.current.multiple = true;
      decDirRef.current.setAttribute("webkitdirectory", "true");
      decDirRef.current.setAttribute("directory", "true");
    }
  }, [bridgeReady]);

  const isWebUrl = (p: string) => /^blob:|^https?:/i.test(p || "");
  const downloadUrl = (url: string) => {
    const a = document.createElement("a");
    a.href = url;
    const name = webNamesRef.current.get(url) || "";
    if (name) a.download = name;
    a.rel = "noopener";
    a.click();
  };

  // resilient open helpers (Electron IPC -> gzqrExtra fallback)
  const openPath = async (path: string) => {
    try {
      const w: any = window as any;
      if (!bridgeReady && !(w?.electron?.ipc)) {
        if (isWebUrl(path)) { window.open(path, "_blank", "noopener"); return; }
        notify(tr.desktopRequired, "err"); return;
      }
      if (w?.gzqrExtra?.openPath) return await w.gzqrExtra.openPath(path);
      return await w?.electron?.ipc?.invoke?.("file.openPath", path);
    } catch (e) { notify("Open error: " + String((e as any)?.message || e), "err"); }
  };
  const showInFolder = async (path: string) => {
    try {
      const w: any = window as any;
      if (!bridgeReady && !(w?.electron?.ipc)) {
        if (isWebUrl(path)) { downloadUrl(path); return; }
        notify(tr.desktopRequired, "err"); return;
      }
      if (w?.gzqrExtra?.showInFolder) return await w.gzqrExtra.showInFolder(path);
      return await w?.electron?.ipc?.invoke?.("file.showInFolder", path);
    } catch (e) { notify("Show error: " + String((e as any)?.message || e), "err"); }
  };

  // password
  const [passMode, setPassMode] = useState<"text" | "file">("text");
  const [pass, setPass] = useState(""); const passOk = pass.length >= 20;
  const [passFile, setPassFile] = useState<string>("");
  const [passFileObj, setPassFileObj] = useState<File | null>(null);

  // IO
  const [encIn, setEncIn] = useState("");
  const [encFiles, setEncFiles] = useState<File[]>([]);
  const [outName, setOutName] = useState("1"); // default numbering base
  const [bindPhoto, setBindPhoto] = useState(false); const [photoPath, setPhotoPath] = useState("");

  // PaperX (FREE only)
  const [usePaperX, setUsePaperX] = useState<boolean>(false);
  const [pxType, setPxType] = useState<"zip" | "tar">("tar");
  const [pxPage, setPxPage] = useState<string>("A4");
  const [pxDpi, setPxDpi] = useState<number>(600);
  const [pxMargin, setPxMargin] = useState<number>(5);
  const [pxCell, setPxCell] = useState<number>(1);
  const [pxNano, setPxNano] = useState<boolean>(false);

  // progress & results
  const [pEnc, setPEnc] = useState(0), [pDec, setPDec] = useState(0);
  const [logs, setLogs] = useState("⛔");
  const [pdf, setPdf] = useState(""); const [pngDir, setPngDir] = useState("");
  const [decOutDir, setDecOutDir] = useState(""), [decTar, setDecTar] = useState(""), [decFile, setDecFile] = useState("");
  const [decFiles, setDecFiles] = useState<File[]>([]);
  const webNamesRef = useRef<Map<string, string>>(new Map());

  // hook progress streams
  useEffect(() => {
    if (!hasIPC) return; const off = (window as any).electron?.ipc?.onProgress?.((d: any) => {
      setLogs(p => p === "—" ? d.line : (p + "\n" + d.line));
      let m = d.line.match(/chunk\s+(\d+)\/(\d+)/i); if (m) setPEnc(Math.floor(+m[1] * 100 / +m[2]));
      m = d.line.match(/collected chunk\s+(\d+)\/(\d+)/i); if (m) setPDec(Math.floor(+m[1] * 100 / +m[2]));
    }); return () => { try { off?.(); } catch { } };
  }, [hasIPC]);

  const havePass = passMode === "file" ? !!passFile : passOk;
  const browserOnly = isClient && !bridgeReady;

  // Кнопки не зависят от кредитов; в браузере даём нажать и показываем подсказку.
  const canEncode = !!encIn && havePass && (!bindPhoto || !!photoPath);
  const canDecode = !!(pngDir || pdf) && havePass;
  const encShowTarget = pngDir || pdf;
  const canOpenPdf = !!pdf && (bridgeReady || isWebUrl(pdf));
  const canShowEnc = !!encShowTarget && (bridgeReady || isWebUrl(encShowTarget));
  const decOpenTarget = decFile || decTar || decOutDir || pdf;
  const decShowTarget = decOutDir || decTar || pngDir;
  const canOpenDec = !!decOpenTarget && (bridgeReady || isWebUrl(decOpenTarget));
  const canShowDec = !!decShowTarget && (bridgeReady || isWebUrl(decShowTarget));

  const ipcPick = useIPC("file.pickPath"), ipcPdf = useIPC("pdf.toPngs");

  // clamp PaperX for stability
  const safePxDpi = clamp(pxDpi, 72, 1200);
  const safePxCell = clamp(pxCell, 1, 4);
  const safePxMargin = clamp(pxMargin, 0, 20);

  const copyWallet = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(WALLET_ADDR);
        notify(tr.copied, "ok"); return;
      }
      if ((window as any).gzqrExtra?.copy) {
        await (window as any).gzqrExtra.copy(WALLET_ADDR);
        notify(tr.copied, "ok"); return;
      }
      notify(tr.copyNotAvailable, "err");
    } catch (e: any) { notify(String(e?.message || e), "err"); }
  };

  const webEncode = async () => {
    try {
      if (!encFiles.length) { notify(tr.dropFile, "err"); return; }
      if (passMode === "file" && !passFileObj) { notify(tr.passFile, "err"); return; }
      if (plan === "oss" && usePaperX) { notify(tr.desktopRequired, "err"); return; }
      setPEnc(0); setPdf(""); setPngDir("");
      const form = new FormData();
      encFiles.forEach((f) => {
        form.append("files", f, f.name);
        const rel = (f as any).webkitRelativePath || f.name;
        form.append("paths", rel);
      });
      if (passMode === "file" && passFileObj) form.append("passFile", passFileObj, passFileObj.name);
      else form.append("pass", pass);
      form.append("makePdf", plan === "pro" ? "1" : "0");
      form.append("outName", outName || "");
      const res = await fetch("/api/gzqr/encode", { method: "POST", body: form });
      if (!res.ok) { const t = await res.text(); notify(t || "Encode error", "err"); return; }
      const kind = res.headers.get("x-gzqr-kind") || (plan === "pro" ? "pdf" : "zip");
      const filename = res.headers.get("x-gzqr-filename") || (kind === "pdf" ? "QR.pdf" : "qrcodes.zip");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      webNamesRef.current.set(url, filename);
      if (kind === "pdf") { setPdf(url); setPngDir(""); notify(tr.donePdf, "ok"); }
      else { setPngDir(url); setPdf(""); notify("QR PNG ready", "ok"); }
      setPEnc(100);
    } catch (e: any) { notify(String(e?.message || e), "err"); }
  };

  const webDecode = async () => {
    try {
      if (!decFiles.length) { notify(tr.browsePdf, "err"); return; }
      if (passMode === "file" && !passFileObj) { notify(tr.passFile, "err"); return; }
      setPDec(0);
      const form = new FormData();
      decFiles.forEach((f) => {
        form.append("files", f, f.name);
        const rel = (f as any).webkitRelativePath || f.name;
        form.append("paths", rel);
      });
      if (passMode === "file" && passFileObj) form.append("passFile", passFileObj, passFileObj.name);
      else form.append("pass", pass);
      const res = await fetch("/api/gzqr/decode", { method: "POST", body: form });
      if (!res.ok) { const t = await res.text(); notify(t || "Decode error", "err"); return; }
      const kind = res.headers.get("x-gzqr-kind") || "file";
      const filename = res.headers.get("x-gzqr-filename") || (kind === "file" ? "restored.bin" : "restored.tar");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      webNamesRef.current.set(url, filename);
      if (kind === "file") { setDecFile(url); setDecTar(""); setDecOutDir(""); }
      else { setDecTar(url); setDecFile(""); setDecOutDir(""); }
      setPDec(100);
      notify(tr.doneOpen, "ok");
    } catch (e: any) { notify(String(e?.message || e), "err"); }
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} style={{ display: "grid", gap: 14, maxWidth: 980, margin: "16px auto" }}>
      <Toast msg={toast?.m || ""} kind={toast?.k} />
      {/* Top controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>GitZipQR</h2>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {browserOnly && <div className="tag">{tr.browser}</div>}
          <div>
            <button className={`tag ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
            <button className={`tag ${lang === "ru" ? "active" : ""}`} onClick={() => setLang("ru")}>RU</button>
            <button className={`tag ${lang === "kk" ? "active" : ""}`} onClick={() => setLang("kk")}>KZ</button>
            <button className={`tag ${lang === "ar" ? "active" : ""}`} onClick={() => setLang("ar")}>AR</button>
            <button className={`tag ${lang === "zh" ? "active" : ""}`} onClick={() => setLang("zh")}>中文</button>
          </div>
          <div><button className={`tag ${plan === "oss" ? "active" : ""}`} onClick={() => setPlan("oss")}>OSS</button><button className={`tag ${plan === "pro" ? "active" : ""}`} onClick={() => setPlan("pro")}>PRO</button></div>
        </div>
      </div>

      {browserOnly && (
        <div className="card" style={{ display: "grid", gap: 6 }}>
          <strong>{tr.webModeTitle}</strong>
          <div style={{ fontSize: 13, opacity: .85 }}>
            {tr.webModeText}
          </div>
        </div>
      )}

      {/* Payments */}
      <section className="card" style={{ display: "grid", gap: 10 }}>
        <h3>💳 {tr.support}</h3>
        <div style={{ fontSize: 14, opacity: .9 }}>{tr.supportNote}</div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <div className="link-pill">{WALLET_ADDR}</div>
          <button onClick={copyWallet}>{tr.copy}</button>
        </div>
        <div style={{ fontSize: 12, opacity: .65 }}>USDC / ETH · Ethereum mainnet</div>
      </section>

      {/* Bind to photo */}
      <div className="card" style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <label className="ios-switch" title="Stego binding">
          <input type="checkbox" checked={bindPhoto} onChange={e => setBindPhoto(e.target.checked)} />
          <span className="label">{tr.bindPhoto}</span>
        </label>
        <button disabled={!bindPhoto || !bridgeReady} onClick={async () => {
          if (!bridgeReady) { notify(tr.desktopRequired, "err"); return; }
          const r = await (window as any).gzqrExtra?.pickImage?.(); if (r?.ok) setPhotoPath(r.path);
        }}>{tr.choosePhoto}</button>
        <div style={{ fontSize: 12, opacity: .85 }}>Фото: <code>{photoPath || "—"}</code></div>
      </div>

      {/* Encrypt */}
      <section className="card" style={{ display: "grid", gap: 12 }}>
        <h3>🔒 {tr.enc} {plan === "pro" && <small style={{ opacity: .6 }}> (PDF grid only)</small>}</h3>

        {plan === 'oss' && (
          <label className="ios-switch" title="PaperStorageX (FREE)">
            <input type="checkbox" checked={plan === "oss" && usePaperX} onChange={e => setUsePaperX(e.target.checked)} />
            <span className="label">{tr.paperxToggle}</span>
          </label>
        )}

        {/* Password source */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <label className="tag"><input type="radio" checked={passMode === "text"} onChange={() => setPassMode("text")} /> {tr.passText}</label>
          <label className="tag"><input type="radio" checked={passMode === "file"} onChange={() => setPassMode("file")} /> {tr.passFile}</label>
          {passMode === "file" ? (
            <>
              <button onClick={async () => {
                if (bridgeReady) {
                  const r = await (window as any).gzqrExtra?.pickPassFile?.(); if (r?.ok) { setPassFile(r.path); setPassFileObj(null); }
                } else {
                  const input = document.createElement("input");
                  input.type = "file"; input.accept = ".txt,.bin,.key,.pass";
                  input.onchange = () => { const f = input.files?.[0]; if (f) { setPassFile(f.name); setPassFileObj(f); } };
                  input.click();
                }
              }}>Browse…</button>
              <code style={{ fontSize: 12, opacity: .85 }}>{passFile || `⛔`}</code>
            </>
          ) : (
            <>
              <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder={tr.pass} style={{ minWidth: 280 }} />
              {(!passOk) && <div style={{ color: "#ff7b7b", fontSize: 12 }}>{tr.pass}</div>}
            </>
          )}
        </div>

        {/* Input + outName */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={async () => {
            if (bridgeReady) {
              const r = await useIPC("file.pickPath")({ mode: "fileOrDir" }); if (r?.ok) setEncIn(r.path);
            } else {
              encFileRef.current?.click();
            }
          }}>{tr.pick}</button>
          <input ref={encFileRef} type="file" style={{ display: "none" }} accept=".zip,.tar,.gz,.tgz,.7z,.rar" onChange={e => {
            const list = Array.from(e.target.files || []);
            setEncFiles(list);
            const f = list[0];
            if (f) {
              const rel = (f as any).webkitRelativePath || "";
              if (rel) setEncIn(rel.split("/")[0] || f.name);
              else setEncIn(f.name);
            }
          }} />
          <div style={{ fontSize: 12, opacity: .85 }}>{tr.selected}: <code>{encIn || "⛔"}</code></div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 12, opacity: .85 }}>{tr.outName}</span>
            <input value={outName} onChange={e => setOutName(e.target.value)} style={{ width: 180 }} />
          </div>
        </div>
        <div className="drop" onDragOver={e => e.preventDefault()} onDrop={e => {
          e.preventDefault();
          const list = Array.from(e.dataTransfer!.files || []);
          setEncFiles(list);
          const f = list[0] as any;
          const p = (f?.path || "");
          if (p) setEncIn(p);
          else if (f?.name) setEncIn(f.name);
        }}>{tr.dropFile}</div>

        {/* PaperX settings */}
        {plan === "oss" && usePaperX && (
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10 }}>
              <div><div style={{ fontSize: 12, opacity: .8 }}>{tr.pxType}</div><select value={pxType} onChange={e => setPxType(e.target.value as any)}><option value="tar">tar</option><option value="zip">zip</option></select></div>
              <div><div style={{ fontSize: 12, opacity: .8 }}>{tr.pxPage}</div><select value={pxPage} onChange={e => setPxPage(e.target.value)}>{["A0", "A1", "A2", "A3", "A4"].map(p => <option key={p} value={p}>{p}</option>)}</select></div>
              <div><div style={{ fontSize: 12, opacity: .8 }}>{tr.pxDpi}</div><input type="number" min={72} max={1200} step={50} value={safePxDpi} onChange={e => setPxDpi(parseInt(e.target.value || "600", 10) || 600)} /></div>
              <div><div style={{ fontSize: 12, opacity: .8 }}>{tr.pxMargin}</div><input type="number" min={0} max={20} step={1} value={safePxMargin} onChange={e => setPxMargin(parseInt(e.target.value || "5", 10) || 5)} /></div>
              <div><div style={{ fontSize: 12, opacity: .8 }}>{tr.pxCell}</div><input type="number" min={1} max={4} step={1} value={safePxCell} onChange={e => setPxCell(parseInt(e.target.value || "1", 10) || 1)} /></div>
            </div>
            <label className="tag"><input type="checkbox" checked={pxNano} onChange={e => setPxNano(e.target.checked)} /> {tr.pxNano}</label>
          </div>
        )}

        {/* Action row */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" disabled={!canEncode} onClick={async () => {
            if (!bridgeReady) { await webEncode(); return; }
            try {
              setPEnc(0); setPdf(""); setPngDir("");
              if (plan === "pro") {
                const r = await (window as any).gzqrExtra?.encRun?.({ input: encIn, ...(passMode === "file" ? { passFile } : { pass }), makePdf: true, photo: bindPhoto ? photoPath : undefined, outName, pro: true });
                if (!r?.ok) { notify("Encode error", "err"); return; }
                if (r.pdf) setPdf(r.pdf);
                notify(tr.donePdf, "ok");
              } else {
                if (usePaperX) {
                  const r = await (window as any).gzqrExtra?.paperxRun?.({
                    mode: "encode", input: encIn, ...(passMode === "file" ? { passFile } : { pass }),
                    outBase: outName, type: pxType, page: pxPage, dpi: safePxDpi, marginMM: safePxMargin, cell: safePxCell, nanotech: pxNano, outDir: ".gzqr_tmp/paperx"
                  });
                  if (!r?.ok) { notify("PaperStorageX error", "err"); return; }
                  if (r.pdfPath) setPdf(r.pdfPath);
                  notify("PaperStorageX PDF ready", "ok");
                } else {
                  const r = await (window as any).gzqrExtra?.encRun?.({ input: encIn, ...(passMode === "file" ? { passFile } : { pass }), makePdf: false, photo: bindPhoto ? photoPath : undefined, outName, pro: false });
                  if (!r?.ok) { notify("Encode error", "err"); return; }
                  if (r.pngDir) setPngDir(r.pngDir);
                  if (r.pdf) setPdf(r.pdf);
                  notify("QR PNG ready", "ok");
                }
              }
            } catch (e: any) { notify(String(e?.message || e), "err"); }
          }}>🧩 {tr.runEncode}</button>

          <button disabled={!bridgeReady} onClick={() => { if (!bridgeReady) return; (window as any).gzqrExtra?.encCancel?.(); }}>{tr.cancel}</button>

          {(plan === "pro") && (
            <>
              <button disabled={!canOpenPdf} onClick={() => openPath(pdf)}>{tr.openPdf}</button>
              <button disabled={!canShowEnc} onClick={() => showInFolder(pngDir || pdf)}>{tr.showInFolder}</button>
              <button disabled={!bridgeReady || (!pngDir && !pdf)} onClick={async () => {
                if (!bridgeReady) { notify(tr.desktopRequired, "err"); return; }
                const canvas = document.createElement("canvas"); const ctx = canvas.getContext("2d")!;
                canvas.width = 2048; canvas.height = 2048; ctx.fillStyle = "#000"; ctx.fillRect(0, 0, 2048, 2048);
                const data = canvas.toDataURL("image/webp", 0.95);
                const save = await (window as any).gzqrExtra?.saveWebp?.(data, (outName || "backup") + ".webp");
                if (save?.ok) notify("WEBP saved: " + save.path, "ok"); else notify("Stego save error", "err");
              }}>{tr.stego}</button>
            </>
          )}
          {(plan === "oss" && usePaperX) && (
            <>
              <button disabled={!canOpenPdf} onClick={() => openPath(pdf)}>{tr.openPdf}</button>
              <button disabled={!canOpenPdf} onClick={() => showInFolder(pdf)}>{tr.showInFolder}</button>
            </>
          )}
          {(plan === "oss" && !usePaperX) && (
            <>
              <button disabled={!canShowEnc} onClick={() => showInFolder(pngDir)}>{tr.showInFolder}</button>
            </>
          )}
        </div>
        {browserOnly && <div style={{ fontSize: 12, opacity: .7 }}>{tr.webNote}</div>}
        <Progress value={pEnc} />
      </section>

      {/* Decrypt */}
      <section className="card" style={{ display: "grid", gap: 12 }}>
        <h3>🔓 {tr.dec}</h3>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={async () => {
            if (bridgeReady) {
              const r = await (window as any).gzqrExtra?.pickPDF?.(); if (r?.ok) { const x = await ipcPdf({ pdf: r.path, pro: plan === "pro" }); if (x?.dir) { setPngDir(x.dir); setPdf(r.path); } }
            } else {
              const input = document.createElement("input");
              input.type = "file"; input.accept = ".pdf,.png,.webp";
              input.onchange = () => { const f = input.files?.[0]; if (f) { setDecFiles([f]); setPdf(f.name); setPngDir(f.name); } };
              input.click();
            }
          }}>{tr.browsePdf}</button>
          <button onClick={async () => {
            if (bridgeReady) {
              const r = await useIPC("file.pickPath")({ mode: "dir" }); if (r?.ok) { setPngDir(r.path); setPdf(""); }
            } else {
              // allow picking directory of images via fake directory input
              decDirRef.current?.click();
            }
          }}>{tr.pick}</button>
          <input ref={decFileRef} type="file" style={{ display: "none" }} accept=".pdf,.png,.webp" onChange={e => {
            const list = Array.from(e.target.files || []);
            setDecFiles(list);
            const f = list[0];
            if (f) { setPngDir(f.name); setPdf(f.name); }
          }} />
          <input ref={decDirRef} type="file" style={{ display: "none" }} multiple onChange={e => {
            const list = Array.from(e.target.files || []);
            setDecFiles(list);
            const f = list[0];
            if (f) {
              const rel = (f as any).webkitRelativePath || "";
              if (rel) {
                setPngDir(rel.split("/")[0] || f.name);
                setPdf("");
              } else {
                setPngDir(f.name);
                setPdf(f.name);
              }
            }
          }} />
          <div style={{ fontSize: 12, opacity: .85 }}><code>{pdf || pngDir || "⛔"}</code></div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <label className="tag"><input type="radio" checked={passMode === "text"} onChange={() => setPassMode("text")} /> {tr.passText}</label>
          <label className="tag"><input type="radio" checked={passMode === "file"} onChange={() => setPassMode("file")} /> {tr.passFile}</label>
          {passMode === "file"
            ? (<><button onClick={async () => {
              if (bridgeReady) {
                const r = await (window as any).gzqrExtra?.pickPassFile?.(); if (r?.ok) { setPassFile(r.path); setPassFileObj(null); }
              } else {
                const input = document.createElement("input"); input.type = "file"; input.accept = ".txt,.bin,.key,.pass";
                input.onchange = () => { const f = input.files?.[0]; if (f) { setPassFile(f.name); setPassFileObj(f); } };
                input.click();
              }
            }}>Browse…</button><code style={{ fontSize: 12, opacity: .85 }}>{passFile || "⛔"}</code></>)
            : (<input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder={tr.pass} style={{ minWidth: 280 }} />)}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <button className="btn-primary" disabled={!canDecode} onClick={async () => {
            if (!bridgeReady) { await webDecode(); return; }
            try {
              setPDec(0);
              const r = await (window as any).gzqrExtra?.decRun?.({ dir: pngDir, ...(passMode === "file" ? { passFile } : { pass }), photo: bindPhoto ? photoPath : undefined, outName, pro: plan === "pro" });
              if (!r?.ok) { notify("Decode error", "err"); return; }
              setDecOutDir(r.outDir || ""); setDecTar(r.tarPath || ""); setDecFile(r.restoredFile || "");
              notify(tr.doneOpen, "ok");
            } catch (e: any) { notify(String(e?.message || e), "err"); }
          }}>{tr.collect}</button>
          <button disabled={!bridgeReady} onClick={() => { if (!bridgeReady) return; (window as any).gzqrExtra?.decCancel?.(); }}>{tr.cancel}</button>
          {plan === "pro" && <button disabled={!bridgeReady} onClick={async () => {
            if (!bridgeReady) { notify(tr.desktopRequired, "err"); return; }
            const r = await (window as any).gzqrExtra?.liveScan?.(); if (!r?.ok) notify("Live scan error", "err"); else notify("Live scan started", "ok");
          }}>{tr.liveScan}</button>}
          <button disabled={!canOpenDec} onClick={() => openPath(decFile || decTar || decOutDir || pdf)}>{tr.open}</button>
          <button disabled={!canShowDec} onClick={() => showInFolder(decOutDir || decTar || pngDir)}>{tr.showInFolder}</button>
        </div>
        {browserOnly && <div style={{ fontSize: 12, opacity: .7 }}>{tr.webNote}</div>}
        <Progress value={pDec} />
        {(decTar || decOutDir || decFile) && <div style={{ fontSize: 12, opacity: .9 }}>
          {decTar && <>TAR: <code>{decTar}</code><br /></>}
          {decFile && <>File: <code>{decFile}</code><br /></>}
          {decOutDir && <>Dir: <code>{decOutDir}</code></>}
        </div>}
      </section>

      <section className="card"><h3>{tr.logs}</h3><pre className="logs">{logs}</pre></section>
    </div>
  );
}
// -----------------------------
