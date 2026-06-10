// import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  PencilSimple,
  CalendarBlank,
  Tag,
  Clock,
} from "@phosphor-icons/react";
import pressReleaseData from "../../data/pressReleaseData";
// import { useLocation } from "react-router-dom";


export default function PressReleaseView() {
    // const location = useLocation();

    // const pressRelease = location.state?.pressRelease;
    const { id } = useParams();
    const pressRelease = pressReleaseData.find(
        (item) => item.id === Number(id)
    );

    if (!pressRelease) {
    return (
      <div className="alert alert-danger">
        Press Release not found
      </div>
    );
  }

  return (
    <div className="press-release-view">

      {/* Header */}
      <div className="mb-4">
        <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h2 className="mb-1">
              Press Release Details
            </h2>
          </div>

          <div className="d-flex gap-2">
            <Link
              to="/pressrelease/list"
              className="btn btn-light"
            >
              <ArrowLeft size={18} />
              <span className="ms-2">
                Back
              </span>
            </Link>
            <Link
              to={`/pressrelease/edit/${id}`}
              className="btn btn-primary"
            >
              <PencilSimple size={18} />
              <span className="ms-2">
                Edit
              </span>
            </Link>

          </div>

        </div>

      </div>

      {/* Main Content */}
      <div className="card">

        {/* Featured Image */}
        <img
          src={pressRelease.featuredImage}
          alt={pressRelease.title}
          className="img-fluid rounded-top"
          style={{
            maxHeight: "450px",
            objectFit: "cover",
            width: "100%",
          }}
        />

        <div className="card-body">

          {/* Status */}
          <div className="mb-3">

            <span
              className={`badge ${
                pressRelease.status === "Published"
                  ? "bg-success"
                  : "bg-warning text-dark"
              }`}
            >
              {pressRelease.status}
            </span>

          </div>

          {/* Title */}
          <h1 className="mb-3">
            {pressRelease.title}
          </h1>

          {/* Meta Info */}
          <div className="d-flex flex-wrap gap-4 mb-4 text-muted">

            <div className="d-flex align-items-center gap-2">
              <Tag size={18} />
              {pressRelease.category}
            </div>

            <div className="d-flex align-items-center gap-2">
              <CalendarBlank size={18} />
              {pressRelease.publishedAt}
            </div>

            <div className="d-flex align-items-center gap-2">
              <Clock size={18} />
              Press Release
            </div>

          </div>

          {/* Short Description */}
          <div className="mb-4">

            <h5>
              Short Description
            </h5>

            <p className="lead mb-0">
              {pressRelease.shortDescription}
            </p>

          </div>

          {/* Slug */}
          <div className="mb-4">

            <h5>
              Slug
            </h5>

            <code>
              {pressRelease.slug}
            </code>

          </div>

          {/* Content */}
          <div className="mb-5">

            <h4 className="mb-3">
              Content
            </h4>

            <div
              className="press-release-content"
              dangerouslySetInnerHTML={{
                __html: pressRelease.content,
              }}
            />

          </div>

          {/* SEO Section */}
          <div className="card bg-light border-0">

            <div className="card-header">
              <h5 className="mb-0">
                SEO Information
              </h5>
            </div>

            <div className="card-body">

              <div className="mb-3">
                <strong>
                  Meta Title
                </strong>

                <p className="mb-0 mt-1">
                  {pressRelease.metaTitle}
                </p>
              </div>

              <div className="mb-3">
                <strong>
                  Meta Description
                </strong>

                <p className="mb-0 mt-1">
                  {pressRelease.metaDescription}
                </p>
              </div>

              <div>
                <strong>
                  Keywords
                </strong>

                <p className="mb-0 mt-1">
                  {pressRelease.keywords}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}