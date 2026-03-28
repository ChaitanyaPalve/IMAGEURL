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
    const output = document.getElementById("output");

    preview.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Preview">`;
    loader.classList.remove("hidden");
    resultBox.classList.add("hidden");

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("https://imageurl-lxn3.onrender.com/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        console.log("Backend response:", data);

        loader.classList.add("hidden");
        resultBox.classList.remove("hidden");

        output.innerHTML = `
            <p><strong>Message:</strong> ${data.message || "No message returned"}</p>
            <p><strong>Image URL:</strong> ${
                data.url
                    ? `<a href="${data.url}" target="_blank">${data.url}</a>`
                    : "No image URL returned"
            }</p>
        `;
    } catch (error) {
        console.error("Upload error:", error);
        loader.classList.add("hidden");
        resultBox.classList.remove("hidden");
        output.innerHTML = `<p>❌ Error connecting to backend.</p>`;
    }
}
