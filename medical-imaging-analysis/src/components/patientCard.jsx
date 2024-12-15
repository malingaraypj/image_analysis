import React from "react";
import DummyImg from "./../assets/icons/dummy";
import { Link } from "react-router-dom";

export default function PatientCard({ patient }) {
  // console.log(patient);
  return (
    <div className="w-1/3 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        {/* Patient Image */}
        <div className="flex justify-center mb-4">
          {!patient.image ? (
            <DummyImg width={50} height={50} color={"blue"} />
          ) : (
            <img
              src={`http://localhost:4000/${patient.image}`}
              alt={`Profile of ${patient.name}`}
              className="w-24 h-24 object-cover rounded-full border-4 border-blue-500"
            />
          )}
        </div>

        {/* Patient Details */}
        <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">
          {patient.name || "Unknown Name"}
        </h3>

        <p className=" text-gray-600 text-sm mb-1">
          <strong>DOB:</strong> {patient.dob || "Not provided"}
        </p>
        <p className=" text-gray-600 text-sm mb-1">
          <strong>Gender:</strong> {patient.gender || "Not specified"}
        </p>
        <p className=" text-gray-600 text-sm mb-1">
          <strong>Phone:</strong> {patient.phone || "No contact info"}
        </p>
        {/* View Details Button */}
        <div className="mt-4 flex justify-center">
          <Link
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
            to={`/${patient._id}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
