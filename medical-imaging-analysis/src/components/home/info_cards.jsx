import Button from "./ReadMore_button";

export default function InfoCard({ title, content }) {
  return (
    <div className="bg-gradient-to-r from-lime-500 to-lime-400 w-48 h-48 flex flex-col justify-between m-5">
      <h1 className="text-center text-xl font-bold">{title}</h1>
      <p className="text-wrap break-words">{content}</p>
      <div className="flex justify-center align-bottom m-2">
        <Button>Read More</Button>
      </div>
    </div>
  );
}
