# [EN]
## *OpenSource product!*
# SUPPORTED ONLY CORE LINUX
# How use?
- For start download package manager (https://bun.com/)[BUN]
```bash
git clone https://github.com:GitZipQR/GitZipQR.app.git
cd GitZipQR.app
bun install
git clone https://github.com:GitZipQR/GitZip.cpp 
git clone https://github.com:GitZipQR/PaperStorageX
./rub.sh 
```
# web interface dostup from url > **http://localhost:5123**
### !!!!WARNING!!!!
if you make port forwarding from MikroTIK on static IP = no recommended, hackers can using your performance local machine, better using you local network for secure cryptography.
## !!!!WARNING!!!!
# LICENSE
GitZipQR Proprietary License
============================
[ENG]

1. This application "GitZipQR" (including source code, compiled binaries, distributions,
   and any related documentation) is the intellectual property of the author:
   Daniil V [RestlessByte].

2. Prohibited:
   • Copying, modifying, distributing this application or any part of it without the
     author’s written consent.
   • Using the project or its ideas to create similar applications, prototypes, or
     derivative products.
   • Publishing, providing, or selling this project under your own name, or claiming it as
     your own work.
   • Reverse engineering, decompiling, disassembling, or otherwise attempting to
     tamper with the application or its components.
   • Any attempt to bypass technical protection measures or the restrictions of this license.

3. Allowed:
   • Use of the application for personal purposes only (no distribution or publication).
   • Reviewing the functionality exclusively in user mode (without tampering with source
     code or binaries).

4. Violation:
   • Any violation of this license entails legal liability under the Civil Code of the
     Russian Federation (Part IV), Russian copyright law, and international agreements
     (Berne Convention of 1886).
   • In the event of unlawful copying, modification, reverse engineering, or other
     violations, the author reserves the right to immediately seek legal counsel and pursue
     judicial remedies.

5. Enforcement:
   • The author may demand the removal of all illegal copies, compensation for damages,
     and the application of penalties under the DMCA (Digital Millennium Copyright Act)
     and applicable international law.

# GitZipQR Pro — Electron + Next.js shell

**Core idea:** ship a hardened UI around your existing C++ binaries (`encode`/`decode`), add A4 PDF packing, Live Scan, and a licensing check via ETH/USDT on your address. This repo avoids touching your C++ core.

## Features
- Runs your binaries for Encode/Decode.
- Packs PNG chunks into A4 PDF (3x3 grid).
- Live Scan: assemble chunks from a line-feed barcode scanner.
- License: machine fingerprint + payment check (USDT>=1500 or ETH>=0.5).
- Hardening: `asar`, minification, JS obfuscation, optional AES-GCM layer for a bootstrap file.

> No protection is absolute. Keys live in memory at runtime. This stack raises attacker cost.

## Dev
1. Copy `.env.example` to `.env`, set:
   - `ETH_RPC`
   - `BIN_ENC` / `BIN_DEC` (your built C++ binaries)
2. `./start-dev.sh`

## Build
- Linux AppImage: `bun run dist:linux`
- Windows NSIS .exe: `bun run dist:win`

Artifacts are placed in `packages/app/release/`.

## Commands
- `bun run dev` — run Next (UI) + Electron.
- `bun run pack-a4 <dir> <out.pdf>` — build A4 sheets.
- `bun run scan-live` — collect chunks from scanner (stdin).

## Notes on hardening
- `electron-builder` with `asar: true`.
- `javascript-obfuscator` passes: control-flow, dead-code, string-array, debug-protection.
- Optional AES-GCM: decrypt a small bootstrap at runtime with a key derived from machineHash + secret.
- Consider code signing and a commercial native protector for Windows if you need more (VM-based).


# [AR]
## *منتج مفتوح المصدر!*
# مدعوم فقط نواة لينكس
# كيفية الاستخدام؟
- للبدء حمّل مدير الحزم [BUN](https://bun.com)
```bash
git clone https://github.com:GitZipQR/GitZipQR.app.git
cd GitZipQR.app
bun install
git clone https://github.com:GitZipQR/GitZip.cpp 
git clone https://github.com:GitZipQR/PaperStorageX
./rub.sh 
```
# واجهة الويب متاحة على العنوان > **http://localhost:5123**
### !!!!تحذير!!!!
إذا قمت بعمل تحويل منفذ من MikroTIK على عنوان IP ثابت فهذا غير مُوصى به، فقد يستخدم المهاجمون جهازك المحلي. من الأفضل استخدام الشبكة المحلية للتشفير الآمن.
## !!!!تحذير!!!!
# الترخيص
GitZipQR Proprietary License
============================
[AR]

1. هذا التطبيق "GitZipQR" (بما في ذلك الشفرة المصدرية، الملفات التنفيذية المجمعة، التوزيعات،
   وأي مستندات ذات صلة) هو ملكية فكرية للمؤلف:
   Daniil V [RestlessByte].

2. محظور:
   • نسخ أو تعديل أو توزيع هذا التطبيق أو أي جزء منه دون موافقة خطية من المؤلف.
   • استخدام المشروع أو أفكاره لإنشاء تطبيقات مشابهة أو نماذج أولية أو منتجات مشتقة.
   • نشر هذا المشروع أو تقديمه أو بيعه باسمك، أو الادعاء بأنه عملك.
   • الهندسة العكسية أو فك التجميع أو التفكيك أو محاولة العبث بالتطبيق أو مكوناته.
   • أي محاولة لتجاوز وسائل الحماية التقنية أو قيود هذه الرخصة.

3. مسموح:
   • استخدام التطبيق لأغراض شخصية فقط (بدون توزيع أو نشر).
   • مراجعة الوظائف حصراً في وضع المستخدم (بدون العبث بالكود أو الملفات التنفيذية).

4. المخالفة:
   • أي مخالفة لهذه الرخصة تترتب عليها مسؤولية قانونية بموجب القانون المدني للاتحاد الروسي (الجزء الرابع)،
     وقانون حقوق النشر الروسي، والاتفاقيات الدولية (اتفاقية برن 1886).
   • في حال النسخ أو التعديل أو الهندسة العكسية أو أي انتهاكات أخرى، يحتفظ المؤلف بحقه في طلب استشارة
     قانونية فوراً والسعي للإنصاف القضائي.

5. الإنفاذ:
   • يحق للمؤلف المطالبة بإزالة جميع النسخ غير القانونية، والتعويض عن الأضرار،
     وتطبيق العقوبات بموجب DMCA (قانون حقوق النشر للألفية الرقمية) والقانون الدولي المعمول به.

# GitZipQR Pro — غلاف Electron + Next.js

**الفكرة الأساسية:** واجهة محصنة حول ثنائيات C++ الحالية (`encode`/`decode`)، مع إضافة تجميع PDF بحجم A4،
ومسح مباشر (Live Scan)، والتحقق من الترخيص عبر ETH/USDT على عنوانك. هذا المستودع لا يغيّر نواة C++.

## الميزات
- تشغيل ثنائياتك للترميز/فك الترميز.
- تجميع أجزاء PNG في PDF بحجم A4 (شبكة 3x3).
- Live Scan: تجميع الأجزاء من ماسح باركود خطي.
- الترخيص: بصمة الجهاز + التحقق من الدفع (USDT>=1500 أو ETH>=0.5).
- التحصين: `asar`، تصغير، تشويش JavaScript، طبقة اختيارية AES-GCM لملف إقلاع صغير.

> لا توجد حماية مطلقة. المفاتيح موجودة في الذاكرة أثناء التشغيل. هذه المنظومة ترفع تكلفة الهجوم.

## التطوير
1. انسخ `.env.example` إلى `.env` واضبط:
   - `ETH_RPC`
   - `BIN_ENC` / `BIN_DEC` (ثنائيات C++ المبنية)
2. `./start-dev.sh`

## البناء
- Linux AppImage: `bun run dist:linux`
- Windows NSIS .exe: `bun run dist:win`

يتم وضع المخرجات في `packages/app/release/`.

## الأوامر
- `bun run dev` — تشغيل Next (واجهة المستخدم) + Electron.
- `bun run pack-a4 <dir> <out.pdf>` — إنشاء صفحات A4.
- `bun run scan-live` — جمع الأجزاء من الماسح (stdin).

## ملاحظات حول التحصين
- `electron-builder` مع `asar: true`.
- تمريرات `javascript-obfuscator`: التحكم بالتدفق، الشيفرة الميتة، مصفوفة السلاسل، حماية التصحيح.
- طبقة AES-GCM اختيارية: فك تشفير Bootstrap صغير أثناء التشغيل بمفتاح مشتق من machineHash + secret.
- فكّر في توقيع الكود وحماية أصلية تجارية لنظام Windows إذا احتجت المزيد (VM-based).

# [RU]
## *OpenSource продукт!*
# ПОДДЕРЖИВАЕТСЯ ТОЛЬКО CORE LINUX
# Как использовать?
- Для начала установите менеджер пакетов [BUN](https://bun.com)
```bash
git clone https://github.com:GitZipQR/GitZipQR.app.git
cd GitZipQR.app
bun install
git clone https://github.com:GitZipQR/GitZip.cpp 
git clone https://github.com:GitZipQR/PaperStorageX
./rub.sh 
```
# Веб-интерфейс доступен по адресу > **http://localhost:5123**
### !!!!ВНИМАНИЕ!!!!
Если вы пробрасываете порт из MikroTIK на статический IP — не рекомендуется: злоумышленники могут использовать вашу локальную машину. Лучше использовать локальную сеть для безопасной криптографии.
## !!!!ВНИМАНИЕ!!!!
# ЛИЦЕНЗИЯ
GitZipQR Proprietary License
============================
[RU]

1. Это приложение "GitZipQR" (включая исходный код, собранные бинарные файлы, дистрибутивы,
   и любую связанную документацию) является интеллектуальной собственностью автора:
   Daniil V [RestlessByte].

2. Запрещается:
   • Копировать, модифицировать, распространять это приложение или любую его часть без письменного согласия автора.
   • Использовать проект или его идеи для создания похожих приложений, прототипов или производных продуктов.
   • Публиковать, предоставлять или продавать этот проект под своим именем или выдавать его за свою работу.
   • Обратная разработка, декомпиляция, дизассемблирование или иные попытки вмешательства в приложение или его компоненты.
   • Любые попытки обхода технических мер защиты или ограничений данной лицензии.

3. Разрешается:
   • Использование приложения только в личных целях (без распространения или публикации).
   • Ознакомление с функциональностью исключительно в пользовательском режиме (без вмешательства в исходники или бинарники).

4. Нарушение:
   • Любое нарушение этой лицензии влечёт юридическую ответственность по ГК РФ (часть IV),
     российскому авторскому праву и международным соглашениям (Бернская конвенция 1886).
   • В случае незаконного копирования, модификации, обратной разработки или иных нарушений
     автор оставляет за собой право немедленно обратиться за юридической помощью и добиваться судебной защиты.

5. Исполнение:
   • Автор может требовать удаления всех незаконных копий, компенсации ущерба
     и применения мер по DMCA (Digital Millennium Copyright Act) и применимому международному праву.

# GitZipQR Pro — оболочка Electron + Next.js

**Суть:** усиленная UI‑оболочка вокруг ваших C++ бинарей (`encode`/`decode`), добавление упаковки PDF A4,
Live Scan и проверки лицензии через ETH/USDT на ваш адрес. Этот репозиторий не трогает ядро C++.

## Возможности
- Запускает ваши бинарники для Encode/Decode.
- Упаковывает PNG‑чанки в A4 PDF (сетка 3x3).
- Live Scan: сбор чанков с линейного сканера штрих‑кодов.
- Лицензия: отпечаток машины + проверка платежа (USDT>=1500 или ETH>=0.5).
- Укрепление: `asar`, минификация, JS‑обфускация, опциональный слой AES‑GCM для bootstrap‑файла.

> Абсолютной защиты не существует. Ключи живут в памяти во время выполнения. Этот стек повышает цену атаки.

## Разработка
1. Скопируйте `.env.example` в `.env`, задайте:
   - `ETH_RPC`
   - `BIN_ENC` / `BIN_DEC` (ваши собранные C++ бинарники)
2. `./start-dev.sh`

## Сборка
- Linux AppImage: `bun run dist:linux`
- Windows NSIS .exe: `bun run dist:win`

Артефакты лежат в `packages/app/release/`.

## Команды
- `bun run dev` — запуск Next (UI) + Electron.
- `bun run pack-a4 <dir> <out.pdf>` — сбор A4‑листов.
- `bun run scan-live` — сбор чанков со сканера (stdin).

## Примечания по укреплению
- `electron-builder` с `asar: true`.
- `javascript-obfuscator`: control-flow, dead-code, string-array, debug-protection.
- Опциональный AES‑GCM: расшифровка небольшого bootstrap при запуске ключом от machineHash + secret.
- Рассмотрите подпись кода и коммерческий native‑protector для Windows, если нужно больше (VM‑based).

# [ZH]
## *开源产品！*
# 仅支持 CORE LINUX
# 如何使用？
- 首先下载包管理器 [BUN](https://bun.com)
```bash
git clone https://github.com:GitZipQR/GitZipQR.app.git
cd GitZipQR.app
bun install
git clone https://github.com:GitZipQR/GitZip.cpp 
git clone https://github.com:GitZipQR/PaperStorageX
./rub.sh 
```
# Web 界面地址 > **http://localhost:5123**
### !!!!警告!!!!
如果你在 MikroTIK 上将端口转发到静态 IP，**不推荐**：攻击者可能利用你的本地机器。建议仅在本地网络中进行安全加密。
## !!!!警告!!!!
# 许可证
GitZipQR 专有许可证
============================
[ZH]

1. 本应用 “GitZipQR”（包括源代码、编译后的二进制文件、发行包及相关文档）
   为作者 Daniil V [RestlessByte] 的知识产权。

2. 禁止：
   • 未经作者书面许可复制、修改或分发本应用或其任何部分。
   • 使用本项目或其思想创建类似应用、原型或衍生产品。
   • 以自己的名义发布、提供或出售本项目，或声称为本人作品。
   • 逆向工程、反编译、反汇编或以其他方式试图篡改应用或其组件。
   • 任何试图绕过技术保护措施或本许可证限制的行为。

3. 允许：
   • 仅限个人用途使用本应用（不得分发或发布）。
   • 仅在用户模式下评估功能（不得篡改源代码或二进制）。

4. 违约：
   • 任何违反本许可证的行为将依据俄罗斯联邦民法（第四部分）、俄罗斯版权法以及国际协议
     （1886 年《伯尔尼公约》）承担法律责任。
   • 如发生非法复制、修改、逆向工程或其他违规行为，作者保留立即寻求法律意见并采取司法救济的权利。

5. 执行：
   • 作者可要求删除所有非法副本、索赔损失，并依据 DMCA 及适用的国际法律采取处罚措施。

# GitZipQR Pro — Electron + Next.js 外壳

**核心思路：** 在现有 C++ 二进制（`encode`/`decode`）外包一层加固 UI，增加 A4 PDF 打包、
Live Scan，以及通过 ETH/USDT 地址进行许可验证。本仓库不改动 C++ 核心。

## 功能
- 运行你的 Encode/Decode 二进制。
- 将 PNG 分片打包成 A4 PDF（3x3 网格）。
- Live Scan：从线性条码扫描器收集分片。
- 许可：机器指纹 + 支付校验（USDT>=1500 或 ETH>=0.5）。
- 加固：`asar`、压缩、JS 混淆、可选的 AES‑GCM 引导层。

> 没有绝对的保护。密钥在运行时驻留内存。该方案提高攻击成本。

## 开发
1. 复制 `.env.example` 为 `.env`，设置：
   - `ETH_RPC`
   - `BIN_ENC` / `BIN_DEC`（你编译的 C++ 二进制）
2. `./start-dev.sh`

## 构建
- Linux AppImage：`bun run dist:linux`
- Windows NSIS .exe：`bun run dist:win`

产物位于 `packages/app/release/`。

## 命令
- `bun run dev` — 运行 Next (UI) + Electron。
- `bun run pack-a4 <dir> <out.pdf>` — 生成 A4 页面。
- `bun run scan-live` — 从扫描器收集分片 (stdin)。

## 加固说明
- `electron-builder` 设置 `asar: true`。
- `javascript-obfuscator`：control-flow、dead-code、string-array、debug-protection。
- 可选 AES‑GCM：运行时用 machineHash + secret 派生密钥解密小型 bootstrap。
- 如需更强保护，建议代码签名与 Windows 商业原生保护（VM‑based）。

# [KK]
## *OpenSource өнім!*
# ТЕК CORE LINUX ҚОЛДАЙДЫ
# Қалай қолдануға болады?
- Бастау үшін пакет менеджерін жүктеңіз [BUN](https://bun.com)
```bash
git clone https://github.com:GitZipQR/GitZipQR.app.git
cd GitZipQR.app
bun install
git clone https://github.com:GitZipQR/GitZip.cpp 
git clone https://github.com:GitZipQR/PaperStorageX
./rub.sh 
```
# Веб-интерфейс мына жерде қолжетімді > **http://localhost:5123**
### !!!!ЕСКЕРТУ!!!!
MikroTIK арқылы статикалық IP‑ке порт бағыттау ұсынылмайды: хакерлер жергілікті компьютеріңізді пайдаланып кетуі мүмкін. Қауіпсіз криптография үшін жергілікті желіні пайдаланыңыз.
## !!!!ЕСКЕРТУ!!!!
# ЛИЦЕНЗИЯ
GitZipQR Proprietary License
============================
[KK]

1. Бұл "GitZipQR" қолданбасы (оның ішінде бастапқы код, жиналған бинарлық файлдар, дистрибутивтер,
   және қатысты құжаттама) автордың зияткерлік меншігі болып табылады:
   Daniil V [RestlessByte].

2. Тыйым салынады:
   • Автормен жазбаша келісімсіз қолданбаны немесе оның бөлігін көшіру, өзгерту, тарату.
   • Жобаны немесе оның идеяларын ұқсас қолданбалар, прототиптер немесе туынды өнімдер жасауға пайдалану.
   • Жобаны өз атыңыздан жариялау, ұсыну немесе сату, не өз жұмысыңыз ретінде көрсету.
   • Қайта инженерлеу, декомпиляция, дизассемблирлеу немесе қолданбаға/компоненттеріне өзге түрде араласу.
   • Техникалық қорғау шараларын немесе осы лицензия шектеулерін айналып өту әрекеттері.

3. Рұқсат етіледі:
   • Қолданбаны тек жеке мақсатта пайдалану (тарату немесе жариялау жоқ).
   • Функционалды тек пайдаланушы режимінде қарау (бастапқы кодқа немесе бинарларға араласпай).

4. Бұзушылық:
   • Бұл лицензияны бұзу Ресей Федерациясының Азаматтық кодексі (IV бөлім),
     Ресей авторлық құқығы және халықаралық келісімдер (1886 жылғы Берн конвенциясы) бойынша жауапкершілікке әкеледі.
   • Заңсыз көшіру, өзгерту, қайта инженерлеу және басқа бұзушылықтар кезінде
     автор бірден заңдық кеңес алып, соттық қорғауға жүгінуге құқылы.

5. Орындау:
   • Автор барлық заңсыз көшірмелерді жоюды, зиянның өтемін және DMCA мен қолданылатын халықаралық құқыққа
     сәйкес шараларды талап ете алады.

# GitZipQR Pro — Electron + Next.js қабығы

**Негізгі ой:** бар C++ бинарларыңыздың (`encode`/`decode`) айналасына күшейтілген UI жасау,
A4 PDF жинақтауын қосу, Live Scan және ETH/USDT арқылы лицензия тексеруі. Бұл репозиторий C++ өзегін өзгертпейді.

## Мүмкіндіктер
- Encode/Decode бинарларыңызды іске қосады.
- PNG бөліктерін A4 PDF-ке жинайды (3x3 тор).
- Live Scan: сызықтық штрих‑код сканерінен бөліктерді жинау.
- Лицензия: құрылғы ізі + төлемді тексеру (USDT>=1500 немесе ETH>=0.5).
- Қорғаныс: `asar`, минификация, JS обфускациясы, bootstrap үшін опционал AES‑GCM қабаты.

> Абсолютті қорғаныс жоқ. Кілттер орындау кезінде жадта болады. Бұл стек шабуыл құнын арттырады.

## Даму
1. `.env.example` файлын `.env` ретінде көшіріп, мыналарды орнатыңыз:
   - `ETH_RPC`
   - `BIN_ENC` / `BIN_DEC` (жасалған C++ бинарлары)
2. `./start-dev.sh`

## Құрастыру
- Linux AppImage: `bun run dist:linux`
- Windows NSIS .exe: `bun run dist:win`

Артефакттар `packages/app/release/` ішінде.

## Командалар
- `bun run dev` — Next (UI) + Electron іске қосу.
- `bun run pack-a4 <dir> <out.pdf>` — A4 беттерін жинау.
- `bun run scan-live` — сканерден бөліктерді жинау (stdin).

## Қорғаныс туралы ескертпелер
- `electron-builder` үшін `asar: true`.
- `javascript-obfuscator`: control-flow, dead-code, string-array, debug-protection.
- Опционал AES‑GCM: machineHash + secret негізінде кілтпен шағын bootstrap файлын орындау кезінде ашу.
- Қосымша қорғаныс керек болса, Windows үшін кодқа қол қою және коммерциялық native‑protector қолдануды қарастырыңыз (VM‑based).
