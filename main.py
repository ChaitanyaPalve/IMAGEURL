from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import cloudinary
import cloudinary.uploader

app = FastAPI(title="Image to URL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cloudinary.config(
    cloud_name="dbqrq1dbl",
    api_key="277757863796833",
    api_secret="PeTXUk0VO1rOlQv15dVPDzf1MDk",
    secure=True
)

@app.get("/")
def home():
    return {"message": "Hello from Image to URL"}

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        if not file.content_type or not file.content_type.startswith("image/"):
            return {"message": "Only image files are allowed", "url": None}

        result = cloudinary.uploader.upload(file.file)
        image_url = result.get("secure_url")

        if not image_url:
            return {"message": "Upload failed", "url": None}

        return {
            "message": "Image uploaded successfully",
            "url": image_url
        }

    except Exception as e:
        return {
            "message": f"Error: {str(e)}",
            "url": None
        }
