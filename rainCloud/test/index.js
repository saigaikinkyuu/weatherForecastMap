document.getElementById('upload').addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('canvas');
                const context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);

                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const colors = getColors(imageData);
                console.log(colors);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function getColors(imageData) {
    const colors = {};
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const blue = data[i + 2];
        const alpha = data[i + 3];
        
        if (alpha > 0) { // Ignore fully transparent pixels
            const color = `rgb(${r},${g},${blue})`;
            if (colors[color]) {
                colors[color]++;
            } else {
                colors[color] = 1;
            }
        }
    }
    return colors;
}
