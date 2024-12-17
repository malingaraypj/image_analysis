import { json } from "react-router-dom";
import AddNew from "../components/addNew";
import { useLoaderData } from "react-router-dom";
import PatientCard from "../components/patientCard";
import Button from "./../UI/Button";
// import { useContext, useEffect, useState } from "react";
// import { SearchContext } from "../UI/searchContext";

export default function Landing() {
  // const [patients,setPatients]=useState([])
  // const [loadedPatients,setLoadedPatients]=useState([]);
  const data = useLoaderData();
  console.log(data.data.data);
  const patients = data.data.data;
  // setLoadedPatients(loadedPatients)

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
            <li className="py-1 hover:bg-blue-500 cursor-pointer"></li>
            <li className="py-1 hover:bg-blue-500 cursor-pointer">Recents</li>
            <li className="py-1 hover:bg-blue-500 cursor-pointer">Filters</li>
            <li className="py-2 hover:bg-blue-500 cursor-pointer">
              <button
                onClick={() => {
                  sessionStorage.removeItem("jwtToken");
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            </li>
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
            {patients.length > 0 ? (
              patients.map((patient) => (
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

  const token = sessionStorage.getItem("jwtToken");

  if (!token) {
    throw json(
      { message: "You must be logged in to access this resource." },
      { status: 401 }
    );
  }

  // try {
  const response = await fetch(apiURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errData = await response.json();
    console.log(errData.message);

    throw json({ message: errData.message }, { status: response.status });
  }

  return response;
  // } catch (error) {
  //   console.error("Error:", error);
  //   throw json({ message: "Failed to load data." }, { status: 500 });
  // }
}
