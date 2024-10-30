import Button from "../../UI/Button";

export default function BookAppointment() {
  return (
    <div className="w-full h-28 bg-purple-500 flex items-center justify-around">
      <div>
        <h1 className=" text-3xl font-bolds text-white">
          &gt; Schedule your appointment online
        </h1>
      </div>
      <div className="relative left-4">
        <Button
          className={
            "bg-purple-800 hover:bg-purple-600 text-white p-2 hover:text-purple-100"
          }
        >
          Book appointment
        </Button>
      </div>
    </div>
  );
}
