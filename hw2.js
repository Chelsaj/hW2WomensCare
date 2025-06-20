/*
    Name: Chelsa Jons
    Data created: June 18, 2025
    Data last edited:
    Version:2.0
    Description: Homework 2 JS Patient Information Form

*/


//dynamic date js code
const d = new Date();
let text = d.toLocaleDateString();
document.getElementById("today").innerHTML = text;

//name slider js code
let slider = document.getElementById("range");
let output = document.getElementById("range-slider");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
};

//DOB validation js code
//Introduces a maximum age limit for valid dates.
function validateDOB() {
    DOB = document.getElementById("DOB");
    let date = new Date(DOB.value);
    let maxDate = new Date().setFullYear(new Date().getFullYear() - 120);

    if (date > new Date()) {
        document.getElementById("DOB-error").innerHTML = 
        "Date can't be in the future";
        DOB.value = "";
        return false;
    } else if (date < new Date(maxDate)) {
        document.getElementById("DOB-error").innerHTML = 
        "Date can't be more than 120 years ago";
        DOB.value = "";
        return false;
    } else {
        document.getElementById("DOB-error").innerHTML = "";
        return true;
    }
}
//SSN validation js code
function validateSsn() {
    const ssn = document.getElementById("ssn").value;
    const ssnR = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;

    if (!ssnR.test(ssn)) {
        document.getElementById("ssn-error").innerHTML = 
        "Please enter a valid SSN";
        return false;
    } else {
        document.getElementById("ssn-error").innerHTML = "";
        return true;
    }
}

//ZIP Code Validation js code
function validateZipCode() {
    const zipInput = document.getElementById("ZipCode");
    let zip = zipInput.value.replace(/[^\d-]/g, "");

    if (!zip) {
        document.getElementById("ZipCode-error").innerHTML = 
        "Zip code can't be blank";
        return false;
    }

   if (zip.length !== 5 && zip.length !== 10) {
    document.getElementById("ZipCode-error").innerHTML = "Invalid ZIP code format";
    return false;
    }


    zipInput.value = zip;
    document.getElementById("ZipCode-error").innerHTML = "";
    return true;
}
//Email Validation js code
var emailR = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function validateEmail() {
  const emailInput = document.getElementById("Email").value.trim();
  const errorSpan = document.getElementById("email-error");

  if (!emailInput) {
    errorSpan.textContent = "Email cannot be blank.";
    return false;
  }

  if (!emailR.test(emailInput)) {
    errorSpan.textContent = "Please enter a valid email (e.g., user@domain.com).";
    return false;
  }

  errorSpan.textContent = ""; // Clear error if valid
  return true;
}

//Phone Number Validation js code
function validatePhone() {
  const phoneInput = document.getElementById("phone").value.trim();
  const errorSpan = document.getElementById("phone-error");

  if (!phoneInput) {
    errorSpan.textContent = "Phone number cannot be blank.";
    return false;
  }

  // Remove all non-digits
  const digitsOnly = phoneInput.replace(/\D/g, "");

  // Check length (10 digits for US numbers)
  if (digitsOnly.length !== 10) {
    errorSpan.textContent = "Phone number must be 10 digits (e.g., 123-456-7890).";
    return false;
  }

  // Format as 000-000-0000
  const formattedPhone = digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  document.getElementById("phone").value = formattedPhone; // Auto-format
  errorSpan.textContent = "";
  return true;
}

function validateUName() {
    let UName = document.getElementById("UName").value.toLowerCase();
    document.getElementById("UName").value = UName;

    if (UName.length == 0) {
        document.getElementById("UName-error").innerHTML = 
        "User ID can't be blank";
        return false;
    }

    if (!isNaN(UName.charAt(0))) {
        document.getElementById("UName-error").innerHTML = 
        "User ID can't start with a number";
        return false;
    }

    let regex = /^[a-zA-Z0-9_-]+$/;
    if (!regex.test(UName)) {
        document.getElementById("UName-error").innerHTML = 
        "User ID can only have letters, numbers, underscores, and dashes";
        return false;
    } else if (UName.length < 5) {
        document.getElementById("UName-error").innerHTML = 
        "User ID must be at least 5 characters";
        return false;
    } else if (UName.length > 30) {
        document.getElementById("UName-error").innerHTML = 
        "User ID can't exceed 30 characters";
        return false;
    } else {
        document.getElementById("UName-error").innerHTML = "";
        return true;
    }
}
function validatePassword(pword, uid) {
    let errorMessage = [];

    if (!pword.match(/[a-z]/)) 
        errorMessage.push("Enter at least one lowercase letter");
    if (!pword.match(/[A-Z]/)) 
        errorMessage.push("Enter at least one uppercase letter");
    if (!pword.match(/[0-9]/)) 
        errorMessage.push("Enter at least one number");
    if (!pword.match(/[!\@#\$%&*\-_\\.+\(\)]/)) 
        errorMessage.push("Enter at least one special character");
    if (pword.includes(uid)) 
        errorMessage.push("Password can't contain user ID");
    return errorMessage;
}

function confirmPword() {
    let pword1 = document.getElementById("pword").value;
    let pword2 = document.getElementById("con_pword").value;


    if (pword1 !== pword2) {
        document.getElementById("pword2-error").innerHTML = 
        "Passwords don't match";
        return false;
    } else {
        document.getElementById("pword2-error").innerHTML = 
        "Passwords match";
        return true;
    }
}

function reviewInput() {
    var formcontent = document.forms[0];  
    var formoutput = "<table class='output'><th colspan = '3'> Review Your Information:</th>";
    for (let i = 0; i < formcontent.length; i++) {
        if (formcontent.elements[i].value !== "") {
            switch (formcontent.elements[i].type) {
                case "checkbox":
                    if (formcontent.elements[i].checked) {
                        formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>&#x2713;</td></tr>`;
                    }
                    break;
                case "radio":
                    if (formcontent.elements[i].checked) {
                        formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>${formcontent.elements[i].value}</td></tr>`;
                    }
                    break;
                default:
                    formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>${formcontent.elements[i].value}</td></tr>`;
            }
        }
    }
    formoutput += "</table>";
    document.getElementById("showInput").innerHTML = formoutput;
}
function removeReview() {
    document.getElementById("showInput").innerHTML = "";
}