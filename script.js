const imagePicker = document.querySelector('.image-picker');

const handleFile = (file) => {

    if (!file) return;

    new Promise(resolve => {

        let rawImage = new Image();

        rawImage.addEventListener("load", () => {
            resolve(rawImage);
        });

        rawImage.src = URL.createObjectURL(file);

    }).then(rawImage => {

        return new Promise(resolve => {

            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext("2d");

            canvas.width = rawImage.width;
            canvas.height = rawImage.height;

            ctx.drawImage(rawImage, 0, 0);

            canvas.toBlob(blob => {
                resolve(URL.createObjectURL(blob));
            }, "image/webp");
        });

    }).then(imageURL => {

        return new Promise(resolve => {

            let scaledImg = new Image();

            scaledImg.addEventListener("load", () => {
                resolve({ imageURL, scaledImg });
            });

            scaledImg.setAttribute("src", imageURL);
        });
    }).then(data => {
        console.log(data.imageURL);
    });

}

imagePicker.addEventListener('change', event => {

    for (let file of event.target.files) {
        handleFile(file)
    }

});