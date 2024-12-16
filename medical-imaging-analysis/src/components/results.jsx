import AnalysisCard from "./AnalysisCard";

export default function Results({ patient }) {
  console.log(patient);
  console.log("inside results");
  return (
    <div className="w-2/3  bg-white m-10">
      <div className="m-5 bg-stone-400 p-5 text-stone-700">
        <h1 className="font-bold text-xl text-center">Recent Analysis</h1>
      </div>
      <div className="flex flex-col gap-5 m-4">
        {patient.scannedImg.map((img) => (
          <AnalysisCard key={img._id} img={img} />
        ))}
      </div>
    </div>
  );
}
