// js/app.js

// 1. تجميع المحاضرات من الملفات المختلفة في مجلد js
const lecturesList = [
    typeof lecture1 !== 'undefined' ? lecture1 : (typeof data_lec1 !== 'undefined' ? data_lec1 : null),
    typeof lecture2 !== 'undefined' ? lecture2 : (typeof data_lec2 !== 'undefined' ? data_lec2 : null),
    typeof lecture3 !== 'undefined' ? lecture3 : (typeof data_lec3 !== 'undefined' ? data_lec3 : null),
    typeof lecture4 !== 'undefined' ? lecture4 : (typeof data_lec4 !== 'undefined' ? data_lec4 : null)
].filter(Boolean);

let currentItem = null;
let loadedImage = null;

// عناصر عناصر واجهة المستخدم (DOM Elements)
const menuToggleBtn = document.getElementById('menuToggleBtn');
const sidebar = document.getElementById('sidebar');
const listEl = document.getElementById('list');

const welcomeScreen = document.getElementById('welcome-screen');
const contentCard = document.getElementById('content-card');
const mainTitle = document.getElementById('main-title');

const btnLecture = document.getElementById('btn-lecture');
const btnAssignment = document.getElementById('btn-assignment');
const btnLab = document.getElementById('btn-lab');

const textContainer = document.getElementById('text-container');
const labContainer = document.getElementById('lab-container');

const contentSubtitle = document.getElementById('content-subtitle');
const contentDesc = document.getElementById('content-desc');
const contentCode = document.getElementById('content-code');

const operationSelect = document.getElementById('operationSelect');
const labCodeDisplay = document.getElementById('lab-code-display');

const uploadBox = document.getElementById('uploadBox');
const imageLoader = document.getElementById('imageLoader');

const canvasOriginal = document.getElementById('canvasOriginal');
const canvasProcessed = document.getElementById('canvasProcessed');
const ctxOriginal = canvasOriginal ? canvasOriginal.getContext('2d') : null;
const ctxProcessed = canvasProcessed ? canvasProcessed.getContext('2d') : null;

// 2. تفعيل فتح وإغلاق القائمة الجانبية عند الضغط على زر ☰
if (menuToggleBtn && sidebar) {
    menuToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && !menuToggleBtn.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
}

// 3. بناء القائمة الجانبية تلقائياً في عنصر <ul id="list">
function renderList() {
    if (!listEl) return;
    listEl.innerHTML = '';

    if (lecturesList.length === 0) {
        listEl.innerHTML = '<li style="padding:15px; color:#f87171; text-align:center;">لم يتم تحميل بيانات المحاضرات</li>';
        return;
    }

    lecturesList.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.title || `المحاضرة ${index + 1}`;
        li.addEventListener('click', () => selectLecture(item, li));
        listEl.appendChild(li);
    });
}

// 4. دالة اختيار محاضرة من القائمة
function selectLecture(item, element) {
    document.querySelectorAll('.assignments-list li').forEach(el => el.classList.remove('active'));
    if (element) element.classList.add('active');

    if (welcomeScreen) welcomeScreen.style.display = 'none';
    if (contentCard) contentCard.style.display = 'block';

    currentItem = item;
    if (mainTitle) mainTitle.textContent = item.title;

    // إغلاق القائمة الجانبية تلقائياً بعد الاختيار
    if (sidebar) sidebar.classList.remove('active');

    switchTab('lecture');
}

// 5. التنقل بين التبويبات (شرح المحاضرة / التكليف / المختبر)
function switchTab(tab) {
    [btnLecture, btnAssignment, btnLab].forEach(btn => btn?.classList.remove('active'));

    if (tab === 'lecture') {
        btnLecture?.classList.add('active');
        textContainer.style.display = 'block';
        labContainer.style.display = 'none';

        if (currentItem && currentItem.lecture) {
            contentSubtitle.textContent = currentItem.lecture.title || '';
            contentDesc.textContent = currentItem.lecture.description || '';
            contentCode.textContent = currentItem.lecture.code || '';
        }
    } else if (tab === 'assignment') {
        btnAssignment?.classList.add('active');
        textContainer.style.display = 'block';
        labContainer.style.display = 'none';

        if (currentItem && currentItem.assignment) {
            contentSubtitle.textContent = currentItem.assignment.title || '';
            contentDesc.textContent = currentItem.assignment.description || '';
            contentCode.textContent = currentItem.assignment.code || '';
        }
    } else if (tab === 'lab') {
        btnLab?.classList.add('active');
        textContainer.style.display = 'none';
        labContainer.style.display = 'block';

        setupLabOperations();
        applyLabProcessing();
    }
}

// 6. تجهيز الخيارات الخاصة بتبويب المختبر
function setupLabOperations() {
    if (!operationSelect || !currentItem) return;
    operationSelect.innerHTML = '';

    const ops = currentItem.labOperations || [];
    ops.forEach(op => {
        const opt = document.createElement('option');
        opt.value = op.value;
        opt.textContent = op.name;
        operationSelect.appendChild(opt);
    });

    operationSelect.onchange = applyLabProcessing;
}

// 7. تطبيق عمليات المختبر التفاعلي على الـ Canvas
function applyLabProcessing() {
    if (!currentItem) return;
    const op = operationSelect ? operationSelect.value : '';

    // عرض كود العملية المحددة
    if (labCodeDisplay) {
        let snippets = currentItem.snippets || window[`snippets${currentItem.id}`] || {};
        labCodeDisplay.textContent = snippets[op] || `# كود تنفيذ العملية (${op})`;
    }

    if (!ctxProcessed || !canvasProcessed) return;

    const w = loadedImage ? loadedImage.width : 512;
    const h = loadedImage ? loadedImage.height : 512;

    canvasOriginal.width = w;
    canvasOriginal.height = h;
    canvasProcessed.width = w;
    canvasProcessed.height = h;

    if (loadedImage) {
        ctxOriginal.drawImage(loadedImage, 0, 0, w, h);
        ctxProcessed.drawImage(loadedImage, 0, 0, w, h);
    } else {
        ctxOriginal.fillStyle = '#ffffff';
        ctxOriginal.fillRect(0, 0, w, h);
        ctxProcessed.fillStyle = '#ffffff';
        ctxProcessed.fillRect(0, 0, w, h);
    }

    // استدعاء دالة المعالجة المعرفة داخل كائن المحاضرة
    if (typeof currentItem.processLab === 'function') {
        currentItem.processLab(op, ctxProcessed, loadedImage, w, h);
    }
}

// 8. التعامل مع رفع الصور والأزرار التفاعلية
if (uploadBox && imageLoader) {
    uploadBox.addEventListener('click', () => imageLoader.click());
    imageLoader.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const img = new Image();
            img.onload = () => {
                loadedImage = img;
                applyLabProcessing();
            };
            img.src = URL.createObjectURL(file);
        }
    });
}

document.getElementById('btnReset')?.addEventListener('click', () => {
    loadedImage = null;
    applyLabProcessing();
});

document.getElementById('btnSave')?.addEventListener('click', () => {
    if (!canvasProcessed) return;
    const link = document.createElement('a');
    link.download = 'processed_image.png';
    link.href = canvasProcessed.toDataURL();
    link.click();
});

btnLecture?.addEventListener('click', () => switchTab('lecture'));
btnAssignment?.addEventListener('click', () => switchTab('assignment'));
btnLab?.addEventListener('click', () => switchTab('lab'));

// تشغيل القائمة فور تجهيز الصفحة
document.addEventListener('DOMContentLoaded', () => {
    renderList();
});