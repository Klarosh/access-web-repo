import React, { useState, useMemo } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Heart, HeartOff } from "lucide-react";

// Store Card Component
const StoreCard = React.memo(({ title, description, imageUrl, price, room, onClick, onView, isFavorite, onToggleFavorite }) => {
  return (
    <div className="relative w-[250px] rounded-xl bg-[#0f1729] border-2 border-[#0066ff] overflow-hidden group shadow-lg animate-glow-border">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0066ff] via-[#00a2ff] to-[#0066ff] opacity-10 group-hover:opacity-20" />
      <div className="relative p-4">
        <div className="h-[200px] w-full mb-4 overflow-hidden rounded-lg bg-[#1a2234] flex items-center justify-center">
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-orbitron text-lg text-[#00a2ff] tracking-wider group-hover:text-[#0066ff] transition-colors">
            {title}
          </h2>
          <button onClick={onToggleFavorite} aria-label={`Toggle favorite for ${title}`}>
            {isFavorite ? (
              <Heart className="w-5 h-5 text-[#00a2ff] fill-[#00a2ff]" />
            ) : (
              <HeartOff className="w-5 h-5 text-[#a0d8ef]" />
            )}
          </button>
        </div>
        <p className="font-chakra-petch text-sm text-[#a0d8ef] mb-4 h-[40px] overflow-hidden">{description}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="font-orbitron text-[#0066ff] text-xl group-hover:text-[#00a2ff]">
            {new Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
            }).format(price)}
          </span>
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClick}
            className="bg-[#0066ff] hover:bg-[#00a2ff] text-white px-3 py-1 rounded-full font-chakra-petch text-sm transition-colors duration-300"
          >
            Find in Store
          </button>
          <button
            onClick={onView}
            className="bg-[#1a2234] border border-[#0066ff] hover:bg-[#0066ff] text-[#00a2ff] hover:text-white px-3 py-1 rounded-full font-chakra-petch text-sm transition-colors duration-300"
          >
            View Product
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [favorites, setFavorites] = useState({});

  const categories = ["All", "Stickers", "Pins"];

  const items = [
    {
      title: "Soren Pin",
      description: "Holographic keychain with a neon developer theme.",
      imageUrl: "/img/let/Soren.png",
      price: 12.99,
      category: "Pins",
      room: "Room 306",
    },
    {
      title: "Virel Pin",
      description: "Aesthetic high-gloss Sage Gyatt sticker.",
      imageUrl: "/img/let/Virel.png",
      price: 9.99,
      category: "Pins",
      room: "Pin Section",
    },
    {
      title: "Boss Pin",
      description: "Aesthetic high-gloss Sage Gyatt sticker.",
      imageUrl: "/img/let/Boss.png",
      price: 9.99,
      category: "Pins",
      room: "Pin Section",
    },
    {
      title: "Virel Sticker",
      description: "Aesthetic high-gloss Sage Gyatt sticker.",
      imageUrl: "/img/let/VirelSticker.png",
      price: 9.99,
      category: "Stickers",
      room: "Sticker Section",
    },
    {
      title: "Soren Sticker",
      description: "Aesthetic high-gloss Sage Gyatt sticker.",
      imageUrl: "/img/let/SorenSticker.png",
      price: 9.99,
      category: "Stickers",
      room: "Sticker Section",
    },
    {
      title: "Boss Sticker",
      description: "Aesthetic high-gloss Sage Gyatt sticker.",
      imageUrl: "/img/let/BossSticker.png",
      price: 9.99,
      category: "Stickers",
      room: "Sticker Section",
    },
    {
      title: "Meme Sticker",
      description: "Aesthetic high-gloss Sage Gyatt sticker.",
      imageUrl: "/img/let/MemeV1.png",
      price: 9.99,
      category: "Stickers",
      room: "Sticker Section",
    },
    {
      title: "Phone Sticker",
      description: "Aesthetic high-gloss Sage Gyatt sticker.",
      imageUrl: "/img/let/PhoneSticker.png",
      price: 9.99,
      category: "Stickers",
      room: "Sticker Section",
    }
  ];

  const filteredItems = useMemo(() => {
    let filtered = items;

    if (activeCategory !== "All") {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }

    if (sortOrder === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [items, activeCategory, searchQuery, sortOrder]);

  const handleCategoryChange = (category) => setActiveCategory(category);
  const handleItemClick = (room) => {
    setRoomInfo(`Go to the ${room} to buy this item!`);
    toast.success(`You can find this item in the ${room}.`);
  };
  const handleViewProduct = (product) => setSelectedProduct(product);
  const handleToggleFavorite = (title) => {
    setFavorites((prev) => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div className="p-8 bg-black min-h-screen text-left">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-zentry text-[#00a2ff] mb-4">Merchandise Store</h1>
      <p className="text-[#a0d8ef] mb-6 font-chakra-petch">
        Explore exclusive gear from Barbecue Studios and partners.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full font-chakra-petch text-sm transition-colors duration-200 ${
              activeCategory === cat
                ? "bg-[#0066ff] text-white"
                : "bg-[#1a2234] text-[#00a2ff] hover:bg-[#0066ff] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-auto px-4 py-2 rounded-md bg-[#1a2234] text-[#00a2ff] font-chakra-petch placeholder-[#a0d8ef]"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 rounded-md bg-[#1a2234] text-[#00a2ff] font-chakra-petch"
        >
          <option value="default">Sort by</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {roomInfo && (
        <div className="mt-4 p-4 bg-[#00a2ff] text-white text-lg rounded-md">
          <p>{roomInfo}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center mt-6">
        {filteredItems.map((item, index) => (
          <StoreCard
            key={index}
            {...item}
            isFavorite={!!favorites[item.title]}
            onToggleFavorite={() => handleToggleFavorite(item.title)}
            onClick={() => handleItemClick(item.room)}
            onView={() => handleViewProduct(item)}
          />
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#0f1729] border-2 border-[#0066ff] rounded-xl p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-[#00a2ff] hover:text-white text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.title}
              className="w-full h-64 object-contain rounded-lg mb-4"
            />
            <h2 className="font-orbitron text-2xl text-[#00a2ff] mb-2">{selectedProduct.title}</h2>
            <p className="font-chakra-petch text-[#a0d8ef] mb-4">{selectedProduct.description}</p>
            <p className="text-lg font-orbitron text-[#00a2ff] mb-2">
              Price:{" "}
              {new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(selectedProduct.price)}
            </p>
            <p className="text-sm font-chakra-petch text-[#a0d8ef]">
              Available in: {selectedProduct.room}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
