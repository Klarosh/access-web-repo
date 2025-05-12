import React, { useState, useMemo } from "react";
import { Toaster, toast } from "react-hot-toast";

// Store Card Component
const StoreCard = React.memo(({ title, description, imageUrl, price, room, onClick }) => {
  return (
    <div className="relative w-[250px] rounded-xl bg-[#0f1729] border-2 border-[#0066ff] overflow-hidden group shadow-lg animate-glow-border">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0066ff] via-[#00a2ff] to-[#0066ff] opacity-10 group-hover:opacity-20" />
      <div className="relative p-4">
        <div className="h-[200px] w-full mb-4 overflow-hidden rounded-lg bg-[#1a2234] flex items-center justify-center">
          <img src={imageUrl} alt={title} loading="lazy" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
        </div>
        <h2 className="font-orbitron text-lg text-[#00a2ff] mb-2 tracking-wider group-hover:text-[#0066ff] transition-colors">{title}</h2>
        <p className="font-chakra-petch text-sm text-[#a0d8ef] mb-4 h-[40px] overflow-hidden">{description}</p>
        <div className="flex justify-between items-center">
          <span className="font-orbitron text-[#0066ff] text-xl group-hover:text-[#00a2ff]">
            {new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(price)}
          </span>
          <button onClick={onClick} aria-label={`Find ${title} in store`} className="bg-[#0066ff] hover:bg-[#00a2ff] text-white px-4 py-1 rounded-full font-chakra-petch text-sm transition-colors duration-300">
            Find in Store
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#0066ff] via-[#00a2ff] to-[#0066ff]" />
    </div>
  );
});

export default function StoreSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [roomInfo, setRoomInfo] = useState("");

  const categories = ["All", "Keychains", "Stickers", "Lanyards", "Bracelets", "Apparel", "Drinkware"];

  const items = [
    { title: "Cyber Developer Keychain", description: "Holographic keychain with a neon developer theme.", imageUrl: "/img/keychain-1.png", price: 12.99, category: "Keychains", room: "Room 306" },
    { title: "Sage Gyatt Sticker", description: "Aesthetic high-gloss Sage Gyatt sticker.", imageUrl: "/img/2.jpeg", price: 9.99, category: "Stickers", room: "Sticker Section" },
    { title: "Sage: Heavy To Carry", description: "Futuristic lanyard with glitch-inspired print.", imageUrl: "/img/23.jpeg", price: 14.99, category: "Lanyards", room: "Cyber Lounge" },
    { title: "Barbecue Studios Bracelet", description: "Custom silicone bracelet with studio branding.", imageUrl: "/img/pin-1.png", price: 8.49, category: "Bracelets", room: "Accessory Room" },
    { title: "Stick Hoodie", description: "Soft cotton hoodie with minimalist 'Stick' logo.", imageUrl: "/img/hoodie.png", price: 29.99, category: "Apparel", room: "Apparel Section" },
    { title: "Mug", description: "Ceramic mug with glitch design and logo.", imageUrl: "/img/mug.png", price: 11.99, category: "Drinkware", room: "Drinkware Section" },
  ];

  const filteredItems = useMemo(() => {
    return activeCategory === "All" ? items : items.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleItemClick = (room) => {
    setRoomInfo(`Go to the ${room} to buy this item!`);
    toast.success(`You can find this item in the ${room}.`);
  };

  return (
    <div className="p-8 bg-black min-h-screen text-left">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-zentry text-[#00a2ff] mb-4">Merchandise Store</h1>
      <p className="text-[#a0d8ef] mb-6 font-chakra-petch">Explore exclusive gear from Barbecue Studios and partners.</p>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            aria-label={`Show ${cat} products`}
            className={`px-4 py-2 rounded-full font-chakra-petch text-sm transition-colors duration-200 ${activeCategory === cat ? "bg-[#0066ff] text-white" : "bg-[#1a2234] text-[#00a2ff] hover:bg-[#0066ff] hover:text-white"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Room Info Display */}
      {roomInfo && (
        <div className="mt-6 p-4 bg-[#00a2ff] text-white text-lg rounded-md">
          <p>{roomInfo}</p>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        {filteredItems.map((item, index) => (
          <StoreCard key={index} {...item} onClick={() => handleItemClick(item.room)} />
        ))}
      </div>
    </div>
  );
}
