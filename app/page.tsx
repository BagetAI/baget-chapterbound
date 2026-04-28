'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    favorite_genre: 'fiction',
    neighborhood: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage(`You're bound! We'll notify you when a chapter forms in ${formData.neighborhood}.`);
        setFormData({ full_name: '', email: '', favorite_genre: 'fiction', neighborhood: '' });
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Failed to connect. Check your internet and try again.');
    }
  };

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="p-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1B4332] rounded flex items-center justify-center text-white font-bold">C</div>
          <span className="text-2xl font-bold tracking-tight text-[#1B4332]">ChapterBound</span>
        </div>
        <a href="#waitlist" className="hidden md:block text-[#1B4332] font-semibold border-b-2 border-[#1B4332]">Join the Waitlist</a>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#1B4332] leading-tight mb-6">
            The social heartbeat of your neighborhood bookshelf.
          </h1>
          <p className="text-xl text-[#293241] mb-10 max-w-lg leading-relaxed">
            Tired of global noise? We match you with 5 neighbors within a 2-mile radius for monthly book club meetings at local coffee shops.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#waitlist" className="bg-[#1B4332] text-white px-8 py-4 rounded font-bold text-center hover:bg-[#143225] transition-colors">
              Reserve Your Spot
            </a>
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#F4F1DE] bg-gray-${i*100 + 200}`} />
                ))}
              </span>
              <span className="text-sm font-medium text-[#293241]/70">500+ readers joined</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <img 
            src="images/editorial-lifestyle-photography-of-a-sma.png" 
            alt="Neighbors discussing books at a local cafe" 
            className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
          />
          <div className="absolute -bottom-6 -left-6 bg-[#E07A5F] text-white p-6 rounded-xl hidden md:block max-w-xs shadow-xl">
            <p className="font-serif italic text-lg leading-snug">
              "Finally met neighbors who actually read more than just tweets."
            </p>
            <p className="text-sm mt-3 font-bold uppercase tracking-wider opacity-80">— Sarah, Brooklyn Chapter</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <div className="w-12 h-12 bg-[#F4F1DE] text-[#E07A5F] rounded-lg flex items-center justify-center mb-6 text-2xl">01</div>
            <h3 className="text-2xl font-bold mb-4">2-Mile Radius</h3>
            <p className="text-[#293241]/80 leading-relaxed">No cross-town commutes. We only match you with readers who live right around the corner.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#F4F1DE] text-[#E07A5F] rounded-lg flex items-center justify-center mb-6 text-2xl">02</div>
            <h3 className="text-2xl font-bold mb-4">Smart Matching</h3>
            <p className="text-[#293241]/80 leading-relaxed">Whether you love Fiction, Nonfiction, or Poetry, we pair you with people who share your specific taste.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#F4F1DE] text-[#E07A5F] rounded-lg flex items-center justify-center mb-6 text-2xl">03</div>
            <h3 className="text-2xl font-bold mb-4">Safe Meeting Zones</h3>
            <p className="text-[#293241]/80 leading-relaxed">No hosting stress. We partner with local indie bookstores and cafes as designated meeting spots.</p>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-24 px-6 md:px-12 bg-[#1B4332] text-[#F4F1DE]">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join your neighborhood's founding chapter.</h2>
          <p className="text-xl opacity-90">We're launching in high-density zip codes this Summer. Get on the list to lead or join a group near you.</p>
        </div>

        <div className="max-w-xl mx-auto bg-[#F4F1DE] p-8 md:p-12 rounded-2xl shadow-2xl text-[#293241]">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
              <h3 className="text-2xl font-bold mb-4 text-[#1B4332]">Successfully Bound!</h3>
              <p className="text-lg opacity-80">{message}</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-8 text-[#1B4332] font-bold border-b-2 border-[#1B4332]"
              >
                Sign up another person
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest mb-2 opacity-60">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Jane Doe"
                  className="w-full p-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest mb-2 opacity-60">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="reader@neighborhood.com"
                  className="w-full p-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2 opacity-60">Favorite Genre</label>
                  <select 
                    className="w-full p-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                    value={formData.favorite_genre}
                    onChange={(e) => setFormData({...formData, favorite_genre: e.target.value})}
                  >
                    <option value="fiction">Fiction</option>
                    <option value="nonfiction">Nonfiction</option>
                    <option value="poetry">Poetry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2 opacity-60">Neighborhood</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Williamsburg"
                    className="w-full p-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
                  />
                </div>
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded">{message}</p>
              )}

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-[#E07A5F] text-white py-4 rounded-lg font-bold text-xl hover:bg-[#d46a4f] transition-colors shadow-lg disabled:opacity-50"
              >
                {status === 'loading' ? 'Binding...' : 'Join the Waitlist'}
              </button>
              <p className="text-center text-xs opacity-50 italic">By joining, you agree to receive updates about ChapterBound launch in your area.</p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 bg-white text-center border-t border-[#F4F1DE]">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 bg-[#1B4332] rounded flex items-center justify-center text-white text-[10px] font-bold">C</div>
          <span className="text-lg font-bold tracking-tight text-[#1B4332]">ChapterBound</span>
        </div>
        <p className="text-[#293241]/60 text-sm">© 2026 ChapterBound. Built for the modern reader.</p>
        <div className="mt-4 flex justify-center gap-6 text-sm font-medium text-[#1B4332]/60">
          <a href="#" className="hover:text-[#1B4332]">Privacy</a>
          <a href="#" className="hover:text-[#1B4332]">Terms</a>
          <a href="mailto:samuel@baget.ai" className="hover:text-[#1B4332]">Contact</a>
        </div>
      </footer>
    </main>
  );
}
