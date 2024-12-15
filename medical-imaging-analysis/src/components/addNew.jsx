import { useNavigate } from "react-router-dom";
import Add from "../assets/icons/add";

export default function AddNew() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/addPatient");
  }
  return (
    <button className="bg-blue-700 p-5 rounded-xl m-4 text-white" onClick={handleClick}>
      <div className="flex justify-center gap-5">
        <Add width={30} height={30} />
        Add new
      </div>
    </button>
  );
}
