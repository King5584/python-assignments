// js/data_lec4.js

const lecture4 = {
    id: 4,
    title: "المحاضرة الرابعة: المرشحات المكانية الخطية وغير الخطية (Spatial Domain Filtering)",
    labOperations: [
        { value: "mean_filter", name: "مرشح المتوسط الخطّي (Mean Filter)" },
        { value: "gaussian_filter", name: "مرشح جاوس الخطّي (Gaussian Filter)" },
        { value: "median_filter", name: "مرشح الوسيط غير الخطّي (Median Filter)" },
        { value: "custom_filter", name: "مرشح التجميع المخصص (Custom Kernel Filter2D)" }
    ],
    lecture: {
        title: "تنعيم الصور وإزالة الضوضاء في المجال المكاني",
        description: "تغطي هذه المحاضرة تقنيات الترشيح المكاني (Spatial Filtering) لتنعيم الصور وإزالة الضوضاء (Noise Reduction). تشتمل على الفلاتر الخطية مثل مرشح المتوسط (Mean Filter) باستخدام cv.blur ومرشح جاوس (Gaussian Filter) باستخدام cv.GaussianBlur لمعالجة الضوضاء العامة، والفلاتر غير الخطية مثل مرشح الوسيط (Median Filter) باستخدام cv.medianBlur المتخصص في إزالة ضوضاء الملح والفلفل (Salt and Pepper Noise). كما تتناول كيفية بناء مصفوفات القناع المخصصة (Custom Kernels) وتطبيقها عبر cv.filter2D.",
        code: `import cv2 as cv
import numpy as np
import os
import matplotlib.pyplot as plt

# Linear Filtering: Mean and Gaussian Filters on Spatial Domain
path = "./src/images/noisysalterpepper.png"

# التحقق من وجود ملف الصورة في المسار المحدد
if not os.path.exists(path):
    print(f"not Found {path}")
    exit()
else:
    # قراءة الصورة
    image = cv.imread(path)
    
    # Mean Filter: تطبيق فلتر المتوسط بحجم نواة (5x5)
    # ملاحظة: أبعاد النواة يجب أن تكون أعداداً فردية
    image_mean = cv.blur(image, (5, 5))
    
    # Gaussian Filter: تطبيق فلتر جاوس بحجم نواة (5x5) وانحراف معياري (sigma = 1)
    image_gaussian = cv.GaussianBlur(image, (5, 5), 1)
    
    # عرض النتائج
    plt.figure(figsize=(15, 5))
    
    # الصورة الأصلية
    plt.subplot(1, 3, 1)
    plt.imshow(cv.cvtColor(image, cv.COLOR_BGR2RGB))
    plt.title('Original Image')
    
    # الصورة بعد تطبيق Mean Filter
    plt.subplot(1, 3, 2)
    plt.imshow(cv.cvtColor(image_mean, cv.COLOR_BGR2RGB))
    plt.title('Mean Filtered Image')
    
    # الصورة بعد تطبيق Gaussian Filter
    plt.subplot(1, 3, 3)
    plt.imshow(cv.cvtColor(image_gaussian, cv.COLOR_BGR2RGB))
    plt.title('Gaussian Filtered Image')
    
    plt.show()

    import cv2 as cv
import numpy as np
import os
import matplotlib.pyplot as plt

# Non-Linear Filtering: Median Filter on Spatial Domain
path = "./src/images/noisysalterpepper.png"

if not os.path.exists(path):
    print(f"not Found {path}")
    exit()
else:
    image = cv.imread(path)
    
    # Median Filter: ترتيب قيم البكسلات وأخذ القيمة الوسيطة
    # الرقم 5 يمثل حجم النواة (5x5) ويجب أن يكون فردياً
    image_median = cv.medianBlur(image, 5)
    
    plt.figure(figsize=(10, 5))
    
    # الصورة الأصلية
    plt.subplot(1, 2, 1)
    plt.imshow(cv.cvtColor(image, cv.COLOR_BGR2RGB))
    plt.title('Original Image')
    
    # الصورة بعد تطبيق Median Filter
    plt.subplot(1, 2, 2)
    plt.imshow(cv.cvtColor(image_median, cv.COLOR_BGR2RGB))
    plt.title('Median Filtered Image')
    
    plt.show()

    import cv2 as cv
import numpy as np
import os
import matplotlib.pyplot as plt

# Custom Linear Filtering using filter2D
path = "./src/images/noisysalterpepper.png"

if not os.path.exists(path):
    print(f"not Found {path}")
    exit()
else:
    image = cv.imread(path)
    
    # إنشاء مصفوفة أسطر وأعمدة تحتوي على 1 مقسومة على عدد العناصر لتطابق المجموع 1
    # النواة الأولى: بحجم (5x5)
    ones_mask = np.ones((5, 5), np.float32) / 25
    
    # النواة الثانية: بحجم (3x3)
    mask = np.array([[1, 1, 1],
                     [1, 1, 1],
                     [1, 1, 1]], np.float32) / 9
    
    # تطبيق الفلتر المخصص باستخدام cv.filter2D
    # Paramenter -1 يعني احتفاظ الصورة المعالجة بنفس عمق/نوع بيانات الصورة الأصلية
    image_filter2d = cv.filter2D(image, -1, mask)
    image_filter2d_ones = cv.filter2D(image, -1, ones_mask)
    
    plt.figure(figsize=(15, 5))
    
    plt.subplot(1, 3, 1)
    plt.imshow(cv.cvtColor(image, cv.COLOR_BGR2RGB))
    plt.title('Original Image')
    
    plt.subplot(1, 3, 2)
    plt.imshow(cv.cvtColor(image_filter2d, cv.COLOR_BGR2RGB))
    plt.title('Filtered Image (3x3 Kernel)')
    
    plt.subplot(1, 3, 3)
    plt.imshow(cv.cvtColor(image_filter2d_ones, cv.COLOR_BGR2RGB))
    plt.title('Filtered Image (5x5 Kernel)')
    
    plt.show()


    `
    },
    assignment: {
        title: "التكاليف المطلوبة للمحاضرة الرابعة",
        description: "1. اختيار 5 صور مختلفة وتطبيق تقنيات تحسين الصور وإزالة الضوضاء عليها بواسطة الفلاتر المكانية (Mean, Gaussian, Median).\n2. إجراء بحث مفصل مقارن بين أنواع الفلاتر الخطية (Linear) وغير الخطية (Non-Linear) مع بيان استخدامات كل منها.",
        code: `import cv2 as cv
import numpy as np
import os
import matplotlib.pyplot as plt

# قائمة بالمسارات لخمس صور مختلفة
image_paths = [
    "./images/img1.png",
    "./images/img2.png",
    "./images/img3.png",
    "./images/img4.png",
    "./images/img5.png"
]

# تعريف فلتر حدة مخصص (Sharpening Mask) كنوع إضافي من التحسين
sharpen_kernel = np.array([[ 0, -1,  0],
                           [-1,  5, -1],
                           [ 0, -1,  0]], dtype=np.float32)

for i, img_path in enumerate(image_paths):
    if not os.path.exists(img_path):
        print(f"الصورة {img_path} غير موجودة.")
        continue
    
    image = cv.imread(img_path)
    
    # 1. فلتر المتوسط (Mean Filter)
    img_mean = cv.blur(image, (5, 5))
    
    # 2. فلتر جاوس (Gaussian Filter)
    img_gaussian = cv.GaussianBlur(image, (5, 5), 0)
    
    # 3. فلتر الوسيط (Median Filter)
    img_median = cv.medianBlur(image, 5)
    
    # 4. فلتر التنعيم/التحديد المخصص (Sharpening Filter)
    img_sharp = cv.filter2D(image, -1, sharpen_kernel)
    
    # عرض النتائج لكل صورة
    plt.figure(figsize=(18, 4))
    
    images_list = [image, img_mean, img_gaussian, img_median, img_sharp]
    titles_list = ['Original', 'Mean Blur', 'Gaussian Blur', 'Median Filter', 'Sharpened']
    
    for idx in range(5):
        plt.subplot(1, 5, idx + 1)
        plt.imshow(cv.cvtColor(images_list[idx], cv.COLOR_BGR2RGB))
        plt.title(f"Img {i+1}: {titles_list[idx]}")
        plt.axis('off')
        
    plt.tight_layout()
    plt.show()`
    },
    snippets: {
        mean_filter: `image_mean = cv.blur(image, (5, 5))`,
        gaussian_filter: `image_gaussian = cv.GaussianBlur(image, (5, 5), 1)`,
        median_filter: `image_median = cv.medianBlur(image, 5)`,
        custom_filter: `mask = np.ones((3, 3), np.float32) / 9\nimage_custom = cv.filter2D(image, -1, mask)`
    },

    // تفاعل المختبر بالـ Canvas الخاص بالمحاضرة الرابعة
    processLab: function (op, ctx, loadedImage, w, h) {
        if (!ctx) return;

        // 1. تحديد الأبعاد الأساسية للـ Canvas
        w = w || ctx.canvas.width;
        h = h || ctx.canvas.height;

        // 2. إعادة رسم الصورة الأصلية دائماً قبل إجراء العملية الحسابية
        if (loadedImage) {
            ctx.drawImage(loadedImage, 0, 0, w, h);
        }

        let srcData = ctx.getImageData(0, 0, w, h);
        let src = srcData.data;
        let dstData = ctx.createImageData(w, h);
        let dst = dstData.data;

        // دالة جلب قيم البكسلات وحمايتها عند الحدود
        function getPixelChannel(x, y, c) {
            let px = Math.max(0, Math.min(w - 1, x));
            let py = Math.max(0, Math.min(h - 1, y));
            return src[(py * w + px) * 4 + c];
        }

        switch (op) {
            case 'mean_filter': {
                for (let y = 0; y < h; y++) {
                    for (let x = 0; x < w; x++) {
                        let rSum = 0, gSum = 0, bSum = 0;
                        for (let dy = -1; dy <= 1; dy++) {
                            for (let dx = -1; dx <= 1; dx++) {
                                rSum += getPixelChannel(x + dx, y + dy, 0);
                                gSum += getPixelChannel(x + dx, y + dy, 1);
                                bSum += getPixelChannel(x + dx, y + dy, 2);
                            }
                        }
                        let idx = (y * w + x) * 4;
                        dst[idx] = rSum / 9;
                        dst[idx + 1] = gSum / 9;
                        dst[idx + 2] = bSum / 9;
                        dst[idx + 3] = src[idx + 3];
                    }
                }
                ctx.putImageData(dstData, 0, 0);
                break;
            }

            case 'gaussian_filter': {
                const kernel = [
                    [1, 2, 1],
                    [2, 4, 2],
                    [1, 2, 1]
                ];
                const weightSum = 16;

                for (let y = 0; y < h; y++) {
                    for (let x = 0; x < w; x++) {
                        let rSum = 0, gSum = 0, bSum = 0;
                        for (let dy = -1; dy <= 1; dy++) {
                            for (let dx = -1; dx <= 1; dx++) {
                                let wWeight = kernel[dy + 1][dx + 1];
                                rSum += getPixelChannel(x + dx, y + dy, 0) * wWeight;
                                gSum += getPixelChannel(x + dx, y + dy, 1) * wWeight;
                                bSum += getPixelChannel(x + dx, y + dy, 2) * wWeight;
                            }
                        }
                        let idx = (y * w + x) * 4;
                        dst[idx] = rSum / weightSum;
                        dst[idx + 1] = gSum / weightSum;
                        dst[idx + 2] = bSum / weightSum;
                        dst[idx + 3] = src[idx + 3];
                    }
                }
                ctx.putImageData(dstData, 0, 0);
                break;
            }

            case 'median_filter': {
                // مصفوفات سريعة ثنائية لتجنب تخصيص الذاكرة داخل التكرار
                const rVals = new Uint8Array(9);
                const gVals = new Uint8Array(9);
                const bVals = new Uint8Array(9);

                for (let y = 0; y < h; y++) {
                    for (let x = 0; x < w; x++) {
                        let k = 0;
                        for (let dy = -1; dy <= 1; dy++) {
                            for (let dx = -1; dx <= 1; dx++) {
                                rVals[k] = getPixelChannel(x + dx, y + dy, 0);
                                gVals[k] = getPixelChannel(x + dx, y + dy, 1);
                                bVals[k] = getPixelChannel(x + dx, y + dy, 2);
                                k++;
                            }
                        }
                        rVals.sort();
                        gVals.sort();
                        bVals.sort();

                        let idx = (y * w + x) * 4;
                        dst[idx] = rVals[4];
                        dst[idx + 1] = gVals[4];
                        dst[idx + 2] = bVals[4];
                        dst[idx + 3] = src[idx + 3];
                    }
                }
                ctx.putImageData(dstData, 0, 0);
                break;
            }

            case 'custom_filter': {
                const mask = [
                    [1 / 9, 1 / 9, 1 / 9],
                    [1 / 9, 1 / 9, 1 / 9],
                    [1 / 9, 1 / 9, 1 / 9]
                ];

                for (let y = 0; y < h; y++) {
                    for (let x = 0; x < w; x++) {
                        let rSum = 0, gSum = 0, bSum = 0;
                        for (let dy = -1; dy <= 1; dy++) {
                            for (let dx = -1; dx <= 1; dx++) {
                                let kVal = mask[dy + 1][dx + 1];
                                rSum += getPixelChannel(x + dx, y + dy, 0) * kVal;
                                gSum += getPixelChannel(x + dx, y + dy, 1) * kVal;
                                bSum += getPixelChannel(x + dx, y + dy, 2) * kVal;
                            }
                        }
                        let idx = (y * w + x) * 4;
                        dst[idx] = Math.min(255, Math.max(0, rSum));
                        dst[idx + 1] = Math.min(255, Math.max(0, gSum));
                        dst[idx + 2] = Math.min(255, Math.max(0, bSum));
                        dst[idx + 3] = src[idx + 3];
                    }
                }
                ctx.putImageData(dstData, 0, 0);
                break;
            }
        }
    }
};

const data_lec4 = lecture4;