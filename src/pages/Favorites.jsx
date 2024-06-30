import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const filteredFavorites = favorites.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div>
        <h1 className="text-3xl text-center">Favorite Stories</h1>
        <div className="my-4">
          <Input
            type="text"
            placeholder="Search favorite stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredFavorites.length === 0 ? (
          <p className="text-center">No favorite stories found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredFavorites.map((story) => (
              <li key={story.id} className="border-b pb-4">
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {story.title}
                </a>
                <p>{story.score} upvotes</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default Favorites;