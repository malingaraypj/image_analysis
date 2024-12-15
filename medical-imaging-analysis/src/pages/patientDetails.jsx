import { Link, useLoaderData } from "react-router-dom";

export default function PatientReport() {
  const data = useLoaderData();
  const patient = data.data.data;
//   console.log(patient);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Patient Report Card
        </h1>
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <img
              src={`http://localhost:4000/${patient.image}`}
              alt="Patient"
              className="w-40 h-40 rounded-full object-cover border-2 border-blue-400"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800">
              {patient.name}
            </h2>
            <p className="text-gray-600">
              <strong>Date of Birth:</strong> {patient.dob}
            </p>
            <p className="text-gray-600">
              <strong>Gender:</strong> {patient.gender}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {patient.phone}
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> {patient.address}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Medical History
          </h3>
          <p className="text-gray-600 whitespace-pre-wrap">
            {patient.medicalHistory || "No history provided"}
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Medical Allergies
          </h3>
          <p className="text-gray-600 whitespace-pre-wrap">
            {patient.medicalAllergy || "No allergies mentioned"}
          </p>
        </div>
        <Link
          className="bg-green-500 p-3 rounded-2xl text-white mt-10"
          to={"/services"}
        >
          Analyse the results
        </Link>
      </div>
    </div>
  );
}

// Loader to fetch the patient data
export async function loader({ params }) {
  const patientId = params.id;
  const apiURL = `http://localhost:4000/medical_analysis/patients/${patientId}`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("Failed to fetch patient details");
    }

    return response;
  } catch (error) {
    console.error("Error fetching patient data:", error);
    throw new Error("Patient details not found.");
  }
}
