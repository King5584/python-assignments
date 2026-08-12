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
        code: `import cv2 as cv\nimport numpy as np\n\nimage = cv.imread('network.jpg')\nif image is not None:\n    print(f"Shape: {image.shape}")\n    print(f"Size: {image.size}")\n\npint = np.ones((512, 512, 3), np.uint8) * 255\ncv.line(pint, (0, 0), (400, 400), (0, 255, 0), 2)\ncv.rectangle(pint, (100, 100), (500, 500), (0, 0, 255), 5)\ncv.circle(pint, (256, 256), 100, (255, 255, 0), 3)\ncv.putText(pint, "Hello World", (0, 250), cv.FONT_HERSHEY_DUPLEX, 2, (0, 255, 255), 5)`
    },
    assignment: {
        title: "التكليف الأول: مقارنة المكتبات والتحويلات وتحديد الوجوه",
        description: "1. عمل مقارنة بين مكتبة Pillow ومكتبة OpenCV.\n2. رسم نفس الصورة البرمجية باستخدام مكتبة Pillow.\n3. قراءة مجلد صور وتغيير صيغة الصور وحفظها في المجلد.\n4. جلب صور أشخاص ورسم مربعات على الوجوه مع كتابة الاسم أسفل المربع بالتحديد اليدوي للإحداثيات.",
        code: `from PIL import Image, ImageDraw\nimport cv2 as cv\n\n# رسم بالشكل والتكست عبر Pillow\nimg = Image.new('RGB', (512, 512), color='white')\ndraw = ImageDraw.Draw(img)\ndraw.line([(0, 0), (400, 400)], fill='green', width=2)\ndraw.rectangle([(100, 100), (500, 500)], outline='red', width=5)\nimg.save('pillow_result.png')`
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