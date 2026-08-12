// js/data_lec2.js

const lecture2 = {
    id: 2,
    title: "المحاضرة الثانية: قنوات الألوان والتحويلات الهندسية",
    labOperations: [
        { value: "red_channel", name: "فصل القناة الحمراء (Red Channel)" },
        { value: "green_channel", name: "فصل القناة الخضراء (Green Channel)" },
        { value: "blue_channel", name: "فصل القناة الزرقاء (Blue Channel)" },
        { value: "crop", name: "قص واقتطاع جزء (Image Cropping)" },
        { value: "resize", name: "تكبير وتصغير (Zoom & Shrink)" },
        { value: "rotation", name: "تدوير الصورة (Image Rotation)" },
        { value: "translation", name: "إزاحة الصورة (Image Translation)" }
    ],
    lecture: {
        title: "عرض الصور عبر Matplotlib، قنوات الألوان، والتحويلات الهندسية",
        description: "تغطي هذه المحاضرة كيفية استخدام مكتبة Matplotlib لعرض الصور مع تحويل نظام الألوان من BGR الخاص بـ OpenCV إلى RGB. كما تتطرق لفصل قنوات الألوان الثلاث (Red, Green, Blue) ومعالجتها بشكل منفصل باستخدام القناع (Mask)، بالإضافة للتحويلات الهندسية الأساسية مثل قص الأجزاء بواسطة Array Slicing، إعادة التحجيم (cv.resize) باستخدام فلاتر التنعيم (INTER_CUBIC / INTER_AREA)، تدوير الصور بمرونة (cv.getRotationMatrix2D)، وإزاحة محاور الصورة (cv.warpAffine).",
        code: `import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt

# 1. قراءة الصورة وعرضها باستخدام Matplotlib
image = cv.imread('images/balloons.jpg')
image_rgb = cv.cvtColor(image, cv.COLOR_BGR2RGB)

# 2. فصل وقنوات الألوان الثلاث وقمع القنوات الأخرى عبر Mask
(B, G, R) = cv.split(image)
mask = np.zeros(image.shape[:2], dtype="uint8")

image_r = cv.merge((R, mask, mask))
image_g = cv.merge((mask, G, mask))
image_b = cv.merge((mask, mask, B))

# 3. قص جزء من الصورة (Cropping)
cropped = image[160:310, 441:600]

# 4. التكبير والتصغير (Zoom & Shrink)
h, w = image.shape[:2]
zoom = cv.resize(image, (w * 2, h * 2), interpolation=cv.INTER_CUBIC)
shrink = cv.resize(image, (int(w / 2), int(h / 2)), interpolation=cv.INTER_AREA)

# 5. تدوير الصورة (Rotation)
center = (w // 2, h // 2)
M_rot = cv.getRotationMatrix2D(center, 30, 0.7)
rotated = cv.warpAffine(image_rgb, M_rot, (w, h))

# 6. إزاحة الصورة (Translation)
M_trans = np.float32([[1, 0, 100], [0, 1, 50]])
translated = cv.warpAffine(image_rgb, M_trans, (w, h))`
    },
    assignment: {
        title: "التكاليف المطلوبة للمحاضرة الثانية",
        description: "1. كتابة برنامج يستقبل نوع العملية الهندسية من المستخدم (قص، تغيير حجم، دوران، إزاحة) ثم يطلب الإحداثيات اللازمة وينفذها.\n2. اقتطاع 3 أجزاء (كواكب) من الصورة ودمجها مجدداً في مواضع مختلفة من الصورة الأصلية.\n3. اختيار صورة منتج بدون خلفية وصورة خلفية دمجها باستخدام مكتبة Pillow.",
        code: `import cv2 as cv
import numpy as np
from PIL import Image

# حل التكليف الثاني: قص 3 أجزاء وإعادة دمجها في أماكن جديدة
image = cv.imread('images/planet_glow.jpg')

# اقتطاع 3 أجزاء مختلفة من الصورة
p1 = image[100:180, 200:280].copy()
p2 = image[200:280, 300:380].copy()
p3 = image[50:130, 400:480].copy()

# دمج الأجزاء المقتطعة في إحداثيات جديدة داخل الصورة
image[20:100, 20:100] = p1
image[300:380, 100:180] = p2
image[150:230, 450:530] = p3

cv.imshow('Multi Crop & Paste Result', image)
cv.waitKey(0)
cv.destroyAllWindows()

# حل التكليف الثالث: دمج منتج بخلفية عبر Pillow
bg = Image.open('background.jpg').convert('RGBA')
product = Image.open('product.png').convert('RGBA')
product = product.resize((200, 200))

# وضع المنتج في منتصف الخلفية
bg.paste(product, (100, 150), product)
bg.save('final_product.png')`
    },
    snippets: {
        red_channel: `(B, G, R) = cv.split(image)\nmask = np.zeros(image.shape[:2], dtype="uint8")\nred_only = cv.merge((R, mask, mask))`,
        green_channel: `(B, G, R) = cv.split(image)\nmask = np.zeros(image.shape[:2], dtype="uint8")\ngreen_only = cv.merge((mask, G, mask))`,
        blue_channel: `(B, G, R) = cv.split(image)\nmask = np.zeros(image.shape[:2], dtype="uint8")\nblue_only = cv.merge((mask, mask, B))`,
        crop: `# Slicing: [start_row:end_row, start_col:end_col]\ncropped = image[160:310, 441:600]`,
        resize: `# Zooming with INTER_CUBIC & Shrinking with INTER_AREA\nzoom = cv.resize(image, (w*2, h*2), interpolation=cv.INTER_CUBIC)\nshrink = cv.resize(image, (int(w/2), int(h/2)), interpolation=cv.INTER_AREA)`,
        rotation: `center = (w // 2, h // 2)\nM = cv.getRotationMatrix2D(center, angle=30, scale=0.7)\nrotated = cv.warpAffine(image, M, (w, h))`,
        translation: `M = np.float32([[1, 0, tx], [0, 1, ty]])\ntranslated = cv.warpAffine(image, M, (w, h))`
    },

    // تفاعل المختبر بالـ Canvas الخاص بالمحاضرة الثانية
    processLab: function (op, ctx, loadedImage, w, h) {
        if (!ctx) return;

        switch (op) {
            case 'red_channel': {
                let imgData = ctx.getImageData(0, 0, w, h);
                let data = imgData.data;
                for (let i = 0; i < data.length; i += 4) {
                    data[i + 1] = 0; // Green = 0
                    data[i + 2] = 0; // Blue = 0
                }
                ctx.putImageData(imgData, 0, 0);
                break;
            }

            case 'green_channel': {
                let imgData = ctx.getImageData(0, 0, w, h);
                let data = imgData.data;
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = 0;     // Red = 0
                    data[i + 2] = 0; // Blue = 0
                }
                ctx.putImageData(imgData, 0, 0);
                break;
            }

            case 'blue_channel': {
                let imgData = ctx.getImageData(0, 0, w, h);
                let data = imgData.data;
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = 0;     // Red = 0
                    data[i + 1] = 0; // Green = 0
                }
                ctx.putImageData(imgData, 0, 0);
                break;
            }

            case 'crop':
                if (loadedImage) {
                    ctx.clearRect(0, 0, w, h);
                    // اقتطاع الجزء الأوسط ثم تكبيره على كامل مساحة الـ Canvas
                    ctx.drawImage(loadedImage, w * 0.25, h * 0.25, w * 0.5, h * 0.5, 0, 0, w, h);
                } else {
                    ctx.strokeStyle = '#38bdf8';
                    ctx.lineWidth = 3;
                    ctx.setLineDash([6, 6]);
                    ctx.strokeRect(w * 0.25, h * 0.25, w * 0.5, h * 0.5);
                    ctx.setLineDash([]);
                }
                break;

            case 'resize':
                if (loadedImage) {
                    ctx.clearRect(0, 0, w, h);
                    // محاكاة التصغير والعرض في المنتصف
                    const sw = w * 0.6;
                    const sh = h * 0.6;
                    ctx.drawImage(loadedImage, (w - sw) / 2, (h - sh) / 2, sw, sh);
                }
                break;

            case 'rotation':
                if (loadedImage) {
                    ctx.clearRect(0, 0, w, h);
                    ctx.save();
                    ctx.translate(w / 2, h / 2);
                    ctx.rotate((30 * Math.PI) / 180);
                    ctx.scale(0.85, 0.85);
                    ctx.drawImage(loadedImage, -w / 2, -h / 2, w, h);
                    ctx.restore();
                }
                break;

            case 'translation':
                if (loadedImage) {
                    ctx.clearRect(0, 0, w, h);
                    // إزاحة بمقدار (X=60, Y=40)
                    ctx.drawImage(loadedImage, 60, 40, w - 60, h - 40);
                }
                break;
        }
    }
};

// إتاحة الكائن تحت الاسمين للتوافق التام مع app.js
const data_lec2 = lecture2;