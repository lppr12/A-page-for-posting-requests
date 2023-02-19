
function checkacc() {
  if (localStorage.getItem("login") !== "true") {
    alert("You must login first.");
    return false;
  }
  return true;
}
  function generateNavbar() {
    if (localStorage.getItem("login") === "true") {
      document.getElementById("navbar-placeholder1").innerHTML =
        '<li class="nav-item dropdown">' +
        '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">' +
        'Profile' +
        '</a>' +
        '<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">' +
        '<li><a class="dropdown-item" href="#">Settings</a></li>' +
        '<li><a class="dropdown-item" onclick="logout()">Logout</a></li>' +
        '</ul>' +
        '</li>';
    } else {
      document.getElementById("navbar-placeholder1").innerHTML =
        '<div class="btn-group btn-group-sm" role="group">' +
          '<li>' +
        '<button type="button" class="btn btn-outline-danger" onclick="location.href=\'signup.html\'" id="bt10">Sign up</button>' +
        '</li>' +
        '<li>' +
        '<button type="button" class="btn btn-outline-success" onclick="location.href=\'login.html\'" id="bt10">LogIn</button>' +
        '</li>';
        '</div>';
    }
  }
  generateNavbar()

  function logout() {
    localStorage.removeItem("login");
    generateNavbar();
  }

  $(document).ready(function() {
    $("#searchitem").click(function() {
      if(checkacc()===true)
      {}
    });

  });


  document.querySelector("#addbutt").addEventListener("click", function() {
    if (checkacc()===true) {
      openAddItemPopup();
    }
  });


  function submitForm() {
    let popup = window.open("", "add-item-popup");
    let itemName = popup.document.getElementById("item-name").value;
    let itemDescription = popup.document.getElementById("item-description").value;
    let itemPrice = popup.document.getElementById("item-price").value;
    let uname=popup.document.getElementById("u-name").value;
    let categories = [];
    let category1 = popup.document.getElementById("category1").checked;
    let category2 = popup.document.getElementById("category2").checked;
    let category3 = popup.document.getElementById("category3").checked;
    let selling = popup.document.getElementById("sell-item").checked;
  
    if (category1) {
      categories.push("Category 1");
    }
    if (category2) {
      categories.push("Category 2");
    }
    if (category3) {
      categories.push("Category 3");
    }
    
    
    
    let items = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
    items.push({name: itemName, description: itemDescription, price: itemPrice, categories: categories,availaible: selling,uname: uname});
    localStorage.setItem("items", JSON.stringify(items));
  
    let newItem = document.createElement("div");
    newItem.classList.add("card");
    let categoryList = categories.join(", ");
    let availaibleColor = selling? "lightgreen" : "red";
    newItem.innerHTML = `
      
        <div class="card-header headingname">${itemName}</div>
          <div class="card-body cbody">
            <p class="card-text desc">${itemDescription}</p>
            <p class="card-text priceee">$${itemPrice}</p>
            <p class="card-text cate">${categoryList}</p>
              <blockquote class="blockquote mb-0 text-end uname">
                   <footer class="blockquote-footer">${uname}</footer>
              </blockquote>
          </div>
          <div class="card-footer cfot" style="display: flex; justify-content: space-between; align-items: center;">
            <p style="color: ${availaibleColor}">${selling ? "Selling" : "Requesting"}</p>
            <div>
              <button onclick="openfeed('${uname}')" class="btn"><i class="bi bi-star staricon text-warning"></i></i>
              <button class="btn bsbutton" onclick="openchat('${uname}')"><i class="bi bi-chat-dots-fill" style="color: ${availaibleColor}"></i></button>
            </div>
          </div>
         
    `;
  
    let itemsContainer = document.getElementById("items");
    itemsContainer.appendChild(newItem);
  
    popup.close();
  }
  
  function openAddItemPopup() {
    
    let popup = window.open("", "add-item-popup", "width=700,height=660");
    popup.moveTo(420,130);
    let cdnHtml=`
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">  
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <link rel="stylesheet" href="userdatacs.css">
      `;
      popup.document.head.innerHTML = cdnHtml;
    let formHtml = `
    <div class="container">
    <form id="add-item-form">
    <div class="mb-3">
      <label for="u-name" class="form-label">User Name:</label>
      <input type="text" id="u-name" name="u-name" class="form-control">
    </div>

    <div class="mb-3">
      <label for="item-name" class="form-label">Item Name:</label>
      <input type="text" id="item-name" name="item-name" class="form-control">
    </div>
  
    <div class="mb-3">
      <label for="item-description" class="form-label">Description:</label>
      <textarea id="item-description" name="item-description" class="form-control"></textarea>
    </div>
  
    <div class="mb-3">
      <label for="item-price" class="form-label">Price:</label>
      <input type="number" id="item-price" name="item-price" class="form-control">
    </div>
  
    <div class="mb-3">
      <label for="item-category" class="form-label">Category:</label><br>
      <div class="form-check">
        <input type="checkbox" id="category1" name="category1" value="category1" class="form-check-input">
        <label for="category1" class="form-check-label">Category 1</label>
      </div>
  
      <div class="form-check">
        <input type="checkbox" id="category2" name="category2" value="category2" class="form-check-input">
        <label for="category2" class="form-check-label">Category 2</label>
      </div>
  
      <div class="form-check">
        <input type="checkbox" id="category3" name="category3" value="category3" class="form-check-input">
        <label for="category3" class="form-check-label">Category 3</label>
      </div>
    </div>
  
    <div class="mb-3 form-check">
      <input type="checkbox" id="sell-item" name="sell-item" value="sell-item" class="form-check-input">
      <label for="sell-item" class="form-check-label">Are you selling it?</label>
    </div>
  
    <button id="submit-button" type="button" class="btn btn-outline-warning">Submit</button>
  </form>
    </div>
  
    `;
  
    popup.document.body.innerHTML = formHtml;
  
    popup.document.getElementById("submit-button").addEventListener("click", submitForm);
  }
  

  window.onload = function() {
    let items = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
    let itemsContainer = document.getElementById("items");
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let availaibleColor = item.availaible ? "lightgreen" : "red";
      let newItem = document.createElement("div");
      newItem.classList.add("card");
      newItem.innerHTML = ` 
         <div class="card-header headingname">
             ${item.name}
         </div>
         <div class="card-body cbody">
             <p class="card-text desc">${item.description}</p>
             <p class="card-text priceee">$${item.price}</p>
             <p class="card-text cate">${item.categories}</p>
                <blockquote class="blockquote mb-0 text-end uname">
                    <footer class="blockquote-footer">${item.uname}</footer>
                </blockquote>
         </div>
         <div class="card-footer cfot" style="display: flex; justify-content: space-between; align-items: center;">
              <p style="color: ${availaibleColor}">${item.availaible ? "Selling" : "Requesting"}</p>
              <div>
              <button onclick="openfeed('${item.uname}')" class="btn"><i class="bi bi-star staricon text-warning"></i></i>
              <button class="btn bsbutton" onclick="openchat('${item.uname}')"><i class="bi bi-chat-dots-fill" style="color: ${availaibleColor}"></i></button>
              </div>
         </div>
      `;
      
      itemsContainer.appendChild(newItem);
      
    }
  }

  



 




var chatIcon = document.getElementsByClassName('chat-icon')[0];
var chatPopup = document.getElementsByClassName('chat-popup')[0];



var closeBtn = document.getElementsByClassName('close')[0];
var messageInput = chatPopup.querySelector('input[type="text"]');


var messagesList = chatPopup.getElementsByClassName('messages')[0];
var sendButton = chatPopup.getElementsByClassName('sendbutton')[0];


var chatHeader = document.getElementById('chat-header');
var firmId = null;


var messages = {};


$(chatIcon).click(function() {
  if(checkacc()===true){
  $(chatPopup).toggleClass("chat-popup-open");}
});

$(closeBtn).click(function() {
  $(chatPopup).toggleClass("chat-popup-open");
});


var usFirmId = 4;


sendButton.addEventListener('click', function() {
  var messageText = messageInput.value.trim();

  if (messageText && (firmId !== null || firmId === usFirmId)) {
    
    if (!messages[firmId]) {
      messages[firmId] = [];
    }
    messages[firmId].push(messageText);


    var messageEl = document.createElement('li');
    messageEl.innerText = messageText;
    messagesList.appendChild(messageEl);


    messageInput.value = '';
  }
  else{
    messages[usFirmId] = [];
    messages[usFirmId].push(messageText);
    var messageEl = document.createElement('li');
    messageEl.innerText = messageText;
    messagesList.appendChild(messageEl);
    messageInput.value = '';
  }
});


messageInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    sendButton.click();
  }
});

function openchat(firmName) {
  if(checkacc()===true){
  $(chatPopup).toggleClass("chat-popup-open");
  chatHeader.innerText = 'Chat with ' + firmName;
  firmId = getFirmId(firmName);
  if (firmId === null) {
    firmId = usFirmId; 
  }
  messagesList.innerHTML = '';
  if (messages[firmId]) {
    messages[firmId].forEach(function(message) {
      var messageEl = document.createElement('li');
      messageEl.innerText = message;
      messagesList.appendChild(messageEl);
    });
  }
}
}

function getFirmId(firmName) {
  switch (firmName) {
    case 'Firm 1':
      return 1;
    case 'Firm 2':
      return 2;
    case 'Firm 3':
      return 3;
    default:
      return null;
  }
}

$(closeBtn).click(function() {
  $(chatPopup).toggleClass("chat-popup-open");
  chatHeader.innerText = 'Chat with us';
  firmId = null;
  $(chatPopup).toggleClass("chat-popup-open");
});









function openfeed(wfeed) {
     if(checkacc()===true){
       // create the feedback form popup
    const popup2 = window.open("", "Feedback Form", "width=400,height=500");
  
    // add HTML content to the popup
    popup2.document.write(`
      <html>
        <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">  
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
          <title>Feedback Form</title>
        </head>
        <body>
          <div class="container py-4">
            <h1 class="mb-4 text-warning bg-dark text-center">Feedback Form For ${wfeed}</h1>
            <form id="feedback-form">
              <div class="mb-3">
              <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="rating-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                Rate us
              </button>
              <ul class="dropdown-menu" aria-labelledby="rating-dropdown">
                <li>
                  <input class="form-check-input" type="radio" name="rating" id="rating1" value="1">
                  <label class="form-check-label" for="rating1">
                    <span class="bi bi-star-fill text-warning"></span>
                    <span class="bi bi-star text-muted"></span>
                    <span class="bi bi-star text-muted"></span>
                    <span class="bi bi-star text-muted"></span>
                    <span class="bi bi-star text-muted"></span>
                  </label>
                </li>
                <li>
                  <input class="form-check-input" type="radio" name="rating" id="rating2" value="2">
                  <label class="form-check-label" for="rating2">
                    <span class="bi bi-star-fill text-warning"></span>
                    <span class="bi bi-star-fill text-warning"></span>
                    <span class="bi bi-star text-muted"></span>
                    <span class="bi bi-star text-muted"></span>
                    <span class="bi bi-star text-muted"></span>
                  </label>
                </li>
                <li>
                  <input class="form-check-input" type="radio" name="rating" id="rating3" value="3">
                  <label class="form-check-label" for="rating3">
                    <span class="bi bi-star-fill text-warning"></span>
                    <span class="bi bi-star-fill text-warning"></span>
                    <span class="bi bi-star-fill text-warning"></span>
                    <span class="bi bi-star text-muted"></span>
                    <span class="bi bi-star text-muted"></span>
                  </label>
                </li>
                <li>
                  <input class="form-check-input" type="radio" name="rating" id="rating4" value="4">
                  <label class="form-check-label" for="rating4">
                    <span class="bi bi-star-fill text-warning"></span>
                    <span class="bi bi-star-fill text-warning"></span>
                    <span class="bi bi-star-fill text-warning"></span>
                    <span class="bi bi-star-fill text-warning"></span>
                    <span class="bi bi-star text-muted"></span>
                  </label>
                </li>
                <li>
                  <input class="form-check-input" type="radio" name="rating" id="rating5" value="5">
                  <label class="form-check-label" for="rating5">
                    <span class="bi bi-star-fill text-warning"></span>
                    <span class="bi bi-star-fill text-warning"></span>
                    <span class="bi bi-star-fill text-warning"></span>
                    <span class="bi bi-star-fill text-warning"></span>
                    <span class="bi bi-star-fill text-warning"></span>
                  </label>
                </li>
              </ul>
            </div>
              </div>
              <div class="mb-3">
                <label for="namef" class="form-label">Name:</label>
                <input type="text" id="namef" name="namef" class="form-control border-success" required>
              </div>
              <div class="mb-3">
                <label for="emailf" class="form-label">Email:</label>
                <input type="email" id="emailf" name="emailf" class="form-control border-success" required>
              </div>
              <div class="mb-3">
                <label for="commentsf" class="form-label">Feedback:</label>
                <textarea id="commentsf" name="commentsf" class="form-control border-success" required></textarea>
              </div>
              <div class="text-center">
              <button type="submitf" id="submitfeed" class="btn btn-outline-warning text-center shadow">Submit</button>
              </div>
            </form>
          </div>
        </body>
      </html>
    `);
  
    // add an event listener to the form submit button
    const form = popup2.document.getElementById("feedback-form");
    const submitButtonf = popup2.document.getElementById("submitfeed");
submitButtonf.addEventListener("click", function(event) {
  // prevent the default form submission behavior
  event.preventDefault();

  // get the form data
  const namef = form.elements["namef"].value;
  const emailf = form.elements["emailf"].value;
  const commentsf = form.elements["commentsf"].value;
  const selectedValue = form.elements["rating-dropdown"].value;

  // get the existing feedbacks from local storage, or initialize an empty array
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  // add the new feedback to the array
  feedbacks.push({ namef, emailf, commentsf, selectedValue });

  // store the updated feedbacks array in local storage
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  // close the popup
  popup2.close();
});
    
     }
     else{}
 
  }