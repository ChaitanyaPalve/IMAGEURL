from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import cloudinary
import cloudinary.uploader
import os

app = FastAPI(title="Krishi AI Guardian")

# CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later replace with your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cloudinary configuration from environment variables
cloudinary.config(
    cloud_name=os.getenv("dbqrq1dbl"),
    api_key=os.getenv("277757863796833"),
    api_secret=os.getenv("PeTXUk0VO1rOlQv15dVPDzf1MDk"),
    secure=True
)

@app.get("/")
def home():
    return {"message": "Hello from Krishi AI Guardian"}

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Validate file type
        if not file.content_type or not file.content_type.startswith("image/"):
            return {"error": "Only image files are allowed"}

        # Upload to Cloudinary
        result = cloudinary.uploader.upload(file.file)

        image_url = result.get("secure_url")

        if not image_url:
            return {"error": "Image upload failed"}

        return {
            "message": "Image uploaded successfully",
            "url": image_url,
            "filename": file.filename
        }

    except Exception as e:
        return {"error": str(e)}