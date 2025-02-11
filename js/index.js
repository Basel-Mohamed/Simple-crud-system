// decelerate Variables
let siteName = document.getElementById("siteName");
let siteUrl = document.getElementById("siteUrl");
let submit = document.querySelector(".submit")
let update = document.querySelector(".update")
let currentIndex= 0;
// make empty array
let sitesList = [];

if (localStorage.getItem("listOfSites") !== null) {
  sitesList = JSON.parse(localStorage.getItem("listOfSites"));
  displayData();
}

// decelerate functions
function addSite() {
  let nameValid = Validation(siteName, true);
  let urlValid = Validation(siteUrl, true);
  if (nameValid && urlValid) {
    let site = {
      name: siteName.value,
      url: siteUrl.value,
    };

    sitesList.push(site);

    localStorage.setItem("listOfSites", JSON.stringify(sitesList));

    displayData();

    clearForm();
  }
}

function clearForm() {
  siteName.value = null;
  siteUrl.value = null;

  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
}

function displayData() {
  let div = "";

  for (let i = 0; i < sitesList.length; i++) {
    div += `<div class="border-bottom">
            <div class="row py-2 align-items-center">
            <div class="col-1">${i + 1}</div>
            <div class="col-2">${sitesList[i].name}</div>
            <div class="col-3 visit-div">
            <button onclick="visitSite(${i})" class="visit-btn text-white">
             <i class="fa-solid fa-eye"></i> Visit
            </button>
              </div>
            <div class="col-3 update-div">
            <button onclick="updateSite(${i})" class="update-btn text-white">
             <i class="fa-regular fa-pen-to-square"></i> Update
            </button>
              </div>
            <div class="col-3 delete-div">
               <button onclick="removeSite(${i})" class="delete-btn text-white">
                 <i class="fa-solid fa-trash"></i> Delete
                </button>
            </div>
            </div>
            </div>`;
  }
  document.getElementById("visit-row").innerHTML = div;
}







function removeSite(index) {
  sitesList.splice(index, 1);
  localStorage.setItem("listOfSites", JSON.stringify(sitesList));

  displayData();
}

function visitSite(index) {
  window.open(sitesList[index].url, "_blank");
}

function updateSite(index){
  currentIndex = index
   siteName.value = sitesList[index].name
   siteUrl.value = sitesList[index].url
   submit.classList.add("d-none")
   update.classList.remove("d-none")
 }
 
 
 function setUpdate(){
 
 let nameValid = Validation(siteName, true);
 let urlValid = Validation(siteUrl, true);
 if (nameValid && urlValid) {
   let site = {
     name: siteName.value,
     url: siteUrl.value,
   };
 
   sitesList.splice( currentIndex    ,  1    ,  site  );
 
   localStorage.setItem("listOfSites", JSON.stringify(sitesList));
 
   update.classList.add("d-none")
   submit.classList.remove("d-none")
 
   displayData();
 
   clearForm();
 }
 }

function Validation(input, isSubmit = false) {
  let obj = input.value.trim();
  let regex = {
    siteName: /^[\p{L}0-9-\s]{3,10}$/u,

    siteUrl:
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
  };

  let alertBox = document.getElementById("msg-alert");

  if (regex[input.id].test(obj)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");

    if (isSubmit) {
      alertBox.style.display = "none";
    }

    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");

    if (isSubmit) {
      alertBox.style.display = "flex";
    }

    return false;
  }
}

function closeAlert() {
  let alertBox = document.getElementById("msg-alert");
  alertBox.style.display = "none";
}

document.addEventListener("click", function (e) {
  let alertBox = document.getElementById("msg-alert");

  if (e.target == alertBox) {
    closeAlert();
  }
});
