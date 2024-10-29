import BookAppointment from "../components/home/book_appointment";
import InfoCard from "../components/home/info_cards";
import bgImage from "./../assets/bg-image.png";
export default function Home() {
  const ReadMore = [
    { title: "2133", content: "lskdfjslkdjfoweiurlkdjflskdjflkdfjldkfjldjf" },
    { title: "2133", content: "lskdfjslkdjfoweiurlkdjflskdjflkdfjldkfjldjf" },
    { title: "2133", content: "lskdfjslkdjfoweiurlkdjflskdjflkdfjldkfjldjf" },
  ];
  return (
    <>
      <div
        className="w-auto mb-0 h-screen bg-cover bg-center flex justify-end flex-col"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h1>Welcome to Home page</h1>
        <div className="flex justify-center mb-8">
          {ReadMore.map((card) => (
            <InfoCard title={card.title} content={card.content} />
          ))}
        </div>
      </div>
      <BookAppointment />
    </>
  );
}
