//  DOM elements
const form = document.getElementById("registrationForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

// Load saved username from localStorage
const savedUsername = localStorage.getItem("username");
if (savedUsername) {
    usernameInput.value = savedUsername;
}

// function show error message
function showError(input, message, errorElement) {
    errorElement.textContent = message;
    input.classList.add("invalid");
}

// function Clear error message
function clearError(input, errorElement) {
    errorElement.textContent = "";
    input.classList.remove("invalid");
}

// Username validation
usernameInput.addEventListener("input", () => {
    if (usernameInput.validity.valueMissing) {
        showError(usernameInput, "Username is required.", usernameError);
    } else if (usernameInput.value.length < 3) {
        showError(usernameInput, "Username must be at least 3 characters.", usernameError);
    } else {
        clearError(usernameInput, usernameError);
    }
});

// Email validation
emailInput.addEventListener("input", () => {
    if (emailInput.validity.valueMissing) {
        showError(emailInput, "Email is required.", emailError);
    } else if (!emailInput.validity.valid) {
        showError(emailInput, "Please enter a valid email address.", emailError);
    } else {
        clearError(emailInput, emailError);
    }
});

// Password validation
passwordInput.addEventListener("input", () => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // regex 
    if (passwordInput.validity.valueMissing) {
        showError(passwordInput, "Password is required.", passwordError);
    } else if (!pattern.test(passwordInput.value)) {
        showError(passwordInput, "Password must be at least 8 characters, include upper and lower case letters, and a number.", passwordError);
    } else {
        clearError(passwordInput, passwordError);
    }
});

// Confirm Password validation
confirmPasswordInput.addEventListener("input", () => {
    if (confirmPasswordInput.validity.valueMissing) {
        showError(confirmPasswordInput, "Please confirm your password.", confirmPasswordError);
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        showError(confirmPasswordInput, "Passwords do not match.", confirmPasswordError);
    } else {
        clearError(confirmPasswordInput, confirmPasswordError);
    }
});

// Form submission
form.addEventListener("submit", (event) => {
    event.preventDefault(); //default form submission

    // All validation 
    usernameInput.dispatchEvent(new Event("input"));
    emailInput.dispatchEvent(new Event("input"));
    passwordInput.dispatchEvent(new Event("input"));
    confirmPasswordInput.dispatchEvent(new Event("input"));

    const isFormValid =
        !usernameError.textContent &&
        !emailError.textContent &&
        !passwordError.textContent &&
        !confirmPasswordError.textContent;

    if (isFormValid) {
        alert("Registration successful!");

        // Save username to localStorage
        localStorage.setItem("username", usernameInput.value);

        // reset form
        form.reset();
    } else {
        // Focus on first field with error
        if (usernameError.textContent) {
            usernameInput.focus();
        } else if (emailError.textContent) {
            emailInput.focus();
        } else if (passwordError.textContent) {
            passwordInput.focus();
        } else if (confirmPasswordError.textContent) {
            confirmPasswordInput.focus();
        }
    }
});

// LocalStorage 
localStorage.setItem("theme", "dark");
console.log(localStorage.getItem("username"));
console.log(localStorage.getItem("theme"));

localStorage.removeItem("theme");

const userPreferences = {
    theme: "light",
    notifications: {
        email: true,
        sms: false,
    },
    language: "en",
};

localStorage.setItem("userPreferences", JSON.stringify(userPreferences));

let currUser;
try {
    currUser = JSON.parse(localStorage.getItem("userPreferences"));
    console.log(currUser.theme);
    console.log(currUser.language);
    console.log(currUser.notifications.email);
} catch (error) {
    console.error(`Error: ${error}`);
    currUser = null;
}

if (currUser !== null) {
    console.log(currUser.theme);
}

console.log(localStorage);
