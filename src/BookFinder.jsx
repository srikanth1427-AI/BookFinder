import { useState } from "react";

function BookFinder() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        https://openlibrary.org/search.json?title=${query}
      );
      const data = await res.json();
      setBooks(data.docs.slice(0, 10)); // top 10 results
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Book Finder</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search book by title..."
          className="border p-2 rounded w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchBooks}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {books.map((book, idx) => (
          <div
            key={idx}
            className="p-4 bg-white rounded shadow hover:shadow-lg"
          >
            {book.cover_i ? (
              <img
                src={https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg}
                alt={book.title}
                className="mb-2 rounded"
              />
            ) : (
              <div className="h-40 flex items-center justify-center bg-gray-200 rounded">
                No Cover
              </div>
            )}
            <h2 className="font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600">
              {book.author_name?.[0] || "Unknown"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookFinder;