import Button from "../../UI/Button";

export default function InfoCard({ title, content, image }) {
  console.log(image);
  return (
    <div className="bg-gradient-to-r from-lime-500 to-lime-400 max-w-60 max-h-80 flex flex-col justify-between m-5">
      <img src={image} alt="dummy_image" />
      <h1 className="text-center text-xl font-bold">{title}</h1>
      <p className="text-wrap break-words overflow-hidden">{content}</p>
      <div className="flex justify-center align-bottom m-2">
        <Button
          className={
            "text-white bg-green-600 hover:bg-green-400 p-2 hover:text-green-200"
          }
        >
          Read More
        </Button>
      </div>
    </div>
  );
}
