import React, { useState } from "react";
import { X, Phone, User, MapPin, CheckCircle, Loader2 } from "lucide-react";
import axios from "axios";

interface SupportFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportFormModal: React.FC<SupportFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/support-requests",
        formData
      );

      if (response.data.success) {
        setSubmitted(true);
        setFormData({ name: "", phone: "", city: "" });
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (err: any) {
      console.error("Support form error:", err);
      setError(
        err.response?.data?.message || "Failed to submit. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setError(null);
    setFormData({ name: "", phone: "", city: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1e293b] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0055E5] rounded-lg flex items-center justify-center">
              <Phone size={16} className="text-white" />
            </div>
            <h2 className="text-lg font-semibold text-white">Get Support</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            /* Success Message */
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Thank You!
              </h3>
              <p className="text-slate-600 mb-2">
                Thanks for submitting your request. Our team will call you in very short time.
              </p>
              <p className="text-sm text-slate-500 mb-4">
                If it's urgent, please call us on our support number.
              </p>
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium text-[#0055E5]">
                  📞 Support: +91 800 887 6050
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-full bg-[#0F172A] hover:bg-[#0044BB] text-white py-2.5 rounded-lg font-medium transition-all duration-300"
              >
                Close
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-slate-500 mb-4">
                Fill in your details and our support team will get back to you shortly.
              </p>

              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0055E5] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone number"
                    required
                    maxLength={10}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0055E5] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* City Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0055E5] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F172A] hover:bg-[#0044BB] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </button>

              {/* Support Number */}
              <p className="text-center text-xs text-slate-500 mt-3">
                Need urgent help? Call us at{" "}
                <span className="text-[#0055E5] font-medium">+91 800 887 6050</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportFormModal;
