const SuccessStories = () => {
  const stories = [
    { id: 1, name: "Rushali & Abhishek", img: "/couple1.jpg", desc: "We found each other through ShaadiClone. Grateful for the platform." },
    { id: 2, name: "Rushali & Abhishek", img: "/couple2.jpg", desc: "A beautiful journey started with ShaadiClone." },
    { id: 3, name: "Shreyashree & Sukdev", img: "/couple3.jpg", desc: "Swipe, connect, chat. Our connection was instant." },
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">1 Million Success Stories & Counting</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {stories.map((story) => (
          <div key={story.id} className="w-72 bg-white rounded shadow">
            <img src={story.img} alt={story.name} className="rounded-t"/>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{story.name}</h3>
              <p className="text-sm text-gray-600">{story.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
