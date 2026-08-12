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
import matplotlib.pyplot as plt
import os

path = "./images/noisysalterpepper.png"

if not os.path.exists(path):
    print(f"File not found: {path}")
else:
    image = cv.imread(path)
    
    # 1. الفلاتر الخطية (Linear Filtering)
    image_mean = cv.blur(image, (5, 5))
    image_gaussian = cv.GaussianBlur(image, (5, 5), 1)

    # 2. الفلاتر غير الخطية (Non-Linear Filtering)
    image_median = cv.medianBlur(image, 5)

    # 3. الفلاتر المخصصة (Custom Linear Filtering)
    ones_mask = np.ones((5, 5), np.float32) / 25
    custom_mask = np.array([
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ], dtype=np.float32) / 9

    image_custom_3x3 = cv.filter2D(image, -1, custom_mask)
    image_custom_5x5 = cv.filter2D(image, -1, ones_mask)

    plt.figure(figsize=(15, 8))
    
    plt.subplot(2, 3, 1)
    plt.imshow(cv.cvtColor(image, cv.COLOR_BGR2RGB))
    plt.title('Original Noisy Image')
    
    plt.subplot(2, 3, 2)
    plt.imshow(cv.cvtColor(image_mean, cv.COLOR_BGR2RGB))
    plt.title('Mean Filtered')

    plt.subplot(2, 3, 3)
    plt.imshow(cv.cvtColor(image_gaussian, cv.COLOR_BGR2RGB))
    plt.title('Gaussian Filtered')

    plt.subplot(2, 3, 4)
    plt.imshow(cv.cvtColor(image_median, cv.COLOR_BGR2RGB))
    plt.title('Median Filtered')

    plt.subplot(2, 3, 5)
    plt.imshow(cv.cvtColor(image_custom_3x3, cv.COLOR_BGR2RGB))
    plt.title('Custom 3x3 Filter')

    plt.subplot(2, 3, 6)
    plt.imshow(cv.cvtColor(image_custom_5x5, cv.COLOR_BGR2RGB))
    plt.title('Custom 5x5 Filter')

    plt.tight_layout()
    plt.show()`
    },
    assignment: {
        title: "التكاليف المطلوبة للمحاضرة الرابعة",
        description: "1. اختيار 5 صور مختلفة وتطبيق تقنيات تحسين الصور وإزالة الضوضاء عليها بواسطة الفلاتر المكانية (Mean, Gaussian, Median).\n2. إجراء بحث مفصل مقارن بين أنواع الفلاتر الخطية (Linear) وغير الخطية (Non-Linear) مع بيان استخدامات كل منها.",
        code: `import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt

image_path = 'images/noisysalterpepper.png'
image = cv.imread(image_path)

if image is not None:
    mean_blur = cv.blur(image, (5, 5))
    gaussian_blur = cv.GaussianBlur(image, (5, 5), 0)
    median_blur = cv.medianBlur(image, 5)

    fig, axes = plt.subplots(2, 2, figsize=(10, 8))
    
    axes[0, 0].imshow(cv.cvtColor(image, cv.COLOR_BGR2RGB))
    axes[0, 0].set_title('Original Noisy Image')
    
    axes[0, 1].imshow(cv.cvtColor(mean_blur, cv.COLOR_BGR2RGB))
    axes[0, 1].set_title('Mean Filter (Linear)')

    axes[1, 0].imshow(cv.cvtColor(gaussian_blur, cv.COLOR_BGR2RGB))
    axes[1, 0].set_title('Gaussian Filter (Linear)')

    axes[1, 1].imshow(cv.cvtColor(median_blur, cv.COLOR_BGR2RGB))
    axes[1, 1].set_title('Median Filter (Non-Linear)')

    for ax in axes.ravel():
        ax.axis('off')

    plt.tight_layout()
    plt.show()
else:
    print("Could not read the image.")`
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