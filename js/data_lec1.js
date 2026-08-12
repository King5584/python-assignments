const lecture1 = {
    id: 1,
    title: "المحاضرة الأولى: مفاهيم الصور الرقمية والأشكال الأساسية",
    labOperations: [
        { value: "info", name: "قراءة خصائص الصورة (Image Info)" },
        { value: "drawing", name: "الرسم بالأشكال والتكست (OpenCV Drawing)" },
        { value: "pillow_drawing", name: "الرسم باستخدام (Pillow Drawing)" },
        { value: "format_convert", name: "تغيير صيغ الصور (Format Conversion)" },
        { value: "face_bbox", name: "تحديد الوجوه والتسمية (Face Bounding Box)" },
        { value: "grayscale", name: "تحويل للرمادي (Grayscale)" }
    ],
    lecture: {
        title: "قراءة الصورة وطباعة معلوماتها ورسم الأشكال الأساسية",
        description: "تتناول المحاضرة مفهوم الصور الرقمية وتقسيمها إلى صور نقطية (Raster) وصور متجهية (Vector). كما تشرح نماذج الألوان مثل RGB وCMYK وGrayscale وقناة الشفافية Alpha. تتكون الصورة الملونة في الذاكرة من مصفوفة ثلاثية الأبعاد (Height x Width x Channels). يتم استخدام مكتبتي OpenCV وPillow لقراءة واستعراض خصائص الصور مثل (shape, size, ndim, dtype) ورسم الأشكال الهندسية والنصوص على الصورة.",
        code: `import cv2 as cv
import numpy as np
import os
from PIL import Image
from PIL import Image, ImageDraw, ImageFont
image_path = './images/88.jpg'

if not os.path.exists(image_path):
    print("Image not found!")
    exit()
else:
    try:
        # Read the image from the given path
        image = cv.imread(image_path)

        # Display the image
        cv.imshow("Image", image)

        # Print the image details
        print(f"The Image is {image}")
        print(f"The Image is {image.shape}")   # Shape is (Height, Width, Channels)
        print(f"The Image is {image.size}")    # Size is the total number of pixels
        print(f"The Image is {image.ndim}")    # Number of dimensions
        print(f"The Image is {image.dtype}")   # Data type of the pixels

        # Wait for a key to be pressed
        cv.waitKey(0)
    except Exception as e:
        print(f"Error loading image: {e}")
        exit()


        #////////////////////////////////////////
        image_path = './images/88.jpg'

if not os.path.exists(image_path):
    print("Image not found!")
else:
    try:
        # Open an image file
        img = Image.open(image_path)
        
        # Print basic image details
        print(f"Image Format: {img.format}")
        print(f"Image Path: {img.filename}")
        print(f"Image Size: {img.size}")
        print(f"Image Mode: {img.mode}")
        
        # Display the image
        img.show()
        
        # Close the image file
        img.close()
    except FileNotFoundError:
        print(f"Error: The image at {image_path} was not found.")
    except Exception as e:
        print(f"An error occurred while processing the image: {e}")

        #//////////////////////////////////////////

        # إنشاء لوحة بيضاء مقاس 512x512 بثلاث قنوات ألوان
pint = np.ones((512, 512, 3), np.uint8) * 255

# 1. رسم خط أسود مائل من الإحداثي (0,0) إلى (400,400)
cv.line(pint, (0, 0), (400, 400), (0, 0, 0), 2)

# 2. رسم مستطيل أحمر (ترتيب الألوان في OpenCV هو BGR)
cv.rectangle(pint, (100, 100), (500, 500), (0, 100, 255), 5)

# 3. رسم دائرة سماوية/سفراء
cv.circle(pint, (256, 256), 100, (255, 255, 0), 3)

# 4. كتابة نص على اللوحة
cv.putText(pint, "Hello World", (0, 250), cv.FONT_HERSHEY_DUPLEX, 2, (0, 255, 255), 3)

# 5. حفظ اللوحة في المجلد باسم pinting.png وعرضها
cv.imwrite('./images/رسم صوره.png', pint)
cv.imshow('pint', pint)
cv.waitKey(0)

#/////////////////////////////////////////////

image = cv.imread('./images/88.jpg', 1)
(B, G, R) = image[100, 100]

print(f'The Red Color Dgree is {R}-The Blue Color Dgree is {B} and The Green Color is{G}')

#//////////////////////////////////////////////////

# متطلبات المقرر...................................................
import cv2 as cv
import numpy as np

image = cv.imread('./images/88.jpg', 1)
black_image = image.copy()

for i in range(300):
    for j in range(300):
        black_image[j, i] = (0, 0, 0)

pixel_image = image.copy()

# تم تعديل القيمة هنا لتصبح 400 بدلاً من 500 حتى لا تتجاوز عرض الصورة (416)
for i in range(400):
    pixel_image[0, i] = (100, 255, 40)

pixel_images = np.hstack((black_image, pixel_image))

cv.imshow('color pixeles', pixel_images)
cv.waitKey(0)

#///////////////////////////////

image = cv.imread('./images/88.jpg', 1)

k = cv.waitKey(0)

if k == 27:
    cv.destroyAllWindows()

if k == ord('s'):
    cv.imwrite('./images/123.png', image)

#cv.imwrite('./images/88.png', image)
    
#import os
#print("المسار الكامل الذي حُفظت فيه الصورة هو:")
#print(os.getcwd())

`
    },
    assignment: {
        title: "التكليف الأول: مقارنة المكتبات والتحويلات وتحديد الوجوه",
        description: "1. عمل مقارنة بين مكتبة Pillow ومكتبة OpenCV.\n2. رسم نفس الصورة البرمجية باستخدام مكتبة Pillow.\n3. قراءة مجلد صور وتغيير صيغة الصور وحفظها في المجلد.\n4. جلب صور أشخاص ورسم مربعات على الوجوه مع كتابة الاسم أسفل المربع بالتحديد اليدوي للإحداثيات.",
        code: `from PIL import Image, ImageDraw, ImageFont

# 1. إنشاء لوحة بيضاء أبعادها 512x512
img = Image.new('RGB', (512, 512), color='white')
draw = ImageDraw.Draw(img)

# 2. رسم خط أسود من (0, 0) إلى (400, 400) بسماكة 2
draw.line([(0, 0), (400, 400)], fill='black', width=5)

# 3. رسم مستطيل أحمر من (100, 100) إلى (500, 500) بسماكة 5
draw.rectangle([(100, 100), (500, 500)], outline='red', width=5)

# 4. رسم دائرة باللون الأصفر/السماوي بمركز (256, 256) ونصف قطر 100
# في Pillow نحدد المستطيل المحيط بالدائرة [(X_min, Y_min), (X_max, Y_max)]
draw.ellipse([(156, 156), (356, 356)], outline=(255, 255, 0), width=6)

# 5. كتابة نص "Hello World"
draw.text((10, 250), "Hello World", fill=(0, 255, 255))

# 6. حفظ الصورة وعرضها
img.save('./images/home/pillow_drawing.png')
img.show()


#////////////////////////////////////////////////////
#////////////////////////////////////////////////////
#////////////////////////////////////////////////////
import os
from PIL import Image

# تحديد مجلد المدخلات ومجلد الخرج
input_folder = "./images"
output_folder = "./images/home/a"

# إنشاء مجلد الخرج إذا لم يكن موجوداً
if not os.path.exists(output_folder):
  os.makedirs(output_folder)

# التكرار عبر جميع الملفات داخل المجلد
for filename in os.listdir(input_folder):
  # التأكد من أن الملف هو صورة بالصيغ المدعومة
  if filename.lower().endswith((".png", ".jpg", ".jpeg", ".bmp", ".webp")):
    img_path = os.path.join(input_folder, filename)

    try:
      with Image.open(img_path) as img:
        # فصل اسم الملف عن الصيغة الأصلية
        base_name = os.path.splitext(filename)[0]
        # تحديد المسار وصيغة الحفظ الجديدة (مثال: تحويل إلى PNG)
        output_path = os.path.join(output_folder, f"{base_name}.png")

        img.save(output_path, "PNG")
        print(f"تم تحويل وحفظ: {filename} إلى {base_name}.png")
    except Exception as e:
      print(f"حدث خطأ أثناء معالجة الملف {filename}: {e}")


#////////////////////////////////////////////////////
#////////////////////////////////////////////////////
#////////////////////////////////////////////////////

import cv2

# قراءة الصورة
image_path = "./images/home/person.jpg"  # ضع اسم أو مسار صورتك هنا
image = cv2.imread(image_path)

# التأكد من أن الصورة تم تحميلها بنجاح
if image is not None:
  # تحديد إحداثيات المربع يدويًا (x, y, width, height) بناءً على مكان الوجه في صورتك
  x, y, w, h = (
      120,
      80,
      180,
      180,
  )  # قم بتعديل هذه القيم لتناسب صورتك الشخصية

  # رسم مربع أخضر حول الوجه (الإحداثيات، اللون (B, G, الر, سمك الخط)
  cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 3)

  # كتابة الاسم تحت المربع
  name = "Ahmed Ali"  # استبدل الاسم بالاسم المطلوب
  font = cv2.FONT_HERSHEY_SIMPLEX
  # إحداثيات مكان ظهور النص (تحت المربع مباشرة)
  text_position = (x, y + h + 35)

  cv2.putText(
      image,
      name,
      text_position,
      font,
      0.8,
      (255, 0, 0),
      2,
      cv2.LINE_AA,
  )  # لون النص أزرق

  # حفظ وعرض الصورة الناتجة
  cv2.imwrite("./images/home/face_detected.jpg", image)
  print("تم حفظ الصورة مع تحديد الوجه والاسم بنجاح.")

  # لعرض الصورة (إذا كنت تعمل على بيئة تدعم النوافذ الرسومية مثل Jupyter أو محلياً)
  # cv2.imshow("Face Detection", image)
  # cv2.waitKey(0)
  # cv2.destroyAllWindows()
else:
  print("تعذر قراءة الصورة، يرجى التأكد من مسار الصورة.")`
    },
    // دالة تفاعل المختبر الخاصة بالمحاضرة الأولى
    processLab: function (op, ctx, loadedImage, w, h) {
        switch (op) {
            case 'info':
                ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
                ctx.fillRect(20, 20, 280, 120);
                ctx.fillStyle = '#00FFCC';
                ctx.font = 'bold 15px monospace';
                ctx.textAlign = 'left';
                ctx.fillText(`Shape: (${h}, ${w}, 3)`, 35, 50);
                ctx.fillText(`Total Size: ${w * h * 3} bytes`, 35, 80);
                ctx.fillText(`Data Type: uint8`, 35, 110);
                break;

            case 'drawing':
            case 'pillow_drawing':
                ctx.strokeStyle = '#00FF00';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(w * 0.8, h * 0.8);
                ctx.stroke();

                ctx.strokeStyle = '#FF0000';
                ctx.lineWidth = 5;
                ctx.strokeRect(w * 0.2, h * 0.2, w * 0.6, h * 0.6);

                ctx.strokeStyle = '#FFFF00';
                ctx.beginPath();
                ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.2, 0, 2 * Math.PI);
                ctx.stroke();

                ctx.fillStyle = '#00FFFF';
                ctx.font = `bold ${Math.round(w / 12)}px Arial`;
                ctx.textAlign = 'center';
                ctx.fillText('Hello World', w / 2, h * 0.5);
                break;

            case 'format_convert':
                ctx.fillStyle = 'rgba(40, 167, 69, 0.85)';
                ctx.fillRect(w - 220, 20, 200, 45);
                ctx.fillStyle = '#FFFFFF';
                ctx.font = 'bold 15px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('✓ Formatted: PNG -> JPG', w - 120, 48);
                break;

            case 'face_bbox':
                const bx = w * 0.25, by = h * 0.20, bw = w * 0.50, bh = h * 0.50;
                ctx.strokeStyle = '#00FF00';
                ctx.lineWidth = 3;
                ctx.strokeRect(bx, by, bw, bh);
                ctx.fillStyle = 'rgba(0, 255, 0, 0.85)';
                ctx.fillRect(bx, by + bh, bw, 30);
                ctx.fillStyle = '#000000';
                ctx.font = 'bold 16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Student Name', bx + bw / 2, by + bh + 22);
                break;

            case 'grayscale':
                if (loadedImage) {
                    let imgData = ctx.getImageData(0, 0, w, h);
                    let data = imgData.data;
                    for (let i = 0; i < data.length; i += 4) {
                        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                        data[i] = data[i + 1] = data[i + 2] = avg;
                    }
                    ctx.putImageData(imgData, 0, 0);
                }
                break;
        }
    }
};

const snippets1 = {
    info: `import cv2 as cv\nimage = cv.imread('image.jpg')\nprint(image.shape, image.size, image.dtype)`,
    drawing: `import cv2 as cv\nimport numpy as np\ncanvas = np.ones((512, 512, 3), dtype=np.uint8) * 255\ncv.line(canvas, (0, 0), (400, 400), (0, 255, 0), 2)\ncv.rectangle(canvas, (100, 100), (400, 400), (0, 0, 255), 5)\ncv.circle(canvas, (256, 256), 100, (255, 255, 0), 3)\ncv.putText(canvas, "Hello World", (30, 250), cv.FONT_HERSHEY_DUPLEX, 1.5, (0, 255, 255), 3)`,
    pillow_drawing: `from PIL import Image, ImageDraw\nimg = Image.new('RGB', (512, 512), color='white')\ndraw = ImageDraw.Draw(img)\ndraw.rectangle([(100, 100), (400, 400)], outline=(255, 0, 0), width=5)`,
    format_convert: `from PIL import Image\nimg = Image.open('image.png')\nimg.convert('RGB').save('image.jpg')`,
    face_bbox: `import cv2 as cv\nimage = cv.imread('person.jpg')\ncv.rectangle(image, (100, 50), (250, 200), (0, 255, 0), 2)\ncv.putText(image, "User Name", (100, 220), cv.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)`,
    grayscale: `import cv2 as cv\nimage = cv.imread('image.jpg')\nresult = cv.cvtColor(image, cv.COLOR_BGR2GRAY)`
};