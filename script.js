const BACKEND_URL = "https://dicom2nifti-backend.onrender.com/convert";

const fileInput = document.getElementById("file");
const button = document.getElementById("convertBtn");
const progress = document.getElementById("progress");
const bar = document.getElementById("bar");
const status = document.getElementById("status");

button.onclick = async () => {
  if (!fileInput.files.length) {
    alert("Selecciona un archivo .zip");
    return;
  }

  const file = fileInput.files[0];

  button.disabled = true;
  status.textContent = "Subiendo archivo...";
  progress.style.display = "block";
  bar.style.width = "0%";

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error en el servidor");
    }

    // Forzar descarga
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "converted_nifti.zip";
    link.click();

    status.textContent = "Conversión completada ✔️";
  } catch (err) {
    status.textContent = "Error: " + err.message;
  } finally {
    button.disabled = false;
    bar.style.width = "100%";
  }
};

// Simulación de progreso visual
let fakeProgress = 0;
setInterval(() => {
  if (fakeProgress < 90) {
    fakeProgress += 3;
    bar.style.width = fakeProgress + "%";
  }
}, 300);
