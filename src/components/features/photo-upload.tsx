"use client";

import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { storage, db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

const PhotoUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleUpload = async () => {
    if (!file || !user) return;

    try {
      setUploading(true);

      // Crear referencia en storage con la ruta dinámica usando backticks
      const storageRef = ref(storage, `uploads/${user.uid}/${file.name}`);

      // Subir el archivo
      await uploadBytes(storageRef, file);

      // Obtener URL de descarga
      const downloadURL = await getDownloadURL(storageRef);

      // Guardar metadatos en Firestore
      await addDoc(collection(db, "photos"), {
        url: downloadURL,
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
      });

      setFile(null);
      alert("Foto subida con éxito!");
    } catch (error) {
      console.error("Error subiendo la foto:", error);
      alert("Error al subir la foto, intenta de nuevo.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`px-4 py-2 rounded text-white ${
          !file || uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? "Subiendo..." : "Subir Foto"}
      </button>
    </div>
  );
};

export default PhotoUpload;
