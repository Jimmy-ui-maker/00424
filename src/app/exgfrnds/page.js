import ExCard from "@/components/ExCard";

export default function HomePage() {
  const exList = [
    {
      image: "/avatar-placeholder.svg",
      name: "Jamila",
      myReason: "She said she's not doing again, e can only be friends 😂",
      herReason: "She have a man already, very serious boyfriend 😳",
    },
    {
      image: "/avatar-placeholder.svg",
      name: "Regina",
      myReason: "She didn’t like jollof rice 😳",
      herReason: "I spent more time gaming than texting her 🎮",
    },
    {
      image: "/avatar-placeholder.svg",
      name: "Alice",
      myReason: "She never chat me on social media 🤷🏽‍♂️",
      herReason: "I demand alot from her 🌚",
    },
    {
      image: "/avatar-placeholder.svg",
      name: "Docas",
      myReason: "She keep playing game of sense with me 🤷🏽‍♂️",
      herReason: "I never allow her to understand me 😂",
    },
  ];

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">My Ex-Girlfriend Tracker 😂</h1>
      <div className="row">
        {exList.map((ex, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <ExCard {...ex} />
          </div>
        ))}
      </div>
    </div>
  );
}
