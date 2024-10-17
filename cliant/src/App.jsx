import { useEffect, useState } from "react";

function App() {
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [posts, setPosts] = useState([]);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    fetch(`http://localhost:4000/posts?page=${pageNumber}`)
      .then((response) => response.json())
      .then(({ totalPages, posts }) => {
        setPosts(posts);
        setNumberOfPages(totalPages);
      });
  }, [pageNumber]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  return (
    <div className="App p-8">
      <h3 className="text-xl font-semibold mb-4">Page of {pageNumber + 1}</h3>

      {posts.map((post) => (
        <div
          key={post._id}
          className="post bg-white shadow-lg p-6 rounded-lg mb-6"
        >
          <h4 className="text-lg font-bold mb-2">{post.title}</h4>
          <p className="text-gray-700">{post.text}</p>
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button
          onClick={gotoPrevious}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {pages.map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => setPageNumber(pageIndex)}
              className={`px-4 py-2 ${
                pageIndex === pageNumber
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-lg hover:bg-gray-300`}
            >
              {pageIndex + 1}
            </button>
          ))}
        </div>

        <button
          onClick={gotoNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
