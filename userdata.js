
function addData() {
  console.log('addData() function called');
  var email = document.getElementById('email').value;
  var pass = document.getElementById('Pass').value;
  var userid = document.getElementById('username').value;
  var checked = document.getElementById('Check1').checked;
  if (email === '' || pass === '' || userid === '') {
    alert('Please fill in all fields.');
    return;
  }

  if (!checked) {
    alert('Please agree to the terms and conditions.');
    return;
  }


  localStorage.setItem('userEmail', email);
  localStorage.setItem('userPass', pass);
  localStorage.setItem('uname', userid);

  
 localStorage.setItem('login',true);
 localStorage.setItem('signup',true);

  console.log('Redirecting to index.html...');
  window.location.href = 'index.html';
}

function checklogin() {
  if (localStorage.getItem('signup')) {
    console.log('signup value is true');
    console.log("Redirecting to index.html...");
    window.location.href = 'index.html';
  
  } else {
    alert("You haven't signed up.");
    return;
  }
}


