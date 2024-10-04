import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../Firbase";
import { toast } from "react-toastify";

const APP_NAME = "HALALManagement"


const uploadFile = async (file, dir = `${APP_NAME}/thumbnail`, onProgress, onProgressChange, name = new Date().toISOString()) => {
    try {
        // Reference to the storage bucket
        const storageRef = ref(storage, `${dir}/${name}`);

        // Upload the file
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Monitor the upload progress
        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log('progress: ', progress);
            onProgress && onProgress(progress);
            onProgressChange && onProgressChange({
                total: snapshot.totalBytes,
                uploaded: snapshot.bytesTransferred
            });
        }, (error) => {
            console.error("Upload error:", error);
            toast.error("Error uploading file.");
        }, async () => {
            try {
                // Upload completed successfully
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                console.log("File uploaded successfully:", url);
                return url;
            } catch (error) {
                console.error("Error getting download URL:", error);
                toast.error("Error getting download URL.");
                throw error;
            }
        });

        // Return a Promise that resolves with the download URL
        return new Promise((resolve, reject) => {
            uploadTask.on("state_changed", null, reject, async () => {
                try {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(url);
                } catch (error) {
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error("Upload error:", error);
        toast.error("Error uploading file.");
        throw error;
    }
};

export default uploadFile;
