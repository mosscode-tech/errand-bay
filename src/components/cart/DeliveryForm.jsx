import React from 'react';
import { FiTruck, FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const KENYAN_COUNTIES = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Kiambu', 
  'Uasin Gishu', 'Machakos', 'Kajiado', 'Meru', 'Nyeri', 'Other'
];

const DeliveryForm = ({ formData, onChange }) => {
  const handleChange = (e) => {
    onChange({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white border rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center gap-2 border-b pb-3">
        <FiTruck className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-bold text-gray-900">Delivery Information</h3>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <FiUser />
          </span>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Moses Kariuki"
            className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <FiMail />
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="mosscode101@gmail.com"
            className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number (M-Pesa / Contact) *</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <FiPhone />
          </span>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="07XXXXXXXX or 2547XXXXXXXX"
            className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
          />
        </div>
        <p className="text-[11px] text-gray-400 mt-1">Format: 07XXXXXXXX, 01XXXXXXXX, or 2547XXXXXXXX</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">County *</label>
          <select
            name="county"
            required
            value={formData.county}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
          >
            <option value="">Select County</option>
            {KENYAN_COUNTIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Town / Delivery Location *</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <FiMapPin />
            </span>
            <input
              type="text"
              name="town"
              required
              value={formData.town}
              onChange={handleChange}
              placeholder="e.g. Westlands, Nairobi"
              className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Courier Service</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <FiTruck />
          </span>
          <input
            type="text"
            name="courier"
            value={formData.courier}
            onChange={handleChange}
            placeholder="Select or type custom courier (e.g. Wells Fargo, G4S)..."
            className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;