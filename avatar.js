var myDropzone = new Dropzone("i#avatar-upload-btn", {
  url: "/imgs",
  previewsContainer: "#img-wrapper",
  autoProcessQueue: false,
  maxFiles: 1,
});
Dropzone.autoDiscover = false;
let imgWrap = document.querySelector("#img-wrapper");
let choiceContainer = document.querySelector(".choice-container");
let textBox = document.querySelector(".text");
let cancelBtn = document.getElementById("cancel-btn");

myDropzone.on("addedfile", function (file) {});

myDropzone.on("thumbnail", function (file, dataURL) {
  imgWrap.innerHTML = `<img class="image"
  id="img" src=${dataURL} />`;
  choiceContainer.style.display = "flex";
  textBox.style.display = "none";
  let uploadBtn = document.getElementById("upload-btn");
  let fileCallBack = file;
  uploadBtn.addEventListener("click", function uploadAvatar(e) {
    console.log("sdsd", fileCallBack);
    myDropzone.processQueue(fileCallBack);
  });
});

myDropzone.on("complete", function (file) {
  let formData = new FormData();
  imgWrap.innerHTML = `<img class="image"
  id="img" src=${file.dataURL} />`;
  formData.append("photo", file);
  console.log(formData);
  fetch("http://localhost:5500/imgs", { method: "POST", body: formData });
  myDropzone.removeAllFiles();
});

myDropzone.on("reset", function (file) {
  choiceContainer.style.display = "none";
  textBox.style.display = "block";
  imgWrap.innerHTML = `<img
    src="https://demos.creative-tim.com/argon-dashboard-pro/assets/img/theme/team-4.jpg"
    alt="Avatar"
    class="image"
    id="img"
  />`;
});

cancelBtn.addEventListener("click", function cancelUpload(e) {
  myDropzone.removeAllFiles();
});
