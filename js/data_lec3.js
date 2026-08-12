// js/data_lec3.js

const lecture3 = {
    id: 3,
    title: "المحاضرة الثالثة: تحويلات مستوى الشدة وموازنة الهستوجرام",
    labOperations: [
        { value: "negative", name: "تحويل الصورة السالبة (Negative Transform)" },
        { value: "log_transform", name: "التحويل اللوغاريتمي (Log Transform)" },
        { value: "calc_hist", name: "حساب الهستوجرام (Calculate Histogram)" },
        { value: "histogram_equalization", name: "تسوية الهستوجرام (Histogram Equalization)" }
    ],
    lecture: {
        title: "تحويلات الكثافة النقطية وتعديل التباين عبر الهستوجرام",
        description: "تغطي هذه المحاضرة تحويلات مستوى الشدة (Intensity Transformations) مثل تحويل الصورة إلى السالب (Negative Transform) لتعزيز التفاصيل الفاتحة في الخلفيات الداكنة كالأشعة الطبية، والتحويل اللوغاريتمي (Log Transformation) لتوسيع قيم البكسلات الداكنة وضغط القيم الساطعة. كما تستعرض كيفية حساب الهستوجرام للصورة لتحديد توزيع مستويات الرمادي، وتطبيق تسوية/موازنة الهستوجرام (Histogram Equalization) باستخدام cv.equalizeHist لتحسين التباين العام للصورة.",
        code: `import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt
import os

# 1. تحويل الصورة السالبة (Negative Transform)
image_path = "./images/img4.png"
if not os.path.exists(image_path):
    print(f"The Path {image_path} does not exist")
else:
    image = cv.imread(image_path)
    image_negative = 255 - image
    
    plt.figure(figsize=(10, 5))
    plt.subplot(1, 2, 1)
    plt.imshow(cv.cvtColor(image, cv.COLOR_BGR2RGB))
    plt.title('Original Image')
    plt.subplot(1, 2, 2)
    plt.imshow(cv.cvtColor(image_negative, cv.COLOR_BGR2RGB))
    plt.title('Negative Image')
    plt.show()

# 2. التحويل اللوغاريتمي (Log Transformation)
log_path = './src/images/Arithmetic.jpg'
if not os.path.exists(log_path):
    print("File not found")
else:
    image_gray = cv.imread(log_path, 0)
    image_float = np.float32(image_gray)
    c = 255 / np.log(1 + np.max(image_float))
    image_log = np.uint8(c * np.log(1 + image_float))

    plt.figure(figsize=(10, 5))
    plt.subplot(1, 2, 1)
    plt.title('Original Image')
    plt.imshow(image_gray, cmap='gray')
    plt.subplot(1, 2, 2)
    plt.title('Log Transformed Image')
    plt.imshow(image_log, cmap='gray')
    plt.show()

# 3. حساب وتسوية الهستوجرام (Histogram Equalization)
hist_path = "./images/forestBefore.png"
if not os.path.exists(hist_path):
    print("File not found")
else:
    image = cv.imread(hist_path, 0)
    image_hist = cv.calcHist([image], [0], None, [256], [0, 256])
    
    # تطبيق تسوية الهستوجرام
    image_equalized = cv.equalizeHist(image)
    image_equalized_hist = cv.calcHist([image_equalized], [0], None, [256], [0, 256])

    # رسم الهستوجرام قبل وبعد
    plt.figure(figsize=(10, 5))
    plt.subplot(1, 2, 1)
    plt.plot(image_hist, color='r')
    plt.title('Original Histogram')
    plt.xlabel("Pixel Value")
    plt.ylabel("Frequency")

    plt.subplot(1, 2, 2)
    plt.plot(image_equalized_hist, color='b')
    plt.title('Equalized Histogram')
    plt.xlabel("Pixel Value")
    plt.ylabel("Frequency")
    plt.show()

    # عرض الصورة قبل وبعد التسوية
    plt.figure(figsize=(10, 5))
    plt.subplot(1, 2, 1)
    plt.imshow(image, cmap='gray')
    plt.title('Original Image')
    plt.subplot(1, 2, 2)
    plt.imshow(image_equalized, cmap='gray')
    plt.title('Equalized Image')
    plt.show()`
    },
    assignment: {
        title: "التكاليف المطلوبة للمحاضرة الثالثة",
        description: "1. تطبيق تحويل الصورة السالبة على صورة طيفية/طبية وإظهار الفرق قبل وبعد التحويل.\n2. تطبيق التحويل اللوغاريتمي على صورة تحتوي نطاقاً واسعاً من القيم الداكنة لتحسين وضوح المعالم المخفية.\n3. قراءة صورة معتمة، حساب الهستوجرام لها، ثم تطبيق تسوية الهستوجرام (Histogram Equalization) ورسم الهستوجرام والصورة قبل وبعد التسوية.",
        code: `import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt

# حل التكليف: موازنة الهستوجرام وعرض الهستوجرام والصور قبل وبعد
image = cv.imread('images/forestBefore.png', 0)

# 1. حساب الهستوجرام للصورة الأصلية
hist_orig = cv.calcHist([image], [0], None, [256], [0, 256])

# 2. تطبيق تسوية الهستوجرام
equalized = cv.equalizeHist(image)
hist_eq = cv.calcHist([equalized], [0], None, [256], [0, 256])

# 3. رسم الهستوجرام قبل وبعد
plt.figure(figsize=(10, 4))
plt.subplot(1, 2, 1)
plt.plot(hist_orig, color='r')
plt.title('Original Histogram')
plt.xlabel('Pixel Value')
plt.ylabel('Frequency')

plt.subplot(1, 2, 2)
plt.plot(hist_eq, color='b')
plt.title('Equalized Histogram')
plt.xlabel('Pixel Value')
plt.ylabel('Frequency')
plt.show()

# 4. عرض الصور قبل وبعد
plt.figure(figsize=(10, 5))
plt.subplot(1, 2, 1)
plt.imshow(image, cmap='gray')
plt.title('Original Image')

plt.subplot(1, 2, 2)
plt.imshow(equalized, cmap='gray')
plt.title('Equalized Image')
plt.show()`
    },
    snippets: {
        negative: `image_negative = 255 - image`,
        log_transform: `image_float = np.float32(image)\nc = 255 / np.log(1 + np.max(image_float))\nimage_log = np.uint8(c * np.log(1 + image_float))`,
        calc_hist: `image_hist = cv.calcHist([image], [0], None, [256], [0, 256])`,
        histogram_equalization: `image_equalized = cv.equalizeHist(image)\nimage_equalized_hist = cv.calcHist([image_equalized], [0], None, [256], [0, 256])`
    },

    // تفاعل المختبر بالـ Canvas الخاص بالمحاضرة الثالثة
    processLab: function (op, ctx, loadedImage, w, h) {
        if (!ctx) return;

        switch (op) {
            case 'negative': {
                let imgData = ctx.getImageData(0, 0, w, h);
                let data = imgData.data;
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = 255 - data[i];         // Red
                    data[i + 1] = 255 - data[i + 1]; // Green
                    data[i + 2] = 255 - data[i + 2]; // Blue
                }
                ctx.putImageData(imgData, 0, 0);
                break;
            }

            case 'log_transform': {
                let imgData = ctx.getImageData(0, 0, w, h);
                let data = imgData.data;
                
                // البحث عن أعلى قيمة بكسل للوصول لمعامل c الدقيق
                let maxVal = 0;
                for (let i = 0; i < data.length; i += 4) {
                    if (data[i] > maxVal) maxVal = data[i];
                    if (data[i + 1] > maxVal) maxVal = data[i + 1];
                    if (data[i + 2] > maxVal) maxVal = data[i + 2];
                }
                
                let c = 255 / Math.log(1 + (maxVal || 255));
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = Math.min(255, c * Math.log(1 + data[i]));
                    data[i + 1] = Math.min(255, c * Math.log(1 + data[i + 1]));
                    data[i + 2] = Math.min(255, c * Math.log(1 + data[i + 2]));
                }
                ctx.putImageData(imgData, 0, 0);
                break;
            }

            case 'calc_hist': {
                let imgData = ctx.getImageData(0, 0, w, h);
                let data = imgData.data;
                let hist = new Array(256).fill(0);
                
                for (let i = 0; i < data.length; i += 4) {
                    let gray = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
                    hist[gray]++;
                }
                
                let maxVal = Math.max(...hist);
                ctx.putImageData(imgData, 0, 0);

                // رسم طبقة الهستوجرام التوضيحية فوق الـ Canvas
                ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
                ctx.fillRect(10, h - 115, w - 20, 105);

                ctx.strokeStyle = '#38bdf8';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                for (let i = 0; i < 256; i++) {
                    let x = 10 + (i / 255) * (w - 20);
                    let y = (h - 10) - (hist[i] / (maxVal || 1)) * 95;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
                break;
            }

            case 'histogram_equalization': {
                let imgData = ctx.getImageData(0, 0, w, h);
                let data = imgData.data;
                let hist = new Array(256).fill(0);
                let totalPixels = w * h;

                // تحويل لرمادي وحساب الهستوجرام
                let grays = new Uint8Array(totalPixels);
                for (let i = 0, j = 0; i < data.length; i += 4, j++) {
                    let g = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
                    grays[j] = g;
                    hist[g]++;
                }

                // حساب التوزيع التراكمي (CDF)
                let cdf = new Array(256).fill(0);
                cdf[0] = hist[0];
                for (let i = 1; i < 256; i++) {
                    cdf[i] = cdf[i - 1] + hist[i];
                }

                let cdfMin = cdf.find(val => val > 0) || 1;
                let denominator = (totalPixels - cdfMin) || 1;
                let lut = new Uint8Array(256);
                for (let i = 0; i < 256; i++) {
                    lut[i] = Math.round(((cdf[i] - cdfMin) / denominator) * 255);
                }

                // تطبيق التوزيع المتساوي
                for (let i = 0, j = 0; i < data.length; i += 4, j++) {
                    let eqVal = lut[grays[j]];
                    data[i] = eqVal;     // Red
                    data[i + 1] = eqVal; // Green
                    data[i + 2] = eqVal; // Blue
                }
                ctx.putImageData(imgData, 0, 0);
                break;
            }
        }
    }
};

// إتاحة الكائن تحت الاسمين للتوافق التام مع app.js
const data_lec3 = lecture3;