import { useState,  useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FloppyDisk } from "@phosphor-icons/react";
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
  status: "",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
};

const categories = ["Banking", "Finance", "Corporate", "Investment"];

export default function PressReleaseForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  // =========================
  // GET EDIT DATA (SAFE)
  // =========================
  const pressRelease = useMemo(() => {
    if (!isEditMode) return null;
    return pressReleaseData.find((item) => item.id === Number(id));
  }, [id, isEditMode]);

  // =========================
  // BUILD INITIAL STATE (NO useEffect NEEDED)
  // =========================
  const getInitialState = () => {
    if (isEditMode && pressRelease) {
      return {
        title: pressRelease.title || "",
        slug: pressRelease.slug || "",
        category: pressRelease.category || "",
        featuredImage: pressRelease.featuredImage || "",
        shortDescription: pressRelease.shortDescription || "",
        content: pressRelease.content || "",
        status: pressRelease.status || "",
        metaTitle: pressRelease.metaTitle || "",
        metaDescription: pressRelease.metaDescription || "",
        keywords: pressRelease.keywords || "",
      };
    }
    return defaultFormData;
  };

  // =========================
  // STATE (SINGLE SOURCE)
  // =========================
  const [formData, setFormData] = useState(getInitialState);

  // =========================
  // RESET WHEN ROUTE CHANGES
  // =========================
  // useEffect(() => {
  //   setFormData(getInitialState());
  // }, [id]);

  // =========================
  // HANDLERS
  // =========================
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

  const generateSlug = (value) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const handleTitleChange = (e) => {
    const title = e.target.value;

    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  // =========================
  // VALIDATION
  // =========================
  const validateForm = () => {
    const plainContent = formData.content.replace(/<[^>]*>/g, "").trim();

    if (!formData.title.trim()) {
      Swal.fire("Validation Error", "Title is required.", "error");
      return false;
    }

    if (formData.title.trim().length < 5) {
      Swal.fire("Validation Error", "Title must be at least 5 characters.", "error");
      return false;
    }

    if (!formData.category) {
      Swal.fire("Validation Error", "Please select a category.", "error");
      return false;
    }

    if (!formData.featuredImage.trim()) {
      Swal.fire("Validation Error", "Featured image is required.", "error");
      return false;
    }

    try {
      new URL(formData.featuredImage);
    } catch {
      Swal.fire("Validation Error", "Invalid image URL.", "error");
      return false;
    }

    if (!formData.shortDescription.trim() || formData.shortDescription.length < 20) {
      Swal.fire(
        "Validation Error",
        "Short description must be at least 20 characters.",
        "error"
      );
      return false;
    }

    if (!plainContent) {
      Swal.fire("Validation Error", "Content is required.", "error");
      return false;
    }

    if (!formData.metaTitle.trim()) {
      Swal.fire("Validation Error", "Meta title is required.", "error");
      return false;
    }

    if (!formData.metaDescription.trim()) {
      Swal.fire("Validation Error", "Meta description is required.", "error");
      return false;
    }

    if (!formData.keywords.trim()) {
      Swal.fire("Validation Error", "Keywords are required.", "error");
      return false;
    }

    return true;
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      id: isEditMode ? Number(id) : Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    console.table(payload);

    await Swal.fire({
      icon: "success",
      title: isEditMode ? "Updated Successfully" : "Created Successfully",
      text: isEditMode
        ? "Press Release updated successfully."
        : "Press Release created successfully.",
    });

    navigate("/pressrelease/list");
  };

  // =========================
  // NOT FOUND
  // =========================
  if (isEditMode && !pressRelease) {
    return <div className="alert alert-danger">Press Release not found.</div>;
  }

  // =========================
  // UI
  // =========================
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h2>
            {isEditMode ? "Edit Press Release" : "Create Press Release"}
          </h2>

          <div className="d-flex gap-2">
            <Link to="/pressrelease/list" className="btn btn-light">
              <ArrowLeft size={18} /> Back
            </Link>

            <button type="submit" className="btn btn-primary">
              <FloppyDisk size={18} />
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* FORM FIELDS */}
      <div className="card">
        <div className="card-body">
          <input
            name="title"
            className="form-control mb-3"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Title"
          />

          <input
            name="slug"
            className="form-control mb-3"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Slug"
          />

          <select
            name="category"
            className="form-select mb-3"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            name="status"
            className="form-select mb-3"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Select Status">Select Status</option>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
          <input
            name="featuredImage"
            className="form-control mb-3"
            value={formData.featuredImage}
            onChange={handleChange}
            placeholder="Image URL"
          />

          <textarea
            name="shortDescription"
            className="form-control mb-3"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Short Description"
          />

          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
          />

          <input
            name="metaTitle"
            className="form-control mt-3"
            value={formData.metaTitle}
            onChange={handleChange}
            placeholder="Meta Title"
          />

          <textarea
            name="metaDescription"
            className="form-control mt-3"
            value={formData.metaDescription}
            onChange={handleChange}
            placeholder="Meta Description"
          />

          <input
            name="keywords"
            className="form-control mt-3"
            value={formData.keywords}
            onChange={handleChange}
            placeholder="Keywords"
          />
        </div>
      </div>
    </form>
  );
}