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
      <div class="user-name">Name: <span>${
      data[0].name === null ? "No data" : data[0].name
      }</span></div>
      <div class="user-email">Email: <span>${
      data[0].email === null ? "No data" : data[0].email
      }</span></div>
      <div class="user-location">Location: <span>${
      data[0].location === null ? "No data" : data[0].location
      }</span></div>
      <div class="user-followers"><span>${data[0].followers}</span> followers</div>
      <div class="user-repos-num"><span>${data[0].public_repos}</span> repos</div>
      `
      );
    // repo section 
    data[1].forEach((repo) => {

      reposSection.insertAdjacentHTML(
        "beforeend",
        `
      <div class = "repo-box">${repo.name}
          <a href =  ${repo.html_url} target= "_blank">Visit</a>
          <span>Stars: ${repo.stargazers_count}</span>
          <span class="languague">${
            repo.language == null ? "Not Detected" : repo.language
          }</span>
      </div>
      `
      );
    });
  } catch(err){
    console.error(err);
  }  
}
