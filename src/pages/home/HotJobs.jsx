import React, { useEffect, useState } from "react";
import HotJobCard from "./HotJobCard";

const HotJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3000/jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs.");
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort filtered jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    let aValue, bValue;

    if (sortKey === "title") {
      aValue = a.title.toLowerCase();
      bValue = b.title.toLowerCase();
    } else if (sortKey === "date") {
      aValue = new Date(a.datePosted);
      bValue = new Date(b.datePosted);
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Search and Sort Controls */}
      <div className="mb-4 flex justify-between">
        <div className="flex">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 max-w-4xl px-4 py-2 border border-gray-300 rounded "
          />
        </div>
        <div className="flex space-x-4">
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="title">Title</option>
            <option value="date">Date Posted</option>
            {/* Add more options as needed */}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentJobs.map((job) => (
          <HotJobCard key={job._id} job={job} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => paginate(num + 1)}
            className={`px-3 py-1 mx-1 rounded ${
              num + 1 === currentPage ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HotJobs;
