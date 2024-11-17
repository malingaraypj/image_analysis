import Button from "../../UI/Button";

export default function InfoCard({ title, content, image }) {
  console.log(image);
  return (
    <div className="bg-blue-200 w-80 h-96 m-8 flex flex-col justify-between">
      <img src={image} alt="dummy_image" />
      <h1 className="text-center text-2xl text-blue-800 font-bold">{title}</h1>
      <p className="text-wrap break-words overflow-hidden text-lg">{content}</p>
      <div className="flex justify-center align-bottom m-2">
        <Button
          className={
            "text-white bg-blue-500 hover:bg-blue-400 p-2 hover:text-green-200"
          }
        >
          Read More
        </Button>
      </div>
    </div>
  );
}
