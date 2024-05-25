console.log(cv.Mat);

function openCvReady() {
    console.log('spot 1');
    cv['onRuntimeInitialized'] =()=>{
        let canvasFrame = document.getElementById("canvasFrame");
        let context = canvasFrame.getContext("2d");
        let video = document.getElementById("videoElement");
        let capture = new cv.VideoCapture(video);
        let matrix = new cv.Mat(640, 480, cv.CV_8UC4);
        const FPS = 30;

        function processVideo(){
            let start = Date.now();
            capture.read(matrix);
            context.drawImage(matrix, 0, 0, video.width, video.height);
            // let imageData = context.getImageData(0, 0, video.width, video.height);
            // matrix.data.set(imageData.data);
            // cv.imshow("canvasFrame", matrix);
            let delay = 1000 / FPS - (Date.now() - start);
            setTimeout(processVideo, delay);
        }
        setTimeout(processVideo, 0);
    }
}
