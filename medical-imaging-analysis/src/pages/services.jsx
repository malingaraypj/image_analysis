import { useState } from "react";
import Upload from "../assets/icons/upload";
import Uploading from "../components/services/uploading";
import Button from "./../UI/Button";
import Input from "./../UI/Input";

export default function Services() {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = () => {
    setLoading(true);
    // Simulate file upload delay
    setTimeout(() => {
      setLoading(false); // Hide loader after a delay
      // logic of the file uploading
    }, 5000);
  };

  return (
    <div className="m-auto h-screen bg-blue-200 flex items-center justify-center">
      <div className="flex w-2/3 h-2/3 bg-white p-20">
        {/* Left Section */}
        <div className="w-1/2 flex flex-col justify-center items-center p-4 bg-slate-200">
          <Upload color={"blue"} width={80} height={80} />
          <h1 className="text-xl font-semibold mt-4">Drag and Drop File</h1>
          <p className="text-gray-600 mt-2">or</p>
          <Button
            onClick={handleFileUpload}
            className="bg-blue-700 text-white py-2 px-10 mt-4 hover:bg-blue-500 hover:text-blue-200"
          >
            <Input
              type="file"
              id="img_upload"
              name="img_upload"
              noBorder={true}
            />
          </Button>
        </div>

        {/* Right Section with Fixed Height and Scroll */}
        <div className="w-1/2 overflow-auto bg-slate-100">
          {/* If you want to limit the number of items visible, apply max height */}
          <div className="space-y-4 h-full overflow-y-auto">
            <Uploading status={true} loading={loading} />
            <Uploading status={false} loading={loading} />
            <Uploading status={true} loading={loading} />
            <Uploading status={true} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
