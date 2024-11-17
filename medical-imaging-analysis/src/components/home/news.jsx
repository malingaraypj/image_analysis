import dummyImg from "./../../assets/dummy.png";

export default function News() {
  return (
    <>
      <div className="flex max-w-screen-xl mx-auto p-5 gap-8">
        <div className="flex-shrink-0 w-fit sm:w-1/3">
          <img
            src={dummyImg}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
            alt="dummy img"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="ml-5 text-sm text-gray-500">dummy 12 90</p>
          <h1 className="text-3xl font-sans ml-5 font-bold">
            Dummy title of the component news
          </h1>
          <p className="text-lg ml-5 mt-4 text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor,
            aliquid. A sapiente deserunt enim laborum modi rerum ratione, facere
            vero ipsam aperiam recusandae pariatur repellendus dolor quaerat
            sequi fugit laboriosam! Ea illo delectus eligendi consequuntur quo
            perspiciatis laborum non debitis.
          </p>
        </div>
      </div>
      <hr className="border-t-2 border-gray-800 my-5 max-w-screen-2xl mx-px" />
    </>
  );
}
