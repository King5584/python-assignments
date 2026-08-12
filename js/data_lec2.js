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
import os

image = cv.imread('./images/30.jpg')

image_rgb = cv.cvtColor(image, cv.COLOR_BGR2RGB)

plt.title('Show Images')

plt.imshow(image_rgb)
plt.show()

#////////////////////////////////////////////////
#//////////////////////////////////////
image = cv.imread('./images/30.jpg')

(B, G, R) = cv.split(image)

mask = np.zeros(image.shape[:2], dtype="uint8")

image_r = cv.merge((R, mask, mask))  
image_g = cv.merge((mask, G, mask))  
image_b = cv.merge((mask, mask, B))  
plt.figure(figsize=(10, 5))

plt.subplot(1, 3, 1)
plt.imshow(image_r)
plt.title('Red Channel')
plt.axis('off')  

plt.subplot(1, 3, 2)
plt.imshow(image_g)
plt.title('Green Channel')
plt.axis('off')

plt.subplot(1, 3, 3)
plt.imshow(image_b)
plt.title('Blue Channel')
plt.axis('off')

plt.suptitle('Color Channels')
plt.show()


###
#///////////////////////////////////
#
#image = cv.imread('./images/30.jpg')
#start_row=160
#end_row=310

#start_col=200
#end_col=200

#cropped_image=image[start_row:end_row,start_col:end_col]
#cv.imshow('cropped_image', cropped_image)
#cv.waitKey(0)
#cv.destroyAllWindows()


#
#///////////////////////////////////////////
#

import cv2 as cv

# قراءة الصورة
image = cv.imread('./images/30.jpg')

# تحديد معاملات التكبير والتصغير
scale_factor_zoom = 2.0  # التكبير لضعف الحجم
scale_factor_shrink = 0.5  # التصغير للنصف

# جلب الأبعاد الأصلية للصورة
height, width = image.shape[:2]

# 1. التكبير (Zooming)
new_height_zoom = int(height * scale_factor_zoom)
new_width_zoom = int(width * scale_factor_zoom)
zoomed_image = cv.resize(
    image, (new_width_zoom, new_height_zoom), interpolation=cv.INTER_CUBIC
)

# 2. التصغير (Shrinking)
new_height_shrink = int(height * scale_factor_shrink)
new_width_shrink = int(width * scale_factor_shrink)
shrunk_image = cv.resize(
    image, (new_width_shrink, new_height_shrink), interpolation=cv.INTER_AREA
)

# عرض النتائج
cv.imshow('Original', image)
cv.imshow('Zoomed', zoomed_image)
cv.imshow('Shrunk', shrunk_image)

cv.waitKey(0)
cv.destroyAllWindows()


import cv2 as cv
import matplotlib.pyplot as plt

# قراءة الصورة وتحويلها إلى RGB
image = cv.imread('./images/30.jpg')
image_rgb = cv.cvtColor(image, cv.COLOR_BGR2RGB)

# حساب مركز الصورة
center = (image_rgb.shape[1] // 2, image_rgb.shape[0] // 2)

# إنشاء مصفوفة الدوران (المركز، الزاوية، معامل المقياس)
# زاوية 30 درجة مع تصغير الحجم إلى 0.7
rotation_matrix1 = cv.getRotationMatrix2D(center, 30, 0.7)
# زاوية 30 درجة مع إبقاء الحجم الأصلي 1.0
rotation_matrix2 = cv.getRotationMatrix2D(center, 30, 1.0)

# تطبيق التدوير
rotated_image1 = cv.warpAffine(
    image_rgb, rotation_matrix1, (image.shape[1], image.shape[0])
)
rotated_image2 = cv.warpAffine(
    image_rgb, rotation_matrix2, (image.shape[1], image.shape[0])
)

# عرض الصور باستخدام Matplotlib
plt.figure(figsize=(12, 6))

plt.subplot(1, 3, 1)
plt.imshow(image_rgb)
plt.title('Original Image')

plt.subplot(1, 3, 2)
plt.imshow(rotated_image1)
plt.title('Rotated 30 Deg (Scale 0.7)')

plt.subplot(1, 3, 3)
plt.imshow(rotated_image2)
plt.title('Rotated 30 Deg (Scale 1.0)')

plt.suptitle('Image Rotation')
plt.show()


`
    },
    assignment: {
        title: "التكاليف المطلوبة للمحاضرة الثانية",
        description: "1. كتابة برنامج يستقبل نوع العملية الهندسية من المستخدم (قص، تغيير حجم، دوران، إزاحة) ثم يطلب الإحداثيات اللازمة وينفذها.\n2. اقتطاع 3 أجزاء (كواكب) من الصورة ودمجها مجدداً في مواضع مختلفة من الصورة الأصلية.\n3. اختيار صورة منتج بدون خلفية وصورة خلفية دمجها باستخدام مكتبة Pillow.",
        code: `import cv2 as cv

# 1. قراءة الصورة
image = cv.imread('./images/30.jpg')

if image is None:
  print("خطأ: لم يتم العثور على الصورة '20.jpg'!")
else:
  # جلب الارتفاع والعرض للصورة
  h, w = image.shape[:2]

  # حساب أبعاد التقسيم (صفين و 3 أعمدة)
  row_h = h // 2
  col_w = w // 3

  # ---------------------------------------------------------
  # 1. قص 3 كواكب من أماكنها الأصلية
  # ---------------------------------------------------------
  # قص كوكب Earth (الصف الأول، العمود الأول)
  earth = image[0:row_h, 0:col_w].copy()

  # قص كوكب Venus (الصف الأول، العمود الثالث)
  venus = image[0:row_h, 2 * col_w : w].copy()

  # قص كوكب Uranus (الصف الثاني، العمود الثاني)
  uranus = image[row_h:h, col_w : 2 * col_w].copy()

  # ---------------------------------------------------------
  # 2. دمج الكواكب مع مطابقة الأبعاد تماماً باستعمال cv.resize
  # ---------------------------------------------------------
  # وضع Earth مكان Venus (أعلى اليمين)
  target_shape1 = image[0:row_h, 2 * col_w : w].shape
  image[0:row_h, 2 * col_w : w] = cv.resize(
      earth, (target_shape1[1], target_shape1[0])
  )

  # وضع Venus مكان Uranus (أسفل الوسط)
  target_shape2 = image[row_h:h, col_w : 2 * col_w].shape
  image[row_h:h, col_w : 2 * col_w] = cv.resize(
      venus, (target_shape2[1], target_shape2[0])
  )

  # وضع Uranus مكان Earth (أعلى اليسار)
  target_shape3 = image[0:row_h, 0:col_w].shape
  image[0:row_h, 0:col_w] = cv.resize(
      uranus, (target_shape3[1], target_shape3[0])
  )

  # ---------------------------------------------------------
  # 3. عرض الصورة الناتجة
  # ---------------------------------------------------------
  cv.imshow('Planets Merged Perfectly', image)
  cv.waitKey(0)
  cv.destroyAllWindows()



  import cv2 as cv
import numpy as np
from PIL import Image

# 1. فتح صورة الخلفية وصورة المنتج
background = Image.open('./images/home/back.jpg').convert('RGBA')
product_cv = cv.imread('./images/home/prod.jpg')

# ---------------------------------------------------------
# 2. تفريغ المنتج برمجياً لإزالة المربعات الرصاصية والبيضاء
# ---------------------------------------------------------
# تحويل صورة المنتج لنظام BGR إلى Gray للتعرف على المربعات الفاتحة
gray = cv.cvtColor(product_cv, cv.COLOR_BGR2GRAY)

# إنشاء قناع (Mask) يحدد المنتجات الزرقاء والداكنة ويستثني الخلفية الشبه بيضاء
_, mask = cv.threshold(gray, 235, 255, cv.THRESH_BINARY_INV)

# تحويل القناع إلى صيغة PIL
mask_pil = Image.fromarray(mask)

# تحويل صورة المنتج إلى صيغة PIL RGBA
product_pil = Image.open('./images/home/prod.jpg').convert('RGBA')

# ---------------------------------------------------------
# 3. ضبط أبعاد المنتج وتمركزه فوق خلفية الجدار الخشبي
# ---------------------------------------------------------
bg_w, bg_h = background.size

# جعل حجم المنتج يساوي 45% من عرض خلفية الجدار
target_w = int(bg_w * 0.45)
aspect_ratio = product_pil.height / product_pil.width
target_h = int(target_w * aspect_ratio)

# تغيير الحجم للمنتج والقناع
product_resized = product_pil.resize(
    (target_w, target_h), Image.Resampling.LANCZOS
)
mask_resized = mask_pil.resize((target_w, target_h), Image.Resampling.LANCZOS)

# وضع المنتج في أسفل منتصف الجدار فوق الأرضية الخشبية تماماً
pos_x = (bg_w - target_w) // 2
pos_y = int(bg_h * 0.45)  # ضبط الموضع ليكون واقوعياً تحت الإضاءة

# ---------------------------------------------------------
# 4. دمج المنتج فوق الخلفية باستخدام القناع المتكون
# ---------------------------------------------------------
background.paste(product_resized, (pos_x, pos_y), mask=mask_resized)

# 5. حفظ وعرض النتيجة
final_result = background.convert('RGB')
final_result.show()
final_result.save('./images/home/final_product_wall.jpg')

print("تم الدمج بنجاح وإزالة الخلفية الوهمية!")`
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