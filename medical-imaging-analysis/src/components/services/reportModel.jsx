import { useNavigate } from "react-router-dom"; // Use React Router's navigate hook
import Modal from "../../UI/Modal";
import ImageDetailsModal from "./report";
import Button from "../../UI/Button";

export default function ReportModel() {
  const navigate = useNavigate(); // Use the correct navigation hook

  const handleModalClose = () => {
    navigate(-1); // Navigate back to the previous page in the history stack
  };

  return (
    <>
      <Modal open={true} onClose={handleModalClose}>
        <ImageDetailsModal />
        <Button onClick={handleModalClose}>Close</Button>
      </Modal>
    </>
  );
}
