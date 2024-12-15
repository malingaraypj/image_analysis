import { json } from "react-router-dom";
import AddNew from "../components/addNew";
import Input from "../UI/Input";
import { useLoaderData } from "react-router-dom";
import PatientCard from "../components/patientCard";

export default function Landing() {
  const data = useLoaderData();
  const patients = data.data;

  return (
    <>
      <div className="flex justify-center">
        <Input type="text" placeholder="Search patients" />
      </div>
      <div className="flex">
        <div className="bg-blue-300 h-screen w-1/5 flex-col flex fixed">
          <AddNew />
        </div>

        <div className="bg-blue-200 h-screen w-4/5 ml-[20%] p-4 overflow-y-scroll flex flex-wrap">
          {patients.data.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
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
      throw json({ message: "Error while fetching data from backend." });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading patient data:", error);
    return json({ data: [] });
  }
}
