async function uploadImage() {
    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image first.");
        return;
    }

    const preview = document.getElementById("preview");
    const loader = document.getElementById("loader");
    const resultBox = document.getElementById("result");
    const output = document.getElementById("output");

    preview.innerHTML = `
        <img src="${URL.createObjectURL(file)}" alt="Preview Image">
    `;

    loader.classList.remove("hidden");
    resultBox.classList.add("hidden");

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("https://imageurl-ng1u.onrender.com/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        console.log("Backend response:", data);

        loader.classList.add("hidden");
        resultBox.classList.remove("hidden");

        output.innerHTML = `
            <p><strong>Message:</strong> ${data.message || "No message returned"}</p>

            <p>
                <strong>Image URL:</strong><br>
                ${
                    data.url
                    ? `
                        <a href="${data.url}" target="_blank">${data.url}</a>
                        <br><br>
                        <button class="copy-btn" onclick="copyURL('${data.url}')">
                            Copy URL
                        </button>
                      `
                    : "No image URL returned"
                }
            </p>
        `;

    } catch (error) {
        console.error("Upload Error:", error);

        loader.classList.add("hidden");
        resultBox.classList.remove("hidden");

        output.innerHTML = `
            <p><strong>Error:</strong> Could not connect to backend.</p>
        `;
    }
}

function copyURL(url) {
    navigator.clipboard.writeText(url)
        .then(() => {
            alert("Image URL copied!");
        })
        .catch(() => {
            alert("Failed to copy URL.");
        });
}
