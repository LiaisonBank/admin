import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PencilSimple,
  Eye,
  Trash,
  MagnifyingGlass,
} from "@phosphor-icons/react";

import pressReleaseData from "../../data/pressReleaseData";

export default function PressReleaseList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const pressReleases = pressReleaseData || [];

  // Dynamic Categories
  const categories = [
    ...new Set(
      pressReleases
        .map((item) => item.category)
        .filter(Boolean)
    ),
  ].sort();

  // Filters
  const filteredData = pressReleases.filter(
    (item) => {
      const searchTerm = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !searchTerm ||
        [
          item.title,
          item.category,
          item.status,
          item.date,
          item.slug,
          item.shortDescription,
        ].some((field) =>
          String(field || "")
            .toLowerCase()
            .includes(searchTerm)
        );

      const matchesCategory =
        !category ||
        item.category === category;

      const matchesStatus =
        !status ||
        item.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    }
  );

  // Pagination
  const totalPages = Math.ceil(
    filteredData.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const endIndex =
    startIndex + itemsPerPage;

  const paginatedData =
    filteredData.slice(
      startIndex,
      endIndex
    );

  // Auto-adjust page
//   useEffect(() => {
//     if (
//       currentPage > totalPages &&
//       totalPages > 0
//     ) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (
    value
  ) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (
    value
  ) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setStatus("");
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this press release?"
    );

    if (!confirmed) return;

    console.log(
      "Delete Press Release:",
      id
    );

    // API Call Here
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Published":
        return "badge bg-success";

      case "Draft":
        return "badge bg-warning text-dark";

      default:
        return "badge bg-secondary";
    }
  };

  return (
    <div className="card border-0 shadow-sm">

      {/* Header */}

      <div className="card-header bg-white d-flex justify-content-between align-items-center flex-wrap gap-3">
        <h4 className="mb-0">
          Press Releases
        </h4>

        <Link
          to="/pressrelease/add"
          className="btn btn-primary"
        >
          + Add Press Release
        </Link>
      </div>

      {/* Filters */}

      <div className="card-body border-bottom">

        <div className="row g-3">

          <div className="col-lg-4">
            <div className="position-relative">

              <MagnifyingGlass
                size={18}
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              />

              <input
                type="text"
                className="form-control ps-5"
                placeholder="Search title, category, status, date..."
                value={search}
                onChange={(e) =>
                  handleSearch(
                    e.target.value
                  )
                }
              />

            </div>
          </div>

          <div className="col-lg-3">
            <select
              className="form-select"
              value={category}
              onChange={(e) =>
                handleCategoryChange(
                  e.target.value
                )
              }
            >
              <option value="">
                All Categories
              </option>

              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-3">
            <select
              className="form-select"
              value={status}
              onChange={(e) =>
                handleStatusChange(
                  e.target.value
                )
              }
            >
              <option value="">
                All Status
              </option>

              <option value="Published">
                Published
              </option>

              <option value="Draft">
                Draft
              </option>
            </select>
          </div>

          <div className="col-lg-2">
            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>

        </div>

      </div>

      {/* Table */}

      <div className="table-responsive">

        <table className="table align-middle mb-0">

          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Published Date</th>
              <th width="180">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {filteredData.length > 0 ? (
              paginatedData.map(
                (item) => (
                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>
                      <img
                        src={item.image}
                        alt={item.title}
                        width="80"
                        height="60"
                        className="rounded object-fit-cover"
                      />
                    </td>

                    <td>
                      <strong>
                        {item.title}
                      </strong>
                    </td>

                    <td>
                      {item.category}
                    </td>

                    <td>
                      <span
                        className={getStatusBadge(
                          item.status
                        )}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      {item.date}
                    </td>

                    <td>
                      <div className="d-flex gap-2">

                        <Link
                          to={`/pressrelease/view/${item.id}`}
                          className="btn btn-sm btn-light border"
                        >
                          <Eye size={18} />
                        </Link>

                        <Link
                          to={`/pressrelease/edit/${item.id}`}
                          className="btn btn-sm btn-primary"
                        >
                          <PencilSimple size={18} />
                        </Link>

                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            handleDelete(
                              item.id
                            )
                          }
                        >
                          <Trash size={18} />
                        </button>

                      </div>
                    </td>

                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-5 text-muted"
                >
                  No press releases found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="card-footer bg-white d-flex justify-content-between align-items-center flex-wrap gap-3">

        <small className="text-muted">
          Showing{" "}
          <strong>
            {filteredData.length === 0
              ? 0
              : startIndex + 1}
          </strong>
          -
          <strong>
            {Math.min(
              endIndex,
              filteredData.length
            )}
          </strong>{" "}
          of{" "}
          <strong>
            {filteredData.length}
          </strong>{" "}
          entries
        </small>

        {totalPages > 1 && (
          <nav>
            <ul className="pagination pagination-sm mb-0">

              <li
                className={`page-item ${
                  currentPage === 1
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                type="button"
                className="page-link"
                disabled={currentPage === 1}
                onClick={() =>
                    setCurrentPage((prev) =>
                    Math.max(prev - 1, 1)
                    )
                }
                >
                Previous
                </button>
              </li>

              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage ===
                      index + 1
                        ? "active"
                        : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="page-link"
                      onClick={() =>
                        setCurrentPage(
                          index + 1
                        )
                      }
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}

              <li
                className={`page-item ${
                  currentPage ===
                  totalPages
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                type="button"
                className="page-link"
                disabled={
                    currentPage >= totalPages
                }
                onClick={() =>
                    setCurrentPage((prev) =>
                    Math.min(
                        prev + 1,
                        totalPages
                    )
                    )
                }
                >
                Next
                </button>
              </li>

            </ul>
          </nav>
        )}

      </div>

    </div>
  );
}