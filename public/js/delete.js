const deleteFormHandler = async (event) => {
    event.preventDefault();

    const id = windows.location.toString().split("/"[
        window.location.toString().split("/").length - 1
    ]);

    const response = await fetch("/api/posts/${id}", {
        method: "DELETE"
    });

    if (response.ok) {
        document.location.replact("/dashboard")
    } else {
        alert(response.statusText)
    }
};

document
    .querySelector(".delete-btn")
    .addEventListener("click", deleteFormHandler);