import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Blog {
  id: number;
  title: string;
  slug: string;
  tags: string;
  status: "draft" | "published";
  created_at: string;
}

const STATUS_LIST: Array<"all" | "draft" | "published"> = [
  "all",
  "draft",
  "published",
];

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filter, setFilter] = useState<"all" | "draft" | "published">("all");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* =========================
     FETCH BLOGS
  ========================= */
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const url =
        filter === "all"
          ? "http://localhost:5000/api/blogs"
          : `http://localhost:5000/api/blogs?status=${filter}`;

      const res = await axios.get<Blog[]>(url);
      setBlogs(res.data);
    } catch (err) {
      console.error("Fetch error ❌", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [filter]);

  /* =========================
     UPDATE STATUS
  ========================= */
  const updateStatus = async (id: number, status: "draft" | "published") => {
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}/status`, {
        status,
      });
      fetchBlogs();
    } catch (err) {
      console.error("Status update failed ❌", err);
    }
  };

  /* =========================
     DELETE BLOG
  ========================= */
  const handleDelete = async (id: number) => {
    const ok = window.confirm("Are you sure you want to delete this blog?");
    if (!ok) return;

    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Delete failed ❌", err);
    }
  };

  if (loading) {
    return <p className="p-6">Loading blogs...</p>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Blogs</h1>

        <button
          onClick={() => navigate("/admin/blogs/add")}
          className="px-4 py-2 text-sm bg-[#0055E5] text-white rounded hover:bg-blue-700"
        >
          + Add Blog
        </button>
      </div>

      {/* FILTER */}
      <div className="flex gap-2 mb-4">
        {STATUS_LIST.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded border text-sm ${
              filter === s
                ? "bg-[#0055E5] text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Tags</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-4 text-center text-gray-500"
                >
                  No blogs found
                </td>
              </tr>
            )}

            {blogs.map((blog) => (
              <tr
                key={blog.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3">{blog.id}</td>
                <td className="p-3">{blog.title}</td>
                <td className="p-3">{blog.tags}</td>
                <td className="p-3">
                  {new Date(blog.created_at).toDateString()}
                </td>

                {/* STATUS */}
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded mr-2 ${
                      blog.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {blog.status}
                  </span>

                  <div className="flex gap-1 mt-1">
                    {(["draft", "published"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(blog.id, s)}
                        disabled={blog.status === s}
                        className={`px-2 py-0.5 text-xs border rounded transition ${
                          blog.status === s
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-100 active:scale-95"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </td>

                {/* ACTIONS */}
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/blogs/edit/${blog.id}`)
                      }
                      className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlogs;
