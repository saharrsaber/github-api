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
    fetch(`https://api.github.com/users/${username.value}`)
      .then((rsp) => rsp.json())
      .then((data) => {
        if (data.message == "Not Found")
          displayError(`This username ${username.value} is not found`);
        else {
          userSection.insertAdjacentHTML(
            "beforeend",
            `
      <div class="user-name">Name: <span>${
        data.name === null ? "No data" : data.name
      }</span></div>
      <div class="user-email">Email: <span>${
        data.email === null ? "No data" : data.email
      }</span></div>
      <div class="user-location">Location: <span>${
        data.location === null ? "No data" : data.location
      }</span></div>
      <div class="user-followers">#followers: <span>${
        data.followers
      }</span></div>
      <div class="user-repos-num">#repos: <span>${
        data.public_repos
      }</span></div>
      `
          );
          return fetch(`https://api.github.com/users/${username.value}/repos`);
        }
      })
      .then((rsp) => rsp.json())
      .then((data) => {
        if (data.message == "Not Found")
          displayError(`This username ${username.value} is not found`);
        else {
          console.log(data);
          data.forEach((repo) => {
            repo.name;

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
        }
      })
      .catch(() => displayError("An error occured"));
  }
});

function displayError(msg) {
  searchSection.classList.add("hidden");
  userSection.classList.add("hidden");
  reposSection.classList.add("hidden");
  errorSection.classList.remove("hidden");
  errorSection.innerHTML = `<span>${msg}</span>`;
}
