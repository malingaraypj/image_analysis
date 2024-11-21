import { useRef, useState } from "react";
import Upload from "../assets/icons/upload";
import Uploading from "../components/services/uploading";
import Button from "./../UI/Button";
import Input from "./../UI/Input";

export default function Services() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const uploadRef = useRef();

  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      console.log(
        `Selected File: ${file.name}, Size: ${(file.size / 1024).toFixed(2)} kB`
      );
    }
  };

  const handleFileUpload = async () => {
    if (!image) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    const token = sessionStorage.getItem("jwtToken");
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:4000/medical_analysis/user/upload",
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("File uploaded successfully");
        alert("File uploaded successfully!");
      } else {
        console.error("File upload failed");
        alert("File upload failed!");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      alert("An error occurred while uploading the file.");
    } finally {
      setLoading(false);
      setImage(null);
    }
  };

  const triggerFileSelection = () => {
    uploadRef.current.click();
  };

  return (
    <div className="m-auto h-screen bg-blue-200 flex items-center justify-center">
      <div className="flex w-2/3 h-2/3 bg-white p-20">
        {/* Left Section */}
        <div className="w-1/2 flex flex-col justify-center items-center p-4 bg-slate-200">
          <Upload color={"blue"} width={80} height={80} />
          <h1 className="text-xl font-semibold mt-4">Drag and Drop File</h1>
          <p className="text-gray-600 mt-2">or</p>

          {/* Select File Button */}
          <Button
            onClick={triggerFileSelection}
            className="bg-blue-700 text-white py-2 px-10 mt-4 hover:bg-blue-500 hover:text-blue-200"
          >
            Select File
          </Button>

          {/* Hidden File Input */}
          <Input
            type="file"
            id="img_upload"
            name="image"
            imageUpload={true}
            ref={uploadRef}
            onChange={handleFileSelection}
          />

          {/* Upload Button */}
          {image && (
            <Button
              onClick={handleFileUpload}
              className="bg-green-700 text-white py-2 px-10 mt-4 hover:bg-green-500 hover:text-green-200"
            >
              {loading ? "Uploading..." : "Upload File"}
            </Button>
          )}
        </div>

        {/* Right Section */}
        <div className="w-1/2 overflow-auto bg-slate-100">
          <div className="space-y-4 h-full overflow-y-auto">
            {loading && (
              <p className="text-center text-blue-500">Uploading...</p>
            )}
            <Uploading status={true} loading={loading} image={image} />
            <Uploading status={false} loading={loading} image={image} />
          </div>
        </div>
      </div>
    </div>
  );
}
