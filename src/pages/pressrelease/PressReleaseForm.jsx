import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FloppyDisk,
} from "@phosphor-icons/react";
import Swal from "sweetalert2";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import pressReleaseData from "../../data/pressReleaseData";

const defaultFormData = {
  title: "",
  slug: "",
  category: "",
  featuredImage: "",
  shortDescription: "",
  content: "",
  status: "Draft",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
};

const categories = [
  "Banking",
  "Finance",
  "Corporate",
  "Investment",
];

export default function PressReleaseForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const pressRelease = isEditMode
    ? pressReleaseData.find(
        (item) => item.id === Number(id)
      )
    : null;

  const [formData, setFormData] = useState(
    pressRelease
      ? {
          title: pressRelease.title || "",
          slug: pressRelease.slug || "",
          category: pressRelease.category || "",
          featuredImage:
            pressRelease.featuredImage || "",
          shortDescription:
            pressRelease.shortDescription || "",
          content: pressRelease.content || "",
          status: pressRelease.status || "Draft",
          metaTitle:
            pressRelease.metaTitle || "",
          metaDescription:
            pressRelease.metaDescription || "",
          keywords:
            pressRelease.keywords || "",
        }
      : defaultFormData
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setFormData((prev) => ({
            ...prev,
            title,
            slug: generateSlug(title),
        }));
    };
    const validateForm = () => {
  const plainContent = formData.content
    .replace(/<[^>]*>/g, "")
    .trim();

  if (!formData.title.trim()) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Title is required.",
    });
    return false;
  }

  if (formData.title.trim().length < 5) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Title must contain at least 5 characters.",
    });
    return false;
  }

  if (!formData.category) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Please select a category.",
    });
    return false;
  }

  if (!formData.featuredImage.trim()) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Featured image is required.",
    });
    return false;
  }

  try {
    new URL(formData.featuredImage);
  } catch {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Please enter a valid image URL.",
    });
    return false;
  }

  if (!formData.shortDescription.trim()) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Short description is required.",
    });
    return false;
  }

  if (
    formData.shortDescription.trim().length <
    20
  ) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Short description must contain at least 20 characters.",
    });
    return false;
  }

  if (!plainContent) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Content is required.",
    });
    return false;
  }

  if (!formData.metaTitle.trim()) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Meta title is required.",
    });
    return false;
  }

  if (!formData.metaDescription.trim()) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Meta description is required.",
    });
    return false;
  }

  if (!formData.keywords.trim()) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Keywords are required.",
    });
    return false;
  }

  return true;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  const payload = {
    id: isEditMode
      ? Number(id)
      : Date.now(),

    title: formData.title,
    slug: formData.slug,
    category: formData.category,
    featuredImage:
      formData.featuredImage,
    shortDescription:
      formData.shortDescription,
    content: formData.content,
    status: formData.status,
    metaTitle: formData.metaTitle,
    metaDescription:
      formData.metaDescription,
    keywords: formData.keywords,

    createdAt:
      new Date().toISOString(),
  };

  console.group(
    "Press Release Payload"
  );
  console.table(payload);
  console.groupEnd();

  await Swal.fire({
    icon: "success",
    title: isEditMode
      ? "Updated Successfully"
      : "Created Successfully",
    text: isEditMode
      ? "Press Release updated successfully."
      : "Press Release created successfully.",
    confirmButtonText: "OK",
  });

  navigate("/pressrelease/list");
};

  if (isEditMode && !pressRelease) {
    return (
      <div className="alert alert-danger">
        Press Release not found.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Header */}

      <div className="mb-4">
        <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h2 className="mb-1">
              {isEditMode
                ? "Edit Press Release"
                : "Create Press Release"}
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

            <button
              type="submit"
              className="btn btn-primary"
            >
              <FloppyDisk size={18} />
              <span className="ms-2">
                {isEditMode
                  ? "Update"
                  : "Save"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Form */}

      <div className="card">
        <div className="card-body">

          {/* Title */}

          <div className="mb-4">
            <label className="form-label">
              Title *
            </label>

            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleTitleChange}
              required
            />
          </div>

          {/* Slug */}

          <div className="mb-4">
            <label className="form-label">
              Slug
            </label>

            <input
              type="text"
              name="slug"
              className="form-control"
              value={formData.slug}
              onChange={handleChange}
            />
          </div>

          {/* Category + Status */}

          <div className="row mb-4">

            <div className="col-md-6">
              <label className="form-label">
                Category
              </label>

              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
                >
                <option value="">
                    Select Category
                </option>

                {categories.map((category) => (
                    <option
                    key={category}
                    value={category}
                    >
                    {category}
                    </option>
                ))}
                </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Status
              </label>

              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Draft">
                  Draft
                </option>

                <option value="Published">
                  Published
                </option>
              </select>
            </div>

          </div>

          {/* Featured Image */}

          <div className="mb-4">
            <label className="form-label">
              Featured Image URL
            </label>

            <input
              type="text"
              name="featuredImage"
              className="form-control"
              value={formData.featuredImage}
              onChange={handleChange}
            />
          </div>

          {/* Preview */}

            {formData.featuredImage && (
                <div className="mb-4">

                    <label className="form-label">
                    Image Preview
                    </label>

                    <img
                    src={formData.featuredImage}
                    alt="Preview"
                    className="img-fluid rounded border"
                    style={{
                        maxHeight: "250px",
                        objectFit: "cover",
                    }}
                    onError={(e) => {
                        e.target.style.display =
                        "none";
                    }}
                    />

                </div>
            )}

          {/* Short Description */}

          <div className="mb-4">
            <label className="form-label">
              Short Description
            </label>

            <textarea
              rows="4"
              name="shortDescription"
              className="form-control"
              value={formData.shortDescription}
              onChange={handleChange}
            />
          </div>

          {/* Content */}

          <div className="mb-5">
            <label className="form-label">
              Content
            </label>

            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={handleContentChange}
            />
          </div>

          {/* SEO */}

          <div className="card bg-light border-0">
            <div className="card-header">
              <h5 className="mb-0">
                SEO Information
              </h5>
            </div>

            <div className="card-body">

              <div className="mb-3">
                <label className="form-label">
                  Meta Title
                </label>

                <input
                  type="text"
                  name="metaTitle"
                  className="form-control"
                  value={formData.metaTitle}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Meta Description
                </label>

                <textarea
                  rows="3"
                  name="metaDescription"
                  className="form-control"
                  value={
                    formData.metaDescription
                  }
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="form-label">
                  Keywords
                </label>

                <input
                  type="text"
                  name="keywords"
                  className="form-control"
                  value={formData.keywords}
                  onChange={handleChange}
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </form>
  );
}