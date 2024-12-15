import { json } from "react-router-dom";
import AddNew from "../components/addNew";
import { useLoaderData } from "react-router-dom";
import PatientCard from "../components/patientCard";
import Button from "./../UI/Button";

export default function Landing() {
  const data = useLoaderData();
  const patients = data?.data || [];

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-blue-600 text-white h-screen w-1/5 flex flex-col items-center py-6 fixed">
          {/* Add New Component */}
          <AddNew />

          {/* Signup Button */}
          <div className="mt-4 w-full px-4">
            <Button className="w-full bg-white text-blue-600 hover:bg-blue-200">
              Signup
            </Button>
          </div>

          {/* Sidebar Navigation Links */}
          <ul className="mt-6 w-full text-center">
            <li className="py-1 hover:bg-blue-500 cursor-pointer">
              sort options
            </li>
            <li className="py-1 hover:bg-blue-500 cursor-pointer">filters</li>
            <li className="py-1 hover:bg-blue-500 cursor-pointer">
              patients status
            </li>
            <li className="py-2 hover:bg-blue-500 cursor-pointer">Logout</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="bg-blue-100 h-screen w-4/5 ml-[20%] p-6 overflow-y-scroll">
          {/* Title */}
          <h1 className="text-2xl font-bold text-blue-800 mb-4">
            Patient Records
          </h1>

          {/* Patients List */}
          <div className="flex flex-wrap">
            {patients.data.length > 0 ? (
              patients.data.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))
            ) : (
              <p className="text-gray-500 text-center w-full">
                No patients found.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function loader() {
  const apiURL = "http://localhost:4000/medical_analysis/patients";
  try {
    const response = await fetch(apiURL);

    // Check for response status
    if (!response.ok) {
      throw json(
        { message: "Error while fetching data from backend." },
        { status: response.status }
      );
    }

    const data = await response.json();
    return { data: data.data };
  } catch (error) {
    console.error("Error loading patient data:", error);
    return json({ data: [] });
  }
}
