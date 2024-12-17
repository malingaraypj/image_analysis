import { formatDate, formatTime } from "../UI/utility_functions";

export default function AnalysisCard({ img }) {
  const time = formatTime(img.createdAt);
  const date = formatDate(img.createdAt);
  // console.log(date);
  return (
    <div className="bg-stone-200 w-full p-3 flex items-center space-x-4 rounded-lg shadow-md">
      {/* Image Section */}
      <img
        src={`http://localhost:4000/scannedImages/${img.image}`}
        alt="uploaded_image"
        className="w-20 h-20 object-cover rounded-md"
      />

      {/* Text Section */}
      <div className="flex-1">
        <div className="mb-2 flex">
          <h1 className="font-semibold text-stone-700">Analysis Date:</h1>
          <p className="text-stone-600 ml-3">{date}</p>
        </div>
        <div className="mb-2 flex">
          <h1 className="font-semibold text-stone-700">Analysis Time:</h1>
          <p className="text-stone-600 ml-3">{time}</p>
        </div>
        <div className="flex">
          <strong className="block text-stone-700">Status:</strong>
          <p className="text-stone-600 ml-3">{img.alzheimerClass}</p>
        </div>
      </div>
    </div>
  );
}
