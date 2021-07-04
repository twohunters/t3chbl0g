const editFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#post-title").value;
    const body = document.querySelector("#post-body").value;

    await fetch("/api/post/${postID}", {
        method: "PUT",
        body: JSON.stringify({ title, body }),
        headers: { "Content-Type": "application/json" }
    });
};

const deleteClickHandler = async (event) => {
    event.preventDefault();

    await fetch("/api/post/${postID}", {
        method: "DELETE"
    });

    document.location.replace('/dashboard');
}

document
    .querySelector("#edit-post-form")
    .addEventListener("submit", editFormHandler);
document
    .querySelector("#delete")
    .addEventListener("click", deleteClickHandler);