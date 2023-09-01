
jQuery(function ($) {
  // $ = jQuery regardless of what it means
  // outside this DOM ready function
});



let loadingScreen = $('#loading')

function HideLoad() {
  loadingScreen.fadeOut()
}
function ShowLoad() {
  loadingScreen.fadeIn()
}



function toggleSideNav() {
  var sideNav = document.getElementById('mySideNav');
  var navIco = document.getElementById('stopperBool');
  sideNav.classList.toggle('show');
  navIco.classList.toggle('tada');
}



async function getMealDetails(id) {
  ShowLoad()
  MealData.innerHTML = ""
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  response = await response.json()
  $(".filtered-by").html(``);
  displayMealItem(response.meals)
  
}

function displayMealItem(arr) {

  cartoona = `
  <div class="col-md-4">
  <div class="w-100">
    <img class="w-100 rounded-3" src="${arr[0].strMealThumb}" alt="">
  </div>
  <h2 class = "py-3">${arr[0].strMeal}</h2>
</div>
<div class="col-md-8">
  <div class="w-100">
    <h2>Instructions</h2>
    <p>${arr[0].strInstructions}</p>
    <h2>Area: ${arr[0].strArea}</h2>
    <h2>Category : ${arr[0].strCategory}</h2>
    <h2>Recipes :</h2>
    <div class="Recipes">
      <ul class="list-unstyled d-flex g-3 flex-wrap">      
      <li class="alert alert-info m-2 p-1">${arr[0].strIngredient1}</li>
      <li class="alert alert-info m-2 p-1">${arr[0].strIngredient2}</li>
      <li class="alert alert-info m-2 p-1">${arr[0].strIngredient3}</li>
      <li class="alert alert-info m-2 p-1">${arr[0].strIngredient4}</li>
      <li class="alert alert-info m-2 p-1">${arr[0].strIngredient5}</li>
      <li class="alert alert-info m-2 p-1">${arr[0].strIngredient6}</li>
      
      </ul>
    </div>
    <h2>Tags :</h2>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
      <li class="alert alert-danger m-2 p-1">${arr[0].strTags}</li>
    </ul>
    <a target="_blank" href="null" class="btn btn-success">Source</a>
    <a target="_blank" href="${arr[0].strYoutube}" class="btn btn-danger">Youtube</a>
  </div>
</div>
  `;

  MealData.innerHTML = cartoona
  HideLoad()
}

let MealData = document.getElementById("MealData");
let cartoona = "";
function displayMeals(arr) {
  cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-lg-3 col-md-4 col-sm-6">
              <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${arr[i].strMeal}</h3>
                  </div>
              </div>
      </div>
      `
  }
  MealData.innerHTML = cartoona
  HideLoad()
}
async function getDefault() { //first load
  
  ShowLoad()
  MealData.innerHTML = ""
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=egyptian`)
  response = await response.json()
  $(".filtered-by").html(``);
  displayMeals(response.meals)
  
}

function displayCategories(arr) {
  cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-lg-3 col-md-4 col-sm-6">
              <div onclick="getCategoriesItems('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${arr[i].strCategory}</h3>
                  </div>
              </div>
      </div>
      `
  }
  MealData.innerHTML = cartoona
  HideLoad()
}
async function getCategories() { 
  ShowLoad()  
  MealData.innerHTML = ""
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  response = await response.json()
  $(".filtered-by").html(``);
  displayCategories(response.categories)
  
}
function DisplayCategoriesData(arr) {
  cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-lg-3 col-md-4 col-sm-6">
              <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${arr[i].strMeal}</h3>
                  </div>
              </div>
      </div>
      `
  }
  MealData.innerHTML = cartoona
  HideLoad()
}
async function getCategoriesItems(CatName) {
  ShowLoad()
  MealData.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${CatName}`);
  response = await response.json();
  DisplayCategoriesData(response.meals);
  
}

function searchDown() {
  var searchBar = $('#SearchBar').val()
  SearchByName(searchBar)
}

function DisplaySearchByName(arr) {
  cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-lg-3 col-md-4 col-sm-6">
              <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${arr[i].strMeal}</h3>
                  </div>
              </div>
      </div>
      `
  }
  MealData.innerHTML = cartoona
  HideLoad()
}
async function SearchByName(searchBar) { 
  ShowLoad()
  MealData.innerHTML = ""
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBar}`)
  response = await response.json()
  DisplaySearchByName(response.meals)
  
}



$(".noStyle li a").click(function (e) {
  e.preventDefault();

  //Get letter that was clicked
  var letter = $(this).text();
  $(".filtered-by").html('<p>Filtered by the letter <strong>"' + letter + '"</strong></p>');
  SearchByLetter(letter);

})

function DisplaySearchByLetter(arr) {
  cartoona = "";
  if (arr != null) {
    for (let i = 0; i < arr.length; i++) {
      cartoona += `
        <div class="col-lg-3 col-md-4 col-sm-6">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
  } else {
    cartoona = `
    <div class="bg-danger-subtle rounded-3">
        <h2 class = "text-center">Sorry no recipes with this letter are in our Database</h2>
      </div>
    `
  }

  MealData.innerHTML = cartoona
  HideLoad()
}
async function SearchByLetter(letter) { 
  ShowLoad()
  MealData.innerHTML = ""
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  response = await response.json()
  DisplaySearchByLetter(response.meals)
  
}


function DisplayCountrys(arr) {
  cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-lg-3 col-md-4 col-sm-6">
              <div onclick="getCountryItems('${arr[i].strArea}')" class="country position-relative overflow-hidden rounded-2 cursor-pointer">
              <img class="w-100" src="Img/globe.jpg" alt="" srcset="">
              <p class = "CountryDesc">${arr[i].strArea}</p>
                  
              </div>
      </div>
      `
  }
  MealData.innerHTML = cartoona
  HideLoad()
}
async function GetCountrys() {
  ShowLoad()
  MealData.innerHTML = ""
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  response = await response.json()
  DisplayCountrys(response.meals)
  
}
function DisplayCountryData(arr) {
  cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-lg-3 col-md-4 col-sm-6">
              <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${arr[i].strMeal}</h3>
                  </div>
              </div>
      </div>
      `
  }
  MealData.innerHTML = cartoona
  HideLoad()
}
async function getCountryItems(areaName) {
  ShowLoad()
  MealData.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
  response = await response.json();
  DisplayCountryData(response.meals);
}




function DisplayIngredients(arr) {
  cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-lg-3 col-md-4 col-sm-6">
              <div onclick="getIngredientItems('${arr[i].strIngredient}')" class="country position-relative overflow-hidden rounded-2 cursor-pointer">
              <div class = "w-100 d-flex justify-content-center" ><i class="fa-solid fa-kitchen-set" style = "font-size: 10em;"></i></div>
              <p class = "CountryDesc">${arr[i].strIngredient}</p>
                  
              </div>
      </div>
      `
  }
  MealData.innerHTML = cartoona
  HideLoad()
}
async function GetIngredient() { 
  ShowLoad()
  MealData.innerHTML = ""
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  response = await response.json()
  DisplayIngredients(response.meals)
  
}
function DisplayIngredientData(arr) {
  cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-lg-3 col-md-4 col-sm-6">
              <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${arr[i].strMeal}</h3>
                  </div>
              </div>
      </div>
      `
  }
  MealData.innerHTML = cartoona
  HideLoad()
}
async function getIngredientItems(IngName) {
  ShowLoad()
  MealData.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${IngName}`);
  response = await response.json();
  DisplayIngredientData(response.meals);
  
}













$(document).ready(() => {
  // new WOW().init();

  getDefault()
})

function ContactUs() {
  cartoona = `
  <div class="container mt-5 w-75 text-center">
    <div class="row g-4">
      <div class="col-md-6">
        <input id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
        <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
          Special characters and numbers not allowed
        </div>
      </div>
      <div class="col-md-6">
        <input id="emailInput" type="email" class="form-control " placeholder="Enter Your Email">
        <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
          Email not valid *exemple@yyy.zzz
        </div>
      </div>
      <div class="col-md-6">
        <input id="phoneInput" type="text" class="form-control " placeholder="Enter Your Phone">
        <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
          Enter valid Phone Number
        </div>
      </div>
      <div class="col-md-6">
        <input id="ageInput" type="number" class="form-control " placeholder="Enter Your Age">
        <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
          Enter valid age
        </div>
      </div>
      <div class="col-md-6">
        <input id="passwordInput" type="password" class="form-control " placeholder="Enter Your Password">
        <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
          Enter valid password *Minimum eight characters, at least one letter and one number:*
        </div>
      </div>
      <div class="col-md-6">
        <input id="repasswordInput" type="password" class="form-control " placeholder="Repassword">
        <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
          Enter valid repassword
        </div>
      </div>
    </div>
    <button id="submitBtn" onclick="inputsValidation()" class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>`
  MealData.innerHTML = cartoona
  HideLoad()
}

function inputsValidation() {
  if (nameValidation()) {
    document.getElementById("nameAlert").classList.replace("d-block", "d-none")
  } else {
    document.getElementById("nameAlert").classList.replace("d-none", "d-block")
  }
  if (emailValidation()) {
    document.getElementById("emailAlert").classList.replace("d-block", "d-none")
  } else {
    document.getElementById("emailAlert").classList.replace("d-none", "d-block")
  }
  if (phoneValidation()) {
    document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
  } else {
    document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
  }
  if (ageValidation()) {
    document.getElementById("ageAlert").classList.replace("d-block", "d-none")
  } else {
    document.getElementById("ageAlert").classList.replace("d-none", "d-block")
  }
  if (passwordValidation()) {
    document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
  } else {
    document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
  }
  if (repasswordValidation()) {
    document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
  } else {
    document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
  }
}







function nameValidation() {
  return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
  return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
  return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}












var prevScrollPos = window.pageYOffset;
var navbar = $('.navbar');

$(window).scroll(function () {
  var currentScrollPos = $(window).scrollTop();

  if (prevScrollPos > currentScrollPos) {
    navbar.removeClass('navbar-hidden').addClass('navbar-visible');
    $('#scroller2').fadeIn()

  } else {
    navbar.removeClass('navbar-visible').addClass('navbar-hidden');
    $('#scroller2').fadeOut()
  }

  prevScrollPos = currentScrollPos;
})



$(".scroller2").hover(function (e) {
  $(this).toggleClass('animated tada', e.type === 'mouseenter');
});

var audio = document.getElementById("myAudio");
var audFlag = false
$('#scroller2').click(function playAudio() {
  if (audFlag == false) {
    audio.play();    
    audFlag = true;
  }else{
    audio.pause();  
    audFlag = false;
  }
})
