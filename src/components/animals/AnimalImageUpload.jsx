import { ImagePlus, Trash2, UploadCloud } from "lucide-react";
import { useRef } from "react";

export default function AnimalImageUpload({ value, onChange }) {
  const inputRef = useRef(null);

  function chooseFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      window.alert("Please select an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      window.alert("Please choose an image smaller than 2 MB for this demo.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <section className="form-section upload-section">
      <div className="form-section-title"><span className="section-icon"><ImagePlus size={17} /></span><div><h2>Animal photograph</h2><p>Add an image to help identify the animal</p></div></div>
      <input ref={inputRef} className="visually-hidden" type="file" accept="image/*" onChange={chooseFile} />
      {value ? (
        <div className="image-preview"><img src={value} alt="Animal preview" /><button type="button" className="remove-image" onClick={() => { onChange(""); if (inputRef.current) inputRef.current.value = ""; }}><Trash2 size={15} /> Remove</button></div>
      ) : (
        <button type="button" className="upload-dropzone" onClick={() => inputRef.current?.click()}>
          <span className="upload-icon"><UploadCloud size={24} /></span><strong>Click to upload an image</strong><span>PNG, JPG or WEBP · Maximum 2 MB</span>
        </button>
      )}
    </section>
  );
}