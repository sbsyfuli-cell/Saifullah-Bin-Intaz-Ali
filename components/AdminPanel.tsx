
import React, { useState } from 'react';
import { ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_CONTACT } from '../constants';

const AdminPanel: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('ইউজারনেম বা পাসওয়ার্ড ভুল হয়েছে!');
    }
  };

  if (isLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-emerald-900 rounded-3xl p-8 text-white mb-8 shadow-xl text-center relative overflow-hidden">
            <h2 className="text-3xl font-bold mb-4">স্বাগতম, এডমিন!</h2>
            <p className="text-emerald-200 mb-6">অ্যাপের সকল তথ্য ম্যানেজ করতে নিচের অপশনগুলো ব্যবহার করুন।</p>
            <div className="flex justify-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mr-2">📊</span>
                    অ্যাপ স্ট্যাটাস
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-slate-600">মোট ইউজার</span>
                        <span className="font-bold">১২৫০+</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-slate-600">সার্ভার স্ট্যাটাস</span>
                        <span className="text-emerald-500 font-bold">অনলাইন</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-slate-600">বট কোয়েরি আজ</span>
                        <span className="font-bold">৮৫</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mr-2">⚙️</span>
                    দ্রুত অ্যাকশন
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 bg-slate-50 text-sm font-medium rounded-xl border border-slate-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">নোটিফিকেশন পাঠান</button>
                    <button className="p-3 bg-slate-50 text-sm font-medium rounded-xl border border-slate-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">কন্টেন্ট আপডেট</button>
                    <button className="p-3 bg-slate-50 text-sm font-medium rounded-xl border border-slate-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">বট ট্রেনিং</button>
                    <button onClick={() => setIsLoggedIn(false)} className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100 hover:bg-red-100 transition-colors">লগ আউট</button>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-emerald-50">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-emerald-900 mb-2">এডমিন লগইন</h2>
            <p className="text-slate-500">এডমিন প্যানেলে প্রবেশ করতে আপনার তথ্যাদি দিন।</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">ইউজারনেম</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="saifullah890"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">পাসওয়ার্ড</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm font-medium text-center bg-red-50 py-2 rounded-lg">{error}</p>}
          
          <button 
            type="submit" 
            className="w-full py-4 bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-800 transition-all transform active:scale-95"
          >
            লগইন করুন
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">আমাদের সাথে যোগাযোগ করুন</h3>
            <div className="flex justify-center space-x-4">
                <a href={`https://wa.me/${ADMIN_CONTACT.whatsapp}`} target="_blank" className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.82c1.516.903 3.076 1.378 4.7 1.379 5.381 0 9.76-4.379 9.764-9.76.002-2.607-1.013-5.059-2.859-6.904-1.847-1.847-4.296-2.863-6.904-2.864-5.381 0-9.76 4.379-9.764 9.76-.001 2.128.552 4.204 1.594 6l-.994 3.635 3.719-.976z" /></svg>
                </a>
                <a href={`https://t.me/${ADMIN_CONTACT.telegram}`} target="_blank" className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.462 8.249l-1.588 7.491c-.117.533-.437.662-.886.411l-2.417-1.782-1.166 1.122c-.129.129-.238.238-.488.238l.173-2.459 4.474-4.04c.194-.173-.043-.27-.298-.101l-5.531 3.481-2.384-.746c-.518-.163-.529-.518.108-.767l9.315-3.591c.431-.158.81.101.602.664z" /></svg>
                </a>
                <a href={ADMIN_CONTACT.facebook} target="_blank" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                </a>
            </div>
            <p className="mt-4 text-slate-500 font-bold">{ADMIN_CONTACT.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
