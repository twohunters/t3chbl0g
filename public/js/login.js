const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email-login");
    const password = document.querySelector("#password-login");

    const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        }),
        headers: { "Content-Type": "aplication/json" }
    });

    if (response.ok) {
        document.location.replace("/dashboard")
    } else {
        alert(response.statusText)
    }
};

document
    .querySelector("#login-form")
    .addEventListener("submit", loginFormHandler);