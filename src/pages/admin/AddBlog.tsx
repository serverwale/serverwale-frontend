import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Upload, Image, Bold, Italic, List, ListOrdered, Heading2, Heading3, Quote, Code, Link } from "lucide-react";

const AddBlog = () => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const inlineImageInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingInlineImage, setUploadingInlineImage] = useState(false);

  const handleSubmit = async () => {
    if (!title || !slug || !content) {
      alert("Title, slug & content required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("excerpt", excerpt);
    formData.append("tags", tags);
    formData.append("content", content);
    formData.append("status", status);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      await axios.post("/api/blogs", formData);
      alert("Blog added successfully ✅");
      navigate("/admin/blogs");
    } catch (err) {
      console.error("Add blog failed ❌", err);
      alert("Failed to add blog");
    } finally {
      setLoading(false);
    }
  };

  // Insert HTML at cursor position in textarea
  const insertAtCursor = (textToInsert: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);

    const newContent = before + textToInsert + after;
    setContent(newContent);

    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + textToInsert.length;
      textarea.focus();
    }, 0);
  };

  // Insert formatting tags
  const insertTag = (tag: string, placeholder: string = "") => {
    const selectedText = contentRef.current?.value.substring(
      contentRef.current.selectionStart,
      contentRef.current.selectionEnd
    ) || placeholder;
    
    const openingTag = `<${tag}>`;
    const closingTag = `</${tag}>`;
    const textToInsert = `${openingTag}${selectedText}${closingTag}`;
    
    insertAtCursor(textToInsert);
  };

  // Handle inline image upload
  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    try {
      setUploadingInlineImage(true);
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "/api/blogs/upload-inline-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success && response.data.imageUrl) {
        // Insert image tag at cursor position
        const imgTag = `<img src="${response.data.imageUrl}" alt="${file.name}" class="inline-image" />`;
        insertAtCursor(imgTag);
        alert("Image inserted successfully ✅");
      } else {
        alert("Failed to upload image");
      }
    } catch (err) {
      console.error("Inline image upload failed ❌", err);
      alert("Failed to upload inline image. Please try again.");
    } finally {
      setUploadingInlineImage(false);
      // Reset the input so the same file can be selected again
      if (inlineImageInputRef.current) {
        inlineImageInputRef.current.value = "";
      }
    }
  };

  // Toolbar button component
  const ToolbarButton = ({ 
    onClick, 
    icon: Icon, 
    title, 
    disabled = false 
  }: { 
    onClick: () => void; 
    icon: React.ElementType; 
    title: string;
    disabled?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-md transition-all duration-200 ${
        disabled 
          ? "opacity-50 cursor-not-allowed" 
          : "hover:bg-slate-200 text-slate-600 hover:text-[#0055E5]"
      }`}
    >
      <Icon size={18} />
    </button>
  );

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1e293b] px-6 py-4">
          <h1 className="text-xl md:text-2xl font-bold text-white">Add New Blog</h1>
          <p className="text-blue-200 text-sm mt-1">Create engaging content with inline images</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Title & Slug Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-[#0055E5] focus:border-[#0055E5] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Slug (URL-friendly) *
              </label>
              <input
                type="text"
                placeholder="e.g., my-blog-post"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                className="w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-[#0055E5] focus:border-[#0055E5] outline-none transition-all"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Short Description
            </label>
            <textarea
              placeholder="Brief description for blog cards (shown in listings)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-[#0055E5] focus:border-[#0055E5] outline-none transition-all resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g., cloud, servers, technology"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-[#0055E5] focus:border-[#0055E5] outline-none transition-all"
            />
          </div>

          {/* Content Editor with Toolbar */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-xs font-medium text-slate-500 mr-2">Format:</span>
                
                <ToolbarButton 
                  onClick={() => insertTag("h2")} 
                  icon={Heading2} 
                  title="Heading 2" 
                />
                <ToolbarButton 
                  onClick={() => insertTag("h3")} 
                  icon={Heading3} 
                  title="Heading 3" 
                />
                <ToolbarButton 
                  onClick={() => insertTag("strong")} 
                  icon={Bold} 
                  title="Bold" 
                />
                <ToolbarButton 
                  onClick={() => insertTag("em")} 
                  icon={Italic} 
                  title="Italic" 
                />
                
                <div className="w-px h-6 bg-slate-300 mx-1" />
                
                <ToolbarButton 
                  onClick={() => insertTag("ul")} 
                  icon={List} 
                  title="Unordered List" 
                />
                <ToolbarButton 
                  onClick={() => insertTag("ol")} 
                  icon={ListOrdered} 
                  title="Ordered List" 
                />
                
                <div className="w-px h-6 bg-slate-300 mx-1" />
                
                <ToolbarButton 
                  onClick={() => insertTag("blockquote")} 
                  icon={Quote} 
                  title="Quote" 
                />
                <ToolbarButton 
                  onClick={() => insertTag("code")} 
                  icon={Code} 
                  title="Code" 
                />
                <ToolbarButton 
                  onClick={() => insertTag("a href='#'", "Link text")} 
                  icon={Link} 
                  title="Link" 
                />

                <div className="w-px h-6 bg-slate-300 mx-1" />

                {/* Inline Image Upload Button */}
                <input
                  ref={inlineImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleInlineImageUpload}
                  className="hidden"
                  id="inline-image-upload"
                />
                <label
                  htmlFor="inline-image-upload"
                  className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                    uploadingInlineImage
                      ? "bg-blue-100 text-[#0055E5]"
                      : "bg-[#0F172A] text-white hover:bg-[#1e293b]"
                  }`}
                >
                  <Image size={16} />
                  <span className="text-xs font-medium">
                    {uploadingInlineImage ? "Uploading..." : "Insert Image"}
                  </span>
                </label>
              </div>
            </div>

            <textarea
              ref={contentRef}
              placeholder="Write your blog content here... Use the toolbar to format text and insert images."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              className="w-full p-4 font-mono text-sm focus:outline-none resize-y min-h-[300px]"
            />
          </div>

          {/* Live Preview */}
          {content && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                <span className="text-sm font-semibold text-slate-700">Live Preview</span>
              </div>
              <div 
                className="p-6 blog-content bg-white max-h-96 overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            </div>
          )}

          {/* Featured Image Upload */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Featured Blog Image
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-[#0055E5] hover:bg-blue-50 transition-all">
                <Upload size={18} className="text-slate-400" />
                <span className="text-sm text-slate-600">{image ? image.name : "Choose featured image"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                  className="hidden"
                />
              </label>
              
              {image && (
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="text-red-500 text-sm hover:text-red-700 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-2">This image appears as the cover on blog listings</p>
          </div>

          {/* Status & Submit */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-slate-700">Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-slate-200 p-2 rounded-lg focus:ring-2 focus:ring-[#0055E5] focus:border-[#0055E5] outline-none text-sm"
              >
                <option value="draft">📝 Draft</option>
                <option value="published">🚀 Published</option>
              </select>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate("/admin/blogs")}
                className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors flex-1 sm:flex-none"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2.5 bg-[#0F172A] hover:bg-[#1e293b] text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Saving...
                  </>
                ) : (
                  <>Save Blog ✓</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
