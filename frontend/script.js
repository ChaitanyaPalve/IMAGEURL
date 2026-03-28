async function uploadImage() {
    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image!");
        return;
    }

    const preview = document.getElementById("preview");
    const loader = document.getElementById("loader");
    const resultBox = document.getElementById("result");

    // Show preview
    preview.innerHTML = `<img src="${URL.createObjectURL(file)}">`;

    // Show loader
    loader.classList.remove("hidden");
    resultBox.classList.add("hidden");

    const formData = new FormData();
    formData.append("file", file);

    try {
        // 🔥 IMPORTANT: replace with your Render backend URL
        const response = await fetch("https://imageurl-lxn3.onrender.com/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        loader.classList.add("hidden");
        resultBox.classList.remove("hidden");

        document.getElementById("output").innerHTML = `
            <p><strong>Message:</strong> ${data.message}</p>
            <p><strong>Image URL:</strong> 
                <a href="${data.url}" target="_blank">${data.url}</a>
            </p>
        `;

    } catch (error) {
        loader.classList.add("hidden");
        resultBox.classList.remove("hidden");

        document.getElementById("output").innerText =
            "❌ Error connecting to backend.";
    }
}
