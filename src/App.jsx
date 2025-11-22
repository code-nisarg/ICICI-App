import React, { useState, useEffect } from 'react';
import { 
  Home, Shield, Sparkles, ShoppingCart, HelpCircle, 
  ChevronRight, Heart, Car, Bike, Plane, Building, 
  Menu, Search, Bell, ArrowLeft, Check, Battery, Wifi, Signal
} from 'lucide-react';

/**
 * ICICI Lombard Mobile App Simulation
 * * Features:
 * - Permanent Phone Frame (iPhone Pro style)
 * - Dynamic Routing (Tabs + Sub-pages)
 * - Exact replication of Corporate Insurance cards
 * - Interactive UI elements (Horizontal scrolls, active states)
 */

const App = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('home');
  const [viewStack, setViewStack] = useState(['main']); // For nested navigation
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  // Update clock for status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Navigation Handlers
  const navigateToCategory = (category) => {
    setSelectedCategory(category);
    setViewStack([...viewStack, 'category_detail']);
  };

  const goBack = () => {
    const newStack = [...viewStack];
    newStack.pop();
    setViewStack(newStack);
    setTimeout(() => setSelectedCategory(null), 300); // Clear after transition
  };

  // --- SUB-COMPONENTS ---

  // 1. Status Bar
  const StatusBar = () => (
    <div className="flex justify-between items-center px-6 pt-3 pb-2 text-gray-900 z-50 relative bg-white/90 backdrop-blur-md rounded-t-[2.5rem]">
      <div className="font-semibold text-sm tracking-wide ml-2">{currentTime}</div>
      <div className="flex items-center gap-1.5 mr-2">
        <Signal size={14} strokeWidth={2.5} />
        <Wifi size={14} strokeWidth={2.5} />
        <Battery size={16} strokeWidth={2.5} />
      </div>
    </div>
  );

  // 2. Home Tab
  const HomeTab = () => (
    <div className="space-y-6 pb-24 animate-fade-in">
      {/* Header Profile Section */}
      <div className="px-5 pt-2">
        <div className="flex justify-between items-start mb-6">
           <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center border-2 border-orange-500 text-orange-600 font-bold text-lg">
                  YG
                </div>
                <div className="absolute -bottom-1 -right-1 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                  60%
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 leading-tight">Hello, Yash !</h1>
                <p className="text-xs text-gray-500">Complete your profile for easy claims</p>
              </div>
           </div>
           <div className="flex gap-3">
             <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer">
                <Bell size={20} />
             </div>
             <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer">
                <Menu size={20} />
             </div>
           </div>
        </div>

        {/* Search / Add Policy */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 flex items-center justify-between pl-4 pr-1.5 py-1.5 mb-6">
           <span className="text-gray-400 text-sm font-medium">Can't see your policy?</span>
           <button className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-orange-100 transition-colors">
             Add now +
           </button>
        </div>
      </div>

      {/* Spotlight Carousel */}
      <div>
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="font-bold text-lg text-gray-800">Under <span className="text-orange-600">spotlight</span></h2>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
          </div>
        </div>
        
        {/* Horizontal Scroll Container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory px-5 gap-4 pb-4 scrollbar-hide">
          {/* Card 1 */}
          <div className="snap-center shrink-0 w-[85%] bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-5 relative overflow-hidden shadow-sm border border-blue-100">
             <div className="relative z-10 w-2/3">
               <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2">Travel Smart, Stay <span className="text-orange-600">Safe!</span></h3>
               <p className="text-xs text-gray-500 mb-4">Explore freely while staying protected!</p>
               <button className="bg-orange-500 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md shadow-orange-500/30">
                 Buy Travel Insurance
               </button>
             </div>
             <img src="https://cdn-icons-png.flaticon.com/512/9187/9187963.png" className="absolute -right-4 bottom-0 w-32 h-32 object-contain opacity-90 drop-shadow-xl" alt="Travel" />
          </div>

          {/* Card 2 */}
          <div className="snap-center shrink-0 w-[85%] bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-5 relative overflow-hidden shadow-sm border border-orange-100">
             <div className="relative z-10 w-2/3">
               <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2">Protect Your <span className="text-orange-600">Health!</span></h3>
               <p className="text-xs text-gray-500 mb-4">Comprehensive coverage for family.</p>
               <button className="bg-orange-500 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md shadow-orange-500/30">
                 Get Quote
               </button>
             </div>
             <img src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png" className="absolute -right-4 -bottom-2 w-32 h-32 object-contain opacity-90 drop-shadow-xl" alt="Health" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5">
        <h2 className="font-bold text-lg text-gray-800 mb-4">Quick <span className="text-orange-600">actions</span></h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { title: 'Health records', sub: 'at your finger...', icon: '🩺', bg: 'bg-pink-50', arrow: 'bg-pink-500' },
            { title: 'Find local services', sub: 'near you', icon: '📍', bg: 'bg-indigo-50', arrow: 'bg-indigo-500' },
            { title: 'Manage claims', sub: 'at your ease', icon: '📝', bg: 'bg-cyan-50', arrow: 'bg-cyan-500' }
          ].map((item, i) => (
            <div key={i} className={`${item.bg} rounded-2xl p-4 flex flex-col justify-between h-36 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all`}>
              <div className="text-3xl mb-2">{item.icon}</div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1">{item.title}</h4>
                <p className="text-[10px] text-gray-500 leading-tight">{item.sub}</p>
              </div>
              <div className={`absolute bottom-3 right-3 w-6 h-6 ${item.arrow} rounded-full flex items-center justify-center`}>
                <ChevronRight size={14} className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 3. Buy Tab
  const BuyTab = () => (
    <div className="space-y-6 pb-24 animate-fade-in px-5 pt-4">
      <h1 className="text-2xl font-bold text-gray-800">Buy Insurance</h1>
      
      {/* Health */}
      <div className="relative group cursor-pointer">
        <div className="absolute -top-3 right-0 bg-blue-900 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl z-10 shadow-sm">
          0% GST on premium
        </div>
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 hover:border-orange-200 transition-colors">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-500">
            <Heart fill="currentColor" size={28} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Health Insurance</h3>
            <p className="text-xs text-gray-500">Complete protection for your family</p>
          </div>
        </div>
      </div>

      {/* Vehicle */}
      <div>
        <h3 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wider">Vehicle Insurance</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2 hover:shadow-md transition-all cursor-pointer">
             <Car size={32} className="text-orange-500 mb-1" />
             <span className="font-bold text-gray-800">Car Insurance</span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2 hover:shadow-md transition-all cursor-pointer">
             <Bike size={32} className="text-orange-500 mb-1" />
             <span className="font-bold text-gray-800">Bike Insurance</span>
          </div>
        </div>
      </div>

      {/* Travel */}
      <div className="relative group cursor-pointer">
        <div className="absolute -top-3 right-0 bg-blue-900 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl z-10 shadow-sm">
          0% GST on premium
        </div>
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 hover:border-orange-200 transition-colors">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
            <Plane fill="currentColor" size={28} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">TripSecure+</h3>
            <p className="text-xs text-gray-500">International & Domestic Travel</p>
          </div>
        </div>
      </div>

      {/* Other Products */}
      <div>
        <h3 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wider">Other Products</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2 hover:shadow-md transition-all cursor-pointer">
             <div className="text-3xl mb-1">🏠</div>
             <span className="font-bold text-gray-800">Home Insurance</span>
          </div>
          {/* Corporate Button - Triggers Nested Route */}
          <div 
            onClick={() => navigateToCategory('corporate')}
            className="bg-orange-50 p-4 rounded-2xl shadow-sm border-2 border-orange-200 flex flex-col items-center text-center gap-2 hover:shadow-md transition-all cursor-pointer active:scale-95"
          >
             <Building size={32} className="text-orange-600 mb-1" />
             <span className="font-bold text-gray-800">Retail & Corporate</span>
          </div>
        </div>
      </div>
    </div>
  );

  // 4. Corporate Details View (Nested)
  const CorporateView = () => (
    <div className="bg-gray-50 min-h-full animate-slide-up">
      {/* Header */}
      <div className="sticky top-0 bg-white z-40 px-5 py-4 flex items-center gap-4 shadow-sm">
        <button onClick={goBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h2 className="text-lg font-bold text-gray-800">Corporate/SME Insurance</h2>
      </div>

      {/* Banner */}
      <div className="bg-orange-50 px-5 py-3 text-center border-b border-orange-100">
        <p className="text-orange-600 font-bold text-sm">0% GST on the premium</p>
      </div>

      {/* Content */}
      <div className="p-5 space-y-5 pb-28">
        
        {/* Card 1: ServiceGuard+ */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-gray-900">ServiceGuard+</h3>
            <span className="bg-[#0a1e45] text-white text-[10px] font-bold px-3 py-1.5 rounded-full">Most popular</span>
          </div>
          <p className="text-sm text-gray-500 mb-5 leading-relaxed">
            Smart equipment protection for service-sector SMEs such as diagnostic centers, gyms, clinics, labs and studios.
          </p>
          <div className="space-y-3 mb-6">
            {[
              'Covers equipment breakdown & cyber risks in simple modular packages',
              'Real-time IoT monitoring for early alerts and faster claim validation',
              'Quick payouts for minor claims and premiums that scale with business usage'
            ].map((text, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="mt-1 min-w-[16px]"><Check size={16} className="text-green-500" strokeWidth={3} /></div>
                <p className="text-xs font-medium text-gray-600 leading-snug">{text}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-2.5 text-orange-600 font-bold text-sm rounded-full border-2 border-orange-100 hover:bg-orange-50">Know more</button>
            <button className="flex-1 py-2.5 bg-orange-500 text-white font-bold text-sm rounded-full shadow-lg shadow-orange-200 active:bg-orange-600">Buy now</button>
          </div>
        </div>

        {/* Card 2: Supply Shield Pro */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Supply Shield Pro</h3>
          <p className="text-sm text-gray-500 mb-5 leading-relaxed">
            End-to-end supply-chain protection for manufacturing SMEs dependent on key suppliers and logistics partners.
          </p>
          <div className="space-y-3 mb-6">
            {[
              'Tier-based cover for 3/5 suppliers, logistics and raw-material price risks',
              'Loss-of-profit protection with emergency working-capital support',
              'Fully digital claim process enabled via GST/bank APIs for quick settlement'
            ].map((text, i) => (
              <div key={i} className="flex gap-3 items-start">
                 <div className="mt-1 min-w-[16px]"><Check size={16} className="text-green-500" strokeWidth={3} /></div>
                <p className="text-xs font-medium text-gray-600 leading-snug">{text}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-2.5 text-orange-600 font-bold text-sm rounded-full border-2 border-orange-100 hover:bg-orange-50">Know more</button>
            <button className="flex-1 py-2.5 bg-orange-500 text-white font-bold text-sm rounded-full shadow-lg shadow-orange-200 active:bg-orange-600">Buy now</button>
          </div>
        </div>

        {/* Card 3: EILI */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">Environmental Impairment Liability (EILI)</h3>
          <p className="text-sm text-gray-500 mb-5 mt-2 leading-relaxed">
            Environmental liability cover for SMEs exposed to pollution, leakage or regulatory risk.
          </p>
          <div className="space-y-3 mb-6">
            {[
              'Covers sudden/gradual pollution, cleanup, third-party damage & fines',
              'Flexible limits tailored for small & medium manufacturers',
              'Discounts for compliant facilities (ETP/ISO) and optional add-on protections'
            ].map((text, i) => (
              <div key={i} className="flex gap-3 items-start">
                 <div className="mt-1 min-w-[16px]"><Check size={16} className="text-green-500" strokeWidth={3} /></div>
                <p className="text-xs font-medium text-gray-600 leading-snug">{text}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-2.5 text-orange-600 font-bold text-sm rounded-full border-2 border-orange-100 hover:bg-orange-50">Know more</button>
            <button className="flex-1 py-2.5 bg-orange-500 text-white font-bold text-sm rounded-full shadow-lg shadow-orange-200 active:bg-orange-600">Buy now</button>
          </div>
        </div>
      </div>
    </div>
  );

  // 5. Help Tab
  const HelpTab = () => (
    <div className="space-y-6 pb-24 animate-fade-in px-5 pt-4">
       <h1 className="text-2xl font-bold text-gray-800 mb-6">Help Center</h1>
       
       <div className="grid grid-cols-2 gap-4">
         {/* FAQ */}
         <div className="bg-blue-50 p-5 rounded-2xl relative group cursor-pointer hover:bg-blue-100 transition-colors">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold mb-4 shadow-lg shadow-blue-200">FAQ</div>
            <h3 className="font-bold text-gray-800 mb-1">Frequency Asked Questions</h3>
            <p className="text-xs text-gray-500 mb-4">Find answers to your queries</p>
            <div className="absolute bottom-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <ChevronRight size={14} />
            </div>
         </div>
         
         {/* ASK RIA */}
         <div className="bg-orange-50 p-5 rounded-2xl relative group cursor-pointer hover:bg-orange-100 transition-colors">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white text-xl mb-4 shadow-lg shadow-orange-200">🤖</div>
            <h3 className="font-bold text-gray-800 mb-1">Ask RIA</h3>
            <p className="text-xs text-gray-500 mb-4">Ask your queries to our chatbot</p>
            <div className="absolute bottom-4 right-4 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white">
              <ChevronRight size={14} />
            </div>
         </div>
       </div>

       {/* Contact Card */}
       <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
          <h3 className="font-bold text-gray-800 mb-4">Get in touch</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">📞</div>
              <div>
                <p className="text-xs text-gray-500">Customer Care</p>
                <p className="font-bold text-gray-800">1800-266-7766</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">✉️</div>
              <div>
                <p className="text-xs text-gray-500">Email Support</p>
                <p className="font-bold text-gray-800">care@icicilombard.com</p>
              </div>
            </div>
          </div>
       </div>
    </div>
  );

  // 6. Render Current View
  const renderContent = () => {
    // If sub-view exists (like Corporate detail), show that on top
    if (viewStack[viewStack.length - 1] === 'category_detail' && selectedCategory === 'corporate') {
      return <CorporateView />;
    }

    // Otherwise standard tabs
    switch(activeTab) {
      case 'home': return <HomeTab />;
      case 'buy': return <BuyTab />;
      case 'help': return <HelpTab />;
      case 'policies': 
        return (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center pb-32">
            <Shield size={64} className="text-gray-200 mb-4" />
            <h2 className="text-xl font-bold text-gray-400">No Active Policies</h2>
            <button onClick={() => setActiveTab('buy')} className="mt-4 text-orange-600 font-semibold">Buy a policy now</button>
          </div>
        );
      case 'benefits': 
        return (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center pb-32">
            <Sparkles size={64} className="text-gray-200 mb-4" />
            <h2 className="text-xl font-bold text-gray-400">Rewards Program</h2>
            <p className="text-sm text-gray-400 mt-2">Coming soon...</p>
          </div>
        );
      default: return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1c1e] flex items-center justify-center p-4 lg:p-10 font-sans antialiased overflow-hidden">
      {/* Desktop Background Hints */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop')] bg-cover opacity-20 blur-3xl pointer-events-none"></div>

      {/* THE PHONE FRAME */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-white rounded-[3rem] shadow-2xl border-[8px] border-[#1a1a1a] ring ring-gray-800/50 overflow-hidden flex flex-col">
        
        {/* Notch / Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-3xl z-[60]"></div>
        
        {/* Status Bar */}
        <StatusBar />

        {/* Main Content Scroll Area */}
        <div className="flex-1 overflow-y-auto bg-white scroll-smooth no-scrollbar relative">
          {renderContent()}
        </div>

        {/* Bottom Navigation Bar - Only show if not in deep sub-view (optional, but mimicking real apps often hides nav on deep detail pages, keeping it here for ease) */}
        <div className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 px-2 py-1 pb-6 z-50 transition-transform duration-300 ${viewStack.length > 1 ? 'translate-y-full' : 'translate-y-0'}`}>
          <div className="flex justify-around items-center">
             {[
                { id: 'home', icon: Home, label: 'Home' },
                { id: 'policies', icon: Shield, label: 'Policies' },
                { id: 'benefits', icon: Sparkles, label: 'Benefits' },
                { id: 'buy', icon: ShoppingCart, label: 'Buy' },
                { id: 'help', icon: HelpCircle, label: 'Help' },
             ].map((tab) => (
               <button 
                 key={tab.id}
                 onClick={() => { setActiveTab(tab.id); setViewStack(['main']); }}
                 className={`flex flex-col items-center gap-1 p-2 w-16 rounded-xl transition-all duration-300 ${activeTab === tab.id ? 'text-orange-600 -translate-y-1' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                 <span className="text-[10px] font-medium">{tab.label}</span>
               </button>
             ))}
          </div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full"></div>
        </div>

      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;