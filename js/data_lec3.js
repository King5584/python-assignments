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


#. كود تحويل الصورة للسالب (Negative Transform)
image_path = "./images/img4.png"

if not os.path.exists(image_path):
    print(f"The Path {image_path} does not exist")
    exit()
else:
    try:
        image = cv.imread(image_path)
        image_negative = 255 - image

        plt.figure(figsize=(5, 5))
        plt.subplot(1, 2, 1)
        plt.imshow(image)
        plt.title('Original Image')

        plt.subplot(1, 2, 2)
        plt.imshow(image_negative)
        plt.title('Image Negative')

        plt.show()
    except Exception as e:
        print(f"There is Error {e}")


#2. كود التحويل اللوغاريتمي - التدرج الرمادي (Log Transform - Grayscale)
        import cv2 as cv
import numpy as np
import os
import matplotlib.pyplot as plt

path = './src/images/Arithmetic.jpg'

if not os.path.exists(path):
    print("File not found")
    exit()
else:
    image = cv.imread(path, 0)
    
    # Convert image to float32 to avoid overflow
    image_float = np.float32(image)
    
    # Calculate c using the formula c = 255 / log(1 + max_val)
    c = 255 / np.log(1 + np.max(image_float))
    
    # Apply log transformation to the image (s = c * log(1 + r))
    image_log = c * np.log(1 + image_float)
    
    # Convert the transformed image back to uint8
    image_log = np.uint8(image_log)

    # Show Image
    plt.figure(figsize=(10, 5))
    plt.subplot(1, 2, 1)
    plt.title('Original Image')
    plt.imshow(image, cmap='gray')

    plt.subplot(1, 2, 2)
    plt.title('Log Transformed Image')
    plt.imshow(image_log, cmap='gray')
    plt.show()



    #3. كود التحويل اللوغاريتمي - الصور الملونة (Log Transform - RGB)
    import cv2 as cv
import numpy as np
import os
import matplotlib.pyplot as plt

path = './src/images/Arithmetic.jpg'

if not os.path.exists(path):
    print(f"not Found")
    exit()
else:
    image = cv.imread(path)
    image_float = np.float32(image)
    
    c = 255 / np.log(1 + np.max(image_float))
    image_log = c * np.log(1 + image_float)
    image_log = np.uint8(image_log)

    plt.figure(figsize=(10, 5))
    plt.subplot(1, 2, 1)
    plt.title('Original Image')
    plt.imshow(cv.cvtColor(image, cv.COLOR_BGR2RGB))

    plt.subplot(1, 2, 2)
    plt.title('Log Transformed Image')
    plt.imshow(cv.cvtColor(image_log, cv.COLOR_BGR2RGB))
    plt.show()


    #4. كود تسوية المدرج التكراري (Histogram Equalization)


    import cv2 as cv
import numpy as np
import os
import matplotlib.pyplot as plt

path = "./images/forestBefore.png"

if not os.path.exists(path):
    print(f"not Found")
    exit()
else:
    # قراءة الصورة بنظام التدرج الرمادي
    image = cv.imread(path, 0)
    
    # حساب الهيستوجرام للصورة الأصلية والصورة المعالجة
    image_hst = cv.calcHist([image], [0], None, [256], [0, 256])
    image_eqlize = cv.equalizeHist(image)
    image_eqlize_hst = cv.calcHist([image_eqlize], [0], None, [256], [0, 256])

    # رسم الرسوم البيانية (Histograms)
    plt.figure(figsize=(10, 5))
    plt.subplot(1, 2, 1)
    plt.plot(image_hst, color='r')
    plt.title('Original Histogram')
    plt.xlabel("pixel value")
    plt.ylabel("frequency")

    plt.subplot(1, 2, 2)
    plt.plot(image_eqlize_hst, color='b')
    plt.title('Equalized Histogram')
    plt.xlabel("pixel value")
    plt.ylabel("frequency")

    # عرض الصور الأصلية والمعدلة
    plt.figure(figsize=(10, 5))
    plt.subplot(1, 2, 1)
    plt.imshow(cv.cvtColor(image, cv.COLOR_BGR2RGB))
    plt.title('Original Image')

    plt.subplot(1, 2, 2)
    plt.imshow(cv.cvtColor(image_eqlize, cv.COLOR_BGR2RGB))
    plt.title('Equalized Image')

    plt.show()`
    },
    assignment: {
        title: "التكاليف المطلوبة للمحاضرة الثالثة",
        description: "1. تطبيق تحويل الصورة السالبة على صورة طيفية/طبية وإظهار الفرق قبل وبعد التحويل.\n2. تطبيق التحويل اللوغاريتمي على صورة تحتوي نطاقاً واسعاً من القيم الداكنة لتحسين وضوح المعالم المخفية.\n3. قراءة صورة معتمة، حساب الهستوجرام لها، ثم تطبيق تسوية الهستوجرام (Histogram Equalization) ورسم الهستوجرام والصورة قبل وبعد التسوية.",
        code: `import os
import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt

def check_image_exists(image_path):
    if not os.path.exists(image_path):
        print(f"The Path {image_path} does not exist")
        return False
    return True

def negative_transform(image):
    image_negative = 255 - image
    return image_negative

def log_transform(image):
    image_float = np.float32(image)
    c = 255 / np.log(1 + np.max(image_float))
    image_log = c * np.log(1 + image_float)
    image_log = np.uint8(image_log)
    return image_log

def histogram_equalize(image):
    if len(image.shape) == 3:
        gray_image = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    else:
        gray_image = image

    image_hst = cv.calcHist([gray_image], [0], None, [256], [0, 256])
    image_equalized = cv.equalizeHist(gray_image)
    image_eqlize_hst = cv.calcHist([image_equalized], [0], None, [256], [0, 256])
    
    return image_hst, image_eqlize_hst, image_equalized

def dynamic_display(rows, cols, images, titles=None, figsize=(10, 5)):
    plt.figure(figsize=figsize)
    total_plots = rows * cols
    
    for i, img in enumerate(images):
        if i >= total_plots:
            break
        plt.subplot(rows, cols, i + 1)
        
        if len(img.shape) == 3:
            plt.imshow(cv.cvtColor(img, cv.COLOR_BGR2RGB))
        elif len(img.shape) == 2:
            plt.imshow(img, cmap='gray')
        else:
            plt.plot(img)
            
        if titles and i < len(titles):
            plt.title(titles[i])
            
    plt.tight_layout()
    plt.show()

    ///////////////////////////////////////
    import home as pt

path = "./images/img4.png"

if pt.check_image_exists(path):
    import cv2 as cv
    image = cv.imread(path)
    
    neg_img = pt.negative_transform(image)
    pt.dynamic_display(1, 2, [image, neg_img], ["Original Image", "Negative Image"])
    `
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