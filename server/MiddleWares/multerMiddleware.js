const multer = require("multer");
const path = require("path");

// Dynamically set the destination folder based on field name
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "uploads/temp"; // Default folder for unknown types

        if (file.fieldname === "profilePic") {
            folder = "uploads/profiles";
        } else if (file.fieldname === "bannerPic") {
            folder = "uploads/banners";
        } else if (file.fieldname === "postImage") {
            folder = "uploads/posts/images";
        } else if (file.fieldname === "postVideo") {
            folder = "uploads/posts/videos";
        } else if (file.fieldname === "icon") {
            folder = "uploads/communities/images";
        } else if (file.fieldname === "banner") {
            folder = "uploads/communities/banners";
        }

        cb(null, folder);
    },
    filename: (req, file, cb) => {
        // Replace spaces and special characters with underscores
        const sanitizedOriginalName = file.originalname
            .toLowerCase() // Convert to lowercase for consistency
            .replace(/\s+/g, "_") // Replace spaces with underscores
            .replace(/[^a-z0-9_.-]/g, ""); // Remove characters other than alphanumerics, underscores, dots, and hyphens

        const uniqueName = `${Date.now()}-${sanitizedOriginalName}`;
        cb(null, uniqueName); // Save file with a unique timestamped name
    },
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif","image/webp", "video/mp4"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
