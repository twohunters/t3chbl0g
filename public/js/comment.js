const commentFormHandler = async (event) => {
    event.preventDefault();

    const postID = document.querySelector("#post-ID").value;
    const body = document.querySelector("#post-body").value;

    await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({ postID, body }),
        headers: { "Content-Type": "application/json" },
    });

    document.location.replace("/dashboard");
};

document
    .querySelector("#new-comment-form")
    .addEventListener("submit", commentFormHandler);