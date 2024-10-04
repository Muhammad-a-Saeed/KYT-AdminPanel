import { ref, deleteObject, getStorage } from "firebase/storage";


export const deleteImageFromFirebase = async (imageUrl) => {
    try {
        const storage = getStorage();

        const imageRef = ref(storage, imageUrl);

        // Delete the image from Firebase Storage
        await deleteObject(imageRef);

        console.log("Image deleted successfully from Firebase.");
    } catch (error) {
        console.error("Error deleting image from Firebase:", error);
        throw error;
    }
};