<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GitHub Repos</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"crossorigin="anonymous" />
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>

    <link rel="stylesheet" href="css/style.css" />

  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="get-repos col my-5 text-center">
          <h2 class="display-2">GitHub API</h2>
          <p class="lead"><strong>Fetch the Most Useful Information about any Github User</p>
          <hr class="pb-2" >

          <div class="row">
            <div class="col-md-8 form-group">
              <input type="text" placeholder="Enter GitHub Username" class="form-control" />
            </div>
            <div class="col-md-4 ">
              <button class="get-button btn btn-outline-light btn-block">Get Repos</button>
            </div>
          </div>

        </div>

      </div>

      <div class="row">
        <div class="user_data col-lg-4  my-4 hidden">
        </div>

        <div class="show-data col-lg-8 my-4 hidden">
        </div>
      </div>

      <div class="row">
        <div class="hidden col error alert alert-danger my-4" role="alert">
        </div>
      </div>

    </div>

    <script
      src="https://code.jquery.com/jquery-3.6.0.min.js"
      integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
      integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
      integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
      crossorigin="anonymous"
    ></script>
    <script src="js/script.js"></script>

  </body>
</html>
