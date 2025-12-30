const password = document.getElementById("password");
const confPassword = document.getElementById("password-confirm");
const passwordError = document.querySelector("#password-confirm ~ .error-text");

confPassword.addEventListener("input", (e) =>{
    if (confPassword.value !== password.value){
        confPassword.setCustomValidity("Passwords do not match");
        showError(confPassword, "Passwords do not match");
    } else {
        confPassword.setCustomValidity("");
        passwordError.textContent = "";
        return;
    }
});

password.addEventListener("input", (e) =>{
    if (confPassword.value !== password.value){
        confPassword.setCustomValidity("Passwords do not match");
        showError(confPassword, "Passwords do not match");
    } else {
        confPassword.setCustomValidity("");
        passwordError.textContent = "";
        return;
    }
});

function showError(input, message) {
    if (!input.validity.valid){
        passwordError.textContent = message;
    }
}