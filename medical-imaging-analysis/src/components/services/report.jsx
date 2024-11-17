import React from "react";
import Modal from "../../UI/Modal"; // Assuming this is the correct import for Modal

const image = {
  previewUrl: "/images/sample.jpg",
  title: "Brain MRI Scan",
  category: "MRI",
  uploadDate: "2024-11-16",
  resolution: "1920x1080",
  fileSize: "2.5 MB",
  fileType: "JPEG",
  diagnosis: "Alzheimer’s Stage 2",
  doctorNotes: "Visible plaques in frontal lobe",
  analysisResult: "85% probability of Alzheimer's",
  visibility: "Public",
  sharedWith: ["Doctor A", "Department X"],
};

export default function ImageDetailsModal({ onClose, open }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-white w-[80%] rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90%]">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold">
            {image.title || "Image Details"}
          </h2>
          <button className="text-red-500 font-bold text-lg" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Image Preview */}
          <div className="w-full md:w-1/2">
            <img
              src={image.previewUrl || "/placeholder.png"}
              alt={image.title}
              className="w-full rounded-lg border shadow"
            />
          </div>

          {/* Right Column - Image Information */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            {/* Metadata Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Image Details</h3>
              <ul className="text-gray-600">
                <li>
                  <strong>Category:</strong> {image.category || "N/A"}
                </li>
                <li>
                  <strong>Upload Date:</strong> {image.uploadDate || "N/A"}
                </li>
                <li>
                  <strong>Resolution:</strong> {image.resolution || "N/A"}
                </li>
                <li>
                  <strong>File Size:</strong> {image.fileSize || "N/A"}
                </li>
                <li>
                  <strong>File Type:</strong> {image.fileType || "N/A"}
                </li>
              </ul>
            </div>

            {/* Diagnosis Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Diagnosis</h3>
              <ul className="text-gray-600">
                <li>
                  <strong>Diagnosis:</strong>{" "}
                  {image.diagnosis || "No diagnosis available"}
                </li>
                <li>
                  <strong>Doctor's Notes:</strong> {image.doctorNotes || "N/A"}
                </li>
                <li>
                  <strong>Analysis Result:</strong>{" "}
                  {image.analysisResult || "N/A"}
                </li>
              </ul>
            </div>

            {/* Visibility Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Access & Visibility
              </h3>
              <ul className="text-gray-600">
                <li>
                  <strong>Visibility:</strong> {image.visibility || "N/A"}
                </li>
                <li>
                  <strong>Shared With:</strong>{" "}
                  {image.sharedWith ? image.sharedWith.join(", ") : "N/A"}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
          <button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg">
            Download Image
          </button>
          <button className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg">
            Annotate
          </button>
          <button className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
