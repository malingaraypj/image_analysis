import InfoCard from "../components/home/info_cards";
import bgImage from "./../assets/bg-image.png";

export default function Home() {
  const ReadMore = [
    {
      title: "2133",
      img: "dummy",
      content: `Our annual report reveals the burden of Alzheimer’s and dementia on individuals, caregivers, government, and the nation’s health care system.`,
    },
    {
      title: "2133",
      img: "dummy",
      content: `Our annual report reveals the burden of Alzheimer’s and dementia on individuals, caregivers, government, and the nation’s health care system.`,
    },
    {
      title: "2133",
      img: "dummy",
      content: `Our annual report reveals the burden of Alzheimer’s and dementia on individuals, caregivers, government, and the nation’s health care system.`,
    },
    {
      title: "2133",
      img: "dummy",
      content: `Our annual report reveals the burden of Alzheimer’s and dementia on individuals, caregivers, government, and the nation’s health care system.`,
    },
    {
      title: "2133",
      img: "dummy",
      content: `Our annual report reveals the burden of Alzheimer’s and dementia on individuals, caregivers, government, and the nation’s health care system.`,
    },
    {
      title: "2133",
      img: "dummy",
      content: `Our annual report reveals the burden of Alzheimer’s and dementia on individuals, caregivers, government, and the nation’s health care system.`,
    },
    {
      title: "2133",
      img: "dummy",
      content: `Our annual report reveals the burden of Alzheimer’s and dementia on individuals, caregivers, government, and the nation’s health care system.`,
    },
    {
      title: "2133",
      img: "dummy",
      content: `Our annual report reveals the burden of Alzheimer’s and dementia on individuals, caregivers, government, and the nation’s health care system.`,
    },
  ];

  return (
    <>
      <div
        className="w-auto mb-0 h-80 bg-cover bg-center flex justify-end flex-col"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="text-center mt-12 p-5 font-bold">
        <h1 className="text-purple-950 text-5xl p-2">
          Alzheimer's and Dementia
        </h1>
        <h2 className="text-stone-950 text-3xl p-2">
          Worldwide, 55 million people are living with Alzheimer's and other
          dementias.
        </h2>
        <p className="text-stone-600 text-xl p-2">
          Alzheimer’s disease is a degenerative brain disease and the most
          common cause of dementia. Dementia is not a specific disease. It's an
          overall term that describes a group of symptoms.
        </p>
      </div>
      <div className="relative bg-purple-700 flex justify-end">
        <div className="bg-green-600 flex flex-wrap justify-center mb-8 p-4 mr-4 w-2/3">
          {ReadMore.map((card, index) => (
            <InfoCard key={index} title={card.title} content={card.content} />
          ))}
        </div>
      </div>
    </>
  );
}
