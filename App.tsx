import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import BMIPage from './pages/BMIPage';
import BMRPage from './pages/BMRPage';
import WaterTracker from './pages/WaterTracker';
import SymptomChecker from './pages/SymptomChecker';
import CalorieCalculator from './pages/CalorieCalculator';
import ExerciseTracker from './pages/ExerciseTracker';
import HealthArticle from './pages/HealthArticle';
import DailySuggestions from './pages/DailySuggestions';
import AIChat from './pages/AIChat';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = ({ user, onLogout }: { user: User | null, onLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  if (!user && (location.pathname === '/' || location.pathname === '/auth')) {
    return null; 
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center gap-2 group">
              <div className="bg-teal-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 tracking-tight">HealthXRay</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/dashboard" className={`${location.pathname === '/dashboard' ? 'text-teal-600 font-bold' : 'text-slate-600 font-medium'} hover:text-teal-500 transition`}>Dashboard</Link>
            <Link to="/chat" className={`${location.pathname === '/chat' ? 'text-teal-600 font-bold' : 'text-slate-600 font-medium'} hover:text-teal-500 transition`}>AI Chat</Link>
            <Link to="/daily-suggestions" className={`${location.pathname === '/daily-suggestions' ? 'text-teal-600 font-bold' : 'text-slate-600 font-medium'} hover:text-teal-500 transition`}>Daily Tips</Link>
            <button onClick={onLogout} className="text-slate-500 hover:text-rose-600 text-sm font-semibold transition">Logout</button>
            <Link to="/articles" className="bg-teal-600 text-white px-5 py-2.5 rounded-full hover:bg-teal-700 transition shadow-lg shadow-teal-100 font-bold text-sm">Explore Library</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden absolute w-full bg-white border-b border-slate-100 shadow-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-4 space-y-2">
          <Link to="/dashboard" className={`block p-3 rounded-xl font-bold ${location.pathname === '/dashboard' ? 'bg-teal-50 text-teal-600' : 'text-slate-700'}`}>Dashboard</Link>
          <Link to="/chat" className={`block p-3 rounded-xl font-bold ${location.pathname === '/chat' ? 'bg-teal-50 text-teal-600' : 'text-slate-700'}`}>AI Chat</Link>
          <Link to="/daily-suggestions" className={`block p-3 rounded-xl font-bold ${location.pathname === '/daily-suggestions' ? 'bg-teal-50 text-teal-600' : 'text-slate-700'}`}>Daily Tips</Link>
          <button onClick={onLogout} className="block w-full text-left p-3 rounded-xl text-rose-600 font-bold">Logout</button>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white py-16 mt-auto">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-teal-500 p-1.5 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="text-2xl font-bold">HealthXRay</span>
        </div>
        <p className="text-slate-400 max-w-sm leading-relaxed mb-6 font-medium">
          Professional health analysis powered by specialized AI models. Empowering your wellness journey with data-driven medical insights.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-teal-400 uppercase tracking-widest text-xs">Resources</h4>
        <ul className="space-y-4 text-slate-300 text-sm font-semibold">
          <li><Link to="/articles" className="hover:text-teal-400 transition">Medical Library</Link></li>
          <li><Link to="/contact" className="hover:text-teal-400 transition">Contact Us</Link></li>
          <li><Link to="/daily-suggestions" className="hover:text-teal-400 transition">Wellness Tips</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-teal-400 uppercase tracking-widest text-xs">Legal</h4>
        <ul className="space-y-4 text-slate-300 text-sm font-semibold">
          <li><Link to="/privacy" className="hover:text-teal-400 transition">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:text-teal-400 transition">Terms of Service</Link></li>
          <li><Link to="/contact" className="hover:text-teal-400 transition">Support</Link></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
      © {new Date().getFullYear()} HealthXRay. Built with Professional Clinical Standards.
    </div>
  </footer>
);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time Firebase Auth listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin" />
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Verifying Identity...</p>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-teal-100 selection:text-teal-900">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
            <Route path="/auth" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
            <Route path="/dashboard" element={user ? <Home /> : <Navigate to="/auth" replace />} />
            <Route path="/bmi" element={user ? <BMIPage /> : <Navigate to="/auth" replace />} />
            <Route path="/bmr" element={user ? <BMRPage /> : <Navigate to="/auth" replace />} />
            <Route path="/water" element={user ? <WaterTracker /> : <Navigate to="/auth" replace />} />
            <Route path="/symptoms" element={user ? <SymptomChecker /> : <Navigate to="/auth" replace />} />
            <Route path="/calories" element={user ? <CalorieCalculator /> : <Navigate to="/auth" replace />} />
            <Route path="/exercise-tracker" element={user ? <ExerciseTracker /> : <Navigate to="/auth" replace />} />
            <Route path="/articles" element={user ? <HealthArticle /> : <Navigate to="/auth" replace />} />
            <Route path="/daily-suggestions" element={user ? <DailySuggestions /> : <Navigate to="/auth" replace />} />
            <Route path="/chat" element={user ? <AIChat /> : <Navigate to="/auth" replace />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}