export default function AnalysisCard({ img }) {
    return (
      <div className="bg-stone-200 w-full p-3 flex items-center space-x-4 rounded-lg shadow-md">
        {/* Image Section */}
        <img src={`http://localhost:4000/scannedImages/${img.image}`}
          alt="uploaded_image"
          className="w-20 h-20 object-cover rounded-md"
        />
        
        {/* Text Section */}
        <div className="flex-1">
          <div className="mb-2">
            <h1 className="font-semibold text-stone-700">Analysis Time:</h1>
            <p className="text-stone-600">{img.createdAt}</p>
          </div>
          <div>
            <strong className="block text-stone-700">Status:</strong>
            <p className="text-stone-600">{img.alzheimerClass}</p>
          </div>
        </div>
      </div>
    );
  }
  