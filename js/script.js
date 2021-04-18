"use strict";

const username = document.querySelector(".get-repos input");
const getReposBtn = document.querySelector(".get-repos button");
const searchSection = document.querySelector(".get-repos");
const userSection = document.querySelector(".user_data");
const reposSection = document.querySelector(".show-data");
const errorSection = document.querySelector(".error");

getReposBtn.addEventListener("click", function () {
  if (username.value == "") {
    displayError("please enter a valid github username");
  } else {
    //changing layouts
    searchSection.classList.add("hidden");
    userSection.classList.remove("hidden");
    reposSection.classList.remove("hidden");
    //fetch user data
    fetchAllData(username.value);

  }
});

const getJSON =  function(url, errorMsg = "An error occurred"){
  return fetch(url)
  .then(response => {
    if (!response.ok) 
      {
        displayError(`${errorMsg} (${response.status})`);
        throw new Error("An error occurred");
      }    
    return response.json();
  });
}


function displayError(msg) {
  searchSection.classList.add("hidden");
  userSection.classList.add("hidden");
  reposSection.classList.add("hidden");
  errorSection.classList.remove("hidden");
  errorSection.innerHTML = `<span>${msg}</span>`;
}


const fetchAllData = async function(username){
  try
  {
    const data = await Promise.all([
      getJSON(`https://api.github.com/users/${username}`, `This username ${username} is not found`),
      getJSON(`https://api.github.com/users/${username}/repos`, `This username ${username} is not found`)
    ]);
    //general inforamtin section
    userSection.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card text-white bg-info mb-3">
      <div class="card-header display-4">${
        data[0].name === null ? "No data" : data[0].name
        }</div>
      <div class="card-body">
        <h5 class="card-title"><i class="fas fa-envelope pr-1"></i> ${
          data[0].email === null ? "No data" : data[0].email
          }</h5>
        <h5 class="card-title"> <i class="fas fa-map-marker-alt px-1"></i>  ${
          data[0].location === null ? "No data" : data[0].location
          }</h5>
        <h5 class="card-title"><i class="fas fa-users"></i> ${data[0].followers} followers</h5>
        <h5 class="card-title"><i class="fas fa-box-open"></i> ${data[0].public_repos} repos</h5>
      </div>
    </div>
      `
      );
    // repo section 
    data[1].forEach((repo) => {

      reposSection.insertAdjacentHTML(
        "beforeend",
        `
      <div class="card bg-light repo-box mb-3">
        <div class="card-body">
          <h5 class="card-title d-inline">${repo.name}</h5>
          
          <div class="pt-2">

            <a class="px-4" href=${repo.html_url}  target= "_blank" ><i class="fas fa-link"></i> Visit</a>
            
            <div class="px-4 d-inline">
              <span class="star"><i class="fas fa-star"></i></span>  ${repo.stargazers_count}
            </div>
            
            <div class="px-4 d-inline">
              <span class="lang"><i class="fas fa-pen"></i></span> ${
                repo.language == null ? "Not Detected" : repo.language
              }
            </div>
          </div>
        </div>
      </div>
      `
      );
    });
  } catch(err){
    console.error(err);
  }  
}
username.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    getReposBtn.click();
  }
});
