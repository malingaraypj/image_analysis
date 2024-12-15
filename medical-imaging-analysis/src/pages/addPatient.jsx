import { Form, redirect } from "react-router-dom";
import Input from "../UI/Input";

export default function AddPatient() {
  return (
    <>
      <div className="bg-blue-300 min-h-screen flex justify-center items-center">
        <div className="bg-blue-500 my-10 p-10 w-1/2 rounded-lg shadow-lg">
          <h1 className="text-2xl text-white font-bold mb-6 text-center">
            Add Patient Details
          </h1>
          <Form method="post" encType="multipart/form-data">
            <Input
              label="Full Name"
              type="text"
              id="name"
              color="text-white"
              name="name"
              placeholder="Enter full name"
            />
            <Input
              label="Date of Birth"
              type="date"
              color="text-white"
              id="dob"
              name="dob"
              placeholder="Enter date of birth"
            />

            <div className="flex gap-5">
              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block text-white font-semibold mb-2"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="w-full p-2 rounded border border-gray-300"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <Input
                label="Phone Number"
                type="tel"
                prefix="+91"
                color="text-white"
                id="phone"
                name="phone"
                placeholder="Enter phone number"
              />
            </div>
            <label
              htmlFor="address"
              className="block text-white font-semibold mb-2"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows="4"
              className="w-full p-2 rounded border border-gray-300"
              placeholder="Enter Permanent Address"
            ></textarea>

            <div className="mb-4">
              <label
                htmlFor="medicalHistory"
                className="block text-white font-semibold mb-2"
              >
                Medical History
              </label>
              <textarea
                id="medicalHistory"
                name="medicalHistory"
                rows="4"
                className="w-full p-2 rounded border border-gray-300"
                placeholder="Enter medical history"
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="medicalAllergy"
                className="block text-white font-semibold mb-2"
              >
                Medical Allergies
              </label>
              <textarea
                id="medicalAllergy"
                name="medicalAllergy"
                rows="4"
                className="w-full p-2 rounded border border-gray-300"
                placeholder="Enter any medical allergies"
              ></textarea>
            </div>

            <Input
              label="Patient Image"
              type="file"
              color="text-white"
              id="image"
              name="image"
            />

            <button className="bg-green-600 w-full py-2 text-white font-bold rounded hover:bg-green-700 transition mt-5">
              Submit
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  const apiURL = "http://localhost:4000/medical_analysis/patients";
  try {
    const response = await fetch(apiURL, {
      method: "POST",
      body: formData, 
    });

    if (!response.ok) {
      throw new Error("Failed to save patient details");
    }

    return redirect("/");
  } catch (error) {
    console.error("Error saving patient details:", error);
    return { error: "Failed to save patient details" };
  }
}
