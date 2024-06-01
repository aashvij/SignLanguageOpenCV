var Module = {
    onRuntimeInitialized() {
        console.log("spot1");
        setupSignLangApp();
    }
  };
  
  function setupHtmlVideoCapture() {
    // set up html video capture
    let video = document.getElementById("videoElement");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.log("An error occurred! " + err);
      });
    return video;
  }
  
  function setupSignLangApp() {
    const video = setupHtmlVideoCapture();
    let videoCapture = new cv.VideoCapture(video);
  
    let mat = new cv.Mat(480, 640, cv.CV_8UC4);
    let dst = new cv.Mat(480, 640, cv.CV_8UC4);
  
    const FPS = 30;
  
    function processVideo() {
      let start = Date.now();
  
      // capture a frame from the video and put it into my opencv mat object for processing
      videoCapture.read(mat);
  
      // do some processing on the mat object
      cv.cvtColor(mat, dst, cv.COLOR_BGR2GRAY);
      cv.imshow("canvasFrame", dst);
  
      let delay = 1000 / FPS - (Date.now() - start);
      setTimeout(processVideo, delay);
    }
    setTimeout(processVideo, 0);
  }