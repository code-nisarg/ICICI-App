import React, { useState, useEffect } from 'react';
import { 
  Home, Shield, Sparkles, ShoppingCart, HelpCircle, 
  ChevronRight, Heart, Car, Bike, Plane, Building, 
  Menu, Bell, ArrowLeft, Check, Battery, Wifi, Signal,
  FileText, ShieldCheck, PhoneCall, X, ChevronDown, Info
} from 'lucide-react';

/**
 * ICICI Lombard Mobile App Simulation v2
 * Updates: 
 * - Functional "Know More" with Accordion details
 * - "Contact Now" Modal implementation
 * - Detailed Content Integration for Corporate Products
 */

// --- DATA: PRODUCT DETAILS ---
const PRODUCT_DATA = {
  serviceGuard: {
    title: "ServiceGuard+",
    tag: "Most popular",
    headline: "Smart Protection for Your Business Critical Equipment.",
    subheading: "Don’t let equipment breakdown halt your revenue. Get IoT enabled monitoring and instant repair coverage.",
    sections: [
      {
        id: 'covered',
        title: "✅ What is Covered?",
        content: (
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <span className="font-bold text-gray-800 block mb-1">MedEquip Protect</span>
              <p className="text-xs text-gray-600">Covers Radiation, X-ray, Ultrasound, ECG, and Pathology equipment. Includes calibration loss and software failure.</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <span className="font-bold text-gray-800 block mb-1">FoodTech Guard</span>
              <p className="text-xs text-gray-600">Covers commercial ovens, fridges, dishwashers, and POS systems.</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <span className="font-bold text-gray-800 block mb-1">FitEquip Cover</span>
              <p className="text-xs text-gray-600">Covers treadmills, strength training rigs, and AC systems.</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <span className="font-bold text-gray-800 block mb-1">WorkSpace Protect</span>
              <p className="text-xs text-gray-600">Covers servers, networking gear, and power backups.</p>
            </div>
          </div>
        )
      },
      {
        id: 'not_covered',
        title: "❌ What is Not Covered?",
        content: (
          <ul className="list-disc pl-5 space-y-2 text-xs text-gray-600">
            <li>Routine wear and tear without breakdown.</li>
            <li>Damage due to willful negligence.</li>
            <li>Cosmetic damage (scratches/dents) that doesn't affect functionality.</li>
          </ul>
        )
      }
    ]
  },
  supplyShield: {
    title: "Supply Shield Pro",
    headline: "End to End Supply Chain Protection.",
    subheading: "Vendor bankruptcy? Logistics failure? We protect your profits when your supply chain breaks.",
    sections: [
      {
        id: 'highlights',
        title: "🛡️ Plan Highlights",
        content: (
          <div className="space-y-3">
             <div className="flex gap-2 text-xs text-gray-600"><span className="font-bold text-gray-800 min-w-[80px]">No Paperwork:</span> AI-based risk assessment using GST data.</div>
             <div className="flex gap-2 text-xs text-gray-600"><span className="font-bold text-gray-800 min-w-[80px]">Emergency Capital:</span> Get a 30% claim advance within 7 days.</div>
             <div className="flex gap-2 text-xs text-gray-600"><span className="font-bold text-gray-800 min-w-[80px]">Non-Physical Damage:</span> Covers supplier bankruptcy shutdowns.</div>
          </div>
        )
      },
      {
        id: 'tiers',
        title: "✅ Choose Your Tier",
        content: (
          <div className="space-y-2">
            <div className="bg-blue-50 p-2 rounded-lg text-xs border border-blue-100"><span className="font-bold text-blue-800">Tier 1 (Basic):</span> Top 3 Critical Suppliers.</div>
            <div className="bg-orange-50 p-2 rounded-lg text-xs border border-orange-100"><span className="font-bold text-orange-800">Tier 2 (Standard):</span> Top 5 Suppliers + Logistics.</div>
            <div className="bg-green-50 p-2 rounded-lg text-xs border border-green-100"><span className="font-bold text-green-800">Tier 3 (Comprehensive):</span> Majority coverage + Raw material price spikes.</div>
          </div>
        )
      },
      {
        id: 'payouts',
        title: "💰 What We Pay For",
        content: (
          <ul className="list-disc pl-5 space-y-2 text-xs text-gray-600">
            <li><span className="font-bold">Loss of Profit:</span> Income lost due to material unavailability.</li>
            <li><span className="font-bold">Waiting Period:</span> Coverage kicks in after 48 hours.</li>
            <li><span className="font-bold">Contingent Business Interruption:</span> Expenses to find alt suppliers.</li>
          </ul>
        )
      },
      {
        id: 'not_covered',
        title: "❌ What is Not Covered?",
        content: (
          <ul className="list-disc pl-5 space-y-2 text-xs text-gray-600">
             <li>Disruptions lasting less than 48 hours.</li>
             <li>Strikes or labor union actions at your own facility.</li>
             <li>Supply shortages caused by international wars (unless specified).</li>
          </ul>
        )
      }
    ]
  },
  eili: {
    title: "Environmental Impairment Liability",
    headline: "Future Proof Your Business Against Green Liabilities.",
    subheading: "Comprehensive coverage for pollution risks, NGT penalties, and cleanup costs.",
    sections: [
      {
        id: 'why',
        title: "🛡️ Why You Need This?",
        content: (
          <div className="space-y-2 text-xs text-gray-600">
             <p><span className="font-bold text-gray-800">Regulatory Shield:</span> Covers penalties by NGT and Pollution Control Boards.</p>
             <p><span className="font-bold text-gray-800">Green Compliance:</span> Essential for EPR and hazardous waste rules.</p>
          </div>
        )
      },
      {
        id: 'covered',
        title: "✅ What is Covered?",
        content: (
           <ul className="space-y-2 text-xs text-gray-600">
             <li className="flex gap-2"><Check size={14} className="text-green-500 mt-0.5 shrink-0" /> Covers third-party bodily injury/property damage.</li>
             <li className="flex gap-2"><Check size={14} className="text-green-500 mt-0.5 shrink-0" /> Pays for removal of pollutants (soil, water, air).</li>
             <li className="flex gap-2"><Check size={14} className="text-green-500 mt-0.5 shrink-0" /> Covers both Sudden spills and Gradual seepage.</li>
             <li className="flex gap-2"><Check size={14} className="text-green-500 mt-0.5 shrink-0" /> Legal defense costs.</li>
           </ul>
        )
      },
      {
        id: 'addons',
        title: "➕ Smart Add-Ons & Discounts",
        content: (
          <div className="space-y-3 text-xs">
            <div className="bg-purple-50 p-2 rounded-lg text-purple-900 border border-purple-100">
              <span className="font-bold">Add-ons:</span> Historic Contamination coverage & Business Interruption.
            </div>
            <div className="bg-green-50 p-2 rounded-lg text-green-900 border border-green-100">
              <span className="font-bold">Discounts:</span> Up to 10% off for ISO 14001 certification.
            </div>
          </div>
        )
      },
      {
        id: 'exclusions',
        title: "❌ Exclusions",
        content: (
          <p className="text-xs text-gray-500">Intentional acts, Normal wear & tear, Radioactive risks, War & Terrorism.</p>
        )
      }
    ]
  }
};

const App = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('home');
  const [viewStack, setViewStack] = useState(['main']); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeProductDetail, setActiveProductDetail] = useState(null); // For Know More
  const [showContactModal, setShowContactModal] = useState(false); // For Contact Now
  const [currentTime, setCurrentTime] = useState('');

  // Clock
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

  // Navigation
  const navigateToCategory = (category) => {
    setSelectedCategory(category);
    setViewStack([...viewStack, 'category_detail']);
  };

  const openProductDetail = (productKey) => {
    setActiveProductDetail(productKey);
    setViewStack([...viewStack, 'product_detail']);
  };

  const goBack = () => {
    const newStack = [...viewStack];
    newStack.pop();
    setViewStack(newStack);
    
    // Clean up specific states based on where we are coming from
    if (activeProductDetail) {
      setTimeout(() => setActiveProductDetail(null), 300);
    } else {
      setTimeout(() => setSelectedCategory(null), 300);
    }
  };

  // --- SUB-COMPONENTS ---

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

  // Accordion Component for Know More
  const AccordionItem = ({ title, content, isOpen, onClick }) => (
    <div className="border border-gray-100 rounded-xl bg-white overflow-hidden mb-3 shadow-sm">
      <button 
        onClick={onClick}
        className="w-full flex justify-between items-center p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors"
      >
        <span className="font-bold text-gray-800 text-sm">{title}</span>
        <ChevronDown size={18} className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 pt-0 text-sm border-t border-gray-100">
           <div className="pt-4">{content}</div>
        </div>
      </div>
    </div>
  );

  // The "Contact Now" Popup Modal
  const ContactModal = () => {
    if (!showContactModal) return null;
    return (
      <div className="absolute inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fade-in">
        <div className="bg-white w-full sm:w-[90%] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-slide-up mx-2 mb-2 sm:mb-0">
          
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-green-100 p-1 rounded-full">
              <Check size={16} className="text-green-600" strokeWidth={3} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Information</h2>
            <button onClick={() => setShowContactModal(false)} className="ml-auto p-2 bg-gray-100 rounded-full">
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-6">How does this <span className="text-orange-600">work</span></h3>

          <div className="space-y-6 relative">
            {/* Connecting Line */}
            <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-gray-100 -z-10"></div>

            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center shrink-0 z-10">
                <FileText className="text-white" size={20} />
              </div>
              <div className="pt-1">
                <h4 className="font-bold text-gray-800 text-lg">Step 1</h4>
                <p className="text-sm text-gray-500">Fill in your details</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center shrink-0 z-10">
                <ShieldCheck className="text-white" size={20} />
              </div>
              <div className="pt-1">
                <h4 className="font-bold text-gray-800 text-lg">Step 2</h4>
                <p className="text-sm text-gray-500">Submit your request</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-yellow-500 rounded-xl shadow-lg shadow-yellow-200 flex items-center justify-center shrink-0 z-10">
                <PhoneCall className="text-white" size={20} />
              </div>
              <div className="pt-1">
                <h4 className="font-bold text-gray-800 text-lg">Step 3</h4>
                <p className="text-sm text-gray-500 leading-snug">
                  Our executive will get in touch with you to explain the features of our other product offerings
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 mb-6 p-3 bg-orange-50 rounded-xl border border-orange-100">
             <p className="text-[10px] text-gray-600 leading-tight">
               <span className="font-bold text-orange-600">Note:</span> This will be a sales related call only, in case of any service related issue please reach out to our toll free number <span className="underline decoration-orange-300">1800 2666</span>
             </p>
          </div>

          <button 
            onClick={() => { setShowContactModal(false); alert("Request Submitted!"); }}
            className="w-full bg-[#EA580C] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-200 active:scale-95 transition-transform"
          >
            Proceed
          </button>
        </div>
      </div>
    );
  };

  // 4. Product Detail Page (The "Know More" View)
  const ProductDetailView = () => {
    const data = PRODUCT_DATA[activeProductDetail];
    const [expanded, setExpanded] = useState(data.sections[0].id);

    if (!data) return null;

    return (
      <div className="bg-gray-50 min-h-full animate-slide-up pb-24">
        {/* Header */}
        <div className="sticky top-0 bg-white z-40 px-5 py-4 flex items-center gap-4 shadow-sm">
          <button onClick={goBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h2 className="text-lg font-bold text-gray-800">{data.title}</h2>
        </div>

        {/* Hero */}
        <div className="p-6 bg-white mb-4 shadow-sm rounded-b-3xl">
          {data.tag && <span className="bg-blue-900 text-white text-[10px] font-bold px-3 py-1 rounded-full mb-3 inline-block">{data.tag}</span>}
          <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{data.headline}</h1>
          <p className="text-sm text-gray-500">{data.subheading}</p>
        </div>

        {/* Accordions */}
        <div className="px-5">
           <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">Product Details</h3>
           {data.sections.map((section) => (
             <AccordionItem 
               key={section.id}
               title={section.title}
               content={section.content}
               isOpen={expanded === section.id}
               onClick={() => setExpanded(expanded === section.id ? null : section.id)}
             />
           ))}
        </div>

        {/* CTA Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 flex gap-3 z-30">
          <button 
             onClick={() => setShowContactModal(true)}
             className="flex-1 bg-orange-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-200 active:scale-95 transition-transform"
          >
            Contact Now
          </button>
        </div>
      </div>
    );
  };

  // ... (Previous Tab Components: HomeTab, BuyTab, etc. kept largely the same)

  const HomeTab = () => (
    <div className="space-y-6 pb-24 animate-fade-in">
      <div className="px-5 pt-2">
        <div className="flex justify-between items-start mb-6">
           <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center border-2 border-orange-500 text-orange-600 font-bold text-lg">YG</div>
                <div className="absolute -bottom-1 -right-1 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">60%</div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 leading-tight">Hello, Yash !</h1>
                <p className="text-xs text-gray-500">Complete your profile for easy claims</p>
              </div>
           </div>
           <div className="flex gap-3">
             <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"><Bell size={20} /></div>
             <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"><Menu size={20} /></div>
           </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 flex items-center justify-between pl-4 pr-1.5 py-1.5 mb-6">
           <span className="text-gray-400 text-sm font-medium">Can't see your policy?</span>
           <button className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-orange-100 transition-colors">Add now +</button>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="font-bold text-lg text-gray-800">Under <span className="text-orange-600">spotlight</span></h2>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
          </div>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory px-5 gap-4 pb-4 scrollbar-hide">
          <div className="snap-center shrink-0 w-[85%] bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-5 relative overflow-hidden shadow-sm border border-blue-100">
             <div className="relative z-10 w-2/3">
               <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2">Travel Smart, Stay <span className="text-orange-600">Safe!</span></h3>
               <p className="text-xs text-gray-500 mb-4">Explore freely while staying protected!</p>
               <button className="bg-orange-500 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md shadow-orange-500/30">Buy Travel Insurance</button>
             </div>
             <img src="https://cdn-icons-png.flaticon.com/512/9187/9187963.png" className="absolute -right-4 bottom-0 w-32 h-32 object-contain opacity-90 drop-shadow-xl" alt="Travel" />
          </div>
          <div className="snap-center shrink-0 w-[85%] bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-5 relative overflow-hidden shadow-sm border border-orange-100">
             <div className="relative z-10 w-2/3">
               <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2">Protect Your <span className="text-orange-600">Health!</span></h3>
               <p className="text-xs text-gray-500 mb-4">Comprehensive coverage for family.</p>
               <button className="bg-orange-500 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md shadow-orange-500/30">Get Quote</button>
             </div>
             <img src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png" className="absolute -right-4 -bottom-2 w-32 h-32 object-contain opacity-90 drop-shadow-xl" alt="Health" />
          </div>
        </div>
      </div>
      <div className="px-5">
        <h2 className="font-bold text-lg text-gray-800 mb-4">Quick <span className="text-orange-600">actions</span></h2>
        <div className="grid grid-cols-3 gap-3">
          {[{ title: 'Health records', sub: 'at your finger...', icon: '🩺', bg: 'bg-pink-50', arrow: 'bg-pink-500' },
            { title: 'Find local services', sub: 'near you', icon: '📍', bg: 'bg-indigo-50', arrow: 'bg-indigo-500' },
            { title: 'Manage claims', sub: 'at your ease', icon: '📝', bg: 'bg-cyan-50', arrow: 'bg-cyan-500' },
            { title: 'SME Insurance', sub: '', icon: '📝', bg: 'bg-green-50', arrow: 'bg-cyan-500' }
          ].map((item, i) => (
            <div key={i} className={`${item.bg} rounded-2xl p-4 flex flex-col justify-between h-36 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all`}>
              <div className="text-3xl mb-2">{item.icon}</div>
              <div><h4 className="font-bold text-gray-800 text-sm leading-tight mb-1">{item.title}</h4><p className="text-[10px] text-gray-500 leading-tight">{item.sub}</p></div>
              <div className={`absolute bottom-3 right-3 w-6 h-6 ${item.arrow} rounded-full flex items-center justify-center`}><ChevronRight size={14} className="text-white" /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BuyTab = () => (
    <div className="space-y-6 pb-24 animate-fade-in px-5 pt-4">
      <h1 className="text-2xl font-bold text-gray-800">Buy Insurance</h1>
      <div className="relative group cursor-pointer">
        <div className="absolute -top-3 right-0 bg-blue-900 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl z-10 shadow-sm">0% GST on premium</div>
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 hover:border-orange-200 transition-colors">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-500"><Heart fill="currentColor" size={28} /></div>
          <div><h3 className="font-bold text-gray-800 text-lg">Health Insurance</h3><p className="text-xs text-gray-500">Complete protection for your family</p></div>
        </div>
      </div>
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
      <div className="relative group cursor-pointer">
        <div className="absolute -top-3 right-0 bg-blue-900 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl z-10 shadow-sm">0% GST on premium</div>
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 hover:border-orange-200 transition-colors">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-500"><Plane fill="currentColor" size={28} /></div>
          <div><h3 className="font-bold text-gray-800 text-lg">TripSecure+</h3><p className="text-xs text-gray-500">International & Domestic Travel</p></div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wider">Other Products</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2 hover:shadow-md transition-all cursor-pointer">
             <div className="text-3xl mb-1">🏠</div>
             <span className="font-bold text-gray-800">Home Insurance</span>
          </div>
          <div 
            onClick={() => navigateToCategory('corporate')}
            className="bg-orange-50 p-4 rounded-2xl shadow-sm border-2 border-orange-200 flex flex-col items-center text-center gap-2 hover:shadow-md transition-all cursor-pointer active:scale-95"
          >
             <Building size={32} className="text-orange-600 mb-1" />
             <span className="font-bold text-gray-800">SME Insurance</span>
          </div>
        </div>
      </div>
    </div>
  );

  const CorporateView = () => (
    <div className="bg-gray-50 min-h-full animate-slide-up">
      <div className="sticky top-0 bg-white z-40 px-5 py-4 flex items-center gap-4 shadow-sm">
        <button onClick={goBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={24} className="text-gray-700" /></button>
        <h2 className="text-lg font-bold text-gray-800">Corporate/SME Insurance</h2>
      </div>
      <div className="bg-orange-50 px-5 py-3 text-center border-b border-orange-100"><p className="text-orange-600 font-bold text-sm">0% GST on the premium</p></div>
      <div className="p-5 space-y-5 pb-28">
        
        {/* ServiceGuard+ */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-gray-900">ServiceGuard+</h3>
            <span className="bg-[#0a1e45] text-white text-[10px] font-bold px-3 py-1.5 rounded-full">Most popular</span>
          </div>
          <p className="text-sm text-gray-500 mb-5 leading-relaxed">Smart equipment protection for service-sector SMEs such as diagnostic centers, gyms, clinics, labs and studios.</p>
          <div className="space-y-3 mb-6">
            <div className="flex gap-3 items-start"><div className="mt-1 min-w-[16px]"><Check size={16} className="text-green-500" strokeWidth={3} /></div><p className="text-xs font-medium text-gray-600 leading-snug">Covers equipment breakdown & cyber risks in simple modular packages</p></div>
            <div className="flex gap-3 items-start"><div className="mt-1 min-w-[16px]"><Check size={16} className="text-green-500" strokeWidth={3} /></div><p className="text-xs font-medium text-gray-600 leading-snug">Real-time IoT monitoring for early alerts and faster claim validation</p></div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => openProductDetail('serviceGuard')} className="flex-1 py-2.5 text-orange-600 font-bold text-sm rounded-full border-2 border-orange-100 hover:bg-orange-50">Know more</button>
            <button onClick={() => setShowContactModal(true)} className="flex-1 py-2.5 bg-orange-500 text-white font-bold text-sm rounded-full shadow-lg shadow-orange-200 active:bg-orange-600">Contact now</button>
          </div>
        </div>

        {/* Supply Shield Pro */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Supply Shield Pro</h3>
          <p className="text-sm text-gray-500 mb-5 leading-relaxed">End-to-end supply-chain protection for manufacturing SMEs dependent on key suppliers and logistics partners.</p>
          <div className="space-y-3 mb-6">
            <div className="flex gap-3 items-start"><div className="mt-1 min-w-[16px]"><Check size={16} className="text-green-500" strokeWidth={3} /></div><p className="text-xs font-medium text-gray-600 leading-snug">Tier-based cover for 3/5 suppliers, logistics and raw-material price risks</p></div>
            <div className="flex gap-3 items-start"><div className="mt-1 min-w-[16px]"><Check size={16} className="text-green-500" strokeWidth={3} /></div><p className="text-xs font-medium text-gray-600 leading-snug">Loss-of-profit protection with emergency working-capital support</p></div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => openProductDetail('supplyShield')} className="flex-1 py-2.5 text-orange-600 font-bold text-sm rounded-full border-2 border-orange-100 hover:bg-orange-50">Know more</button>
            <button onClick={() => setShowContactModal(true)} className="flex-1 py-2.5 bg-orange-500 text-white font-bold text-sm rounded-full shadow-lg shadow-orange-200 active:bg-orange-600">Contact now</button>
          </div>
        </div>

        {/* EILI */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">Environmental Impairment Liability (EILI)</h3>
          <p className="text-sm text-gray-500 mb-5 mt-2 leading-relaxed">Environmental liability cover for SMEs exposed to pollution, leakage or regulatory risk.</p>
          <div className="space-y-3 mb-6">
            <div className="flex gap-3 items-start"><div className="mt-1 min-w-[16px]"><Check size={16} className="text-green-500" strokeWidth={3} /></div><p className="text-xs font-medium text-gray-600 leading-snug">Covers sudden/gradual pollution, cleanup, third-party damage & fines</p></div>
            <div className="flex gap-3 items-start"><div className="mt-1 min-w-[16px]"><Check size={16} className="text-green-500" strokeWidth={3} /></div><p className="text-xs font-medium text-gray-600 leading-snug">Flexible limits tailored for small & medium manufacturers</p></div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => openProductDetail('eili')} className="flex-1 py-2.5 text-orange-600 font-bold text-sm rounded-full border-2 border-orange-100 hover:bg-orange-50">Know more</button>
            <button onClick={() => setShowContactModal(true)} className="flex-1 py-2.5 bg-orange-500 text-white font-bold text-sm rounded-full shadow-lg shadow-orange-200 active:bg-orange-600">Contact now</button>
          </div>
        </div>
      </div>
    </div>
  );

  const HelpTab = () => (
    <div className="space-y-6 pb-24 animate-fade-in px-5 pt-4">
       <h1 className="text-2xl font-bold text-gray-800 mb-6">Help Center</h1>
       <div className="grid grid-cols-2 gap-4">
         <div className="bg-blue-50 p-5 rounded-2xl relative group cursor-pointer hover:bg-blue-100 transition-colors">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold mb-4 shadow-lg shadow-blue-200">FAQ</div>
            <h3 className="font-bold text-gray-800 mb-1">Frequency Asked Questions</h3>
            <p className="text-xs text-gray-500 mb-4">Find answers to your queries</p>
            <div className="absolute bottom-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white"><ChevronRight size={14} /></div>
         </div>
         <div className="bg-orange-50 p-5 rounded-2xl relative group cursor-pointer hover:bg-orange-100 transition-colors">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white text-xl mb-4 shadow-lg shadow-orange-200">🤖</div>
            <h3 className="font-bold text-gray-800 mb-1">Ask RIA</h3>
            <p className="text-xs text-gray-500 mb-4">Ask your queries to our chatbot</p>
            <div className="absolute bottom-4 right-4 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white"><ChevronRight size={14} /></div>
         </div>
       </div>
       <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
          <h3 className="font-bold text-gray-800 mb-4">Get in touch</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">📞</div>
              <div><p className="text-xs text-gray-500">Customer Care</p><p className="font-bold text-gray-800">1800-266-7766</p></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">✉️</div>
              <div><p className="text-xs text-gray-500">Email Support</p><p className="font-bold text-gray-800">care@icicilombard.com</p></div>
            </div>
          </div>
       </div>
    </div>
  );

  const renderContent = () => {
    // Check view stack for deep navigation
    if (viewStack.includes('product_detail') && activeProductDetail) {
      return <ProductDetailView />;
    }
    if (viewStack.includes('category_detail') && selectedCategory === 'corporate') {
      return <CorporateView />;
    }

    switch(activeTab) {
      case 'home': return <HomeTab />;
      case 'buy': return <BuyTab />;
      case 'help': return <HelpTab />;
      case 'policies': return <div className="h-full flex flex-col items-center justify-center p-8 text-center pb-32"><Shield size={64} className="text-gray-200 mb-4" /><h2 className="text-xl font-bold text-gray-400">No Active Policies</h2><button onClick={() => setActiveTab('buy')} className="mt-4 text-orange-600 font-semibold">Buy a policy now</button></div>;
      case 'benefits': return <div className="h-full flex flex-col items-center justify-center p-8 text-center pb-32"><Sparkles size={64} className="text-gray-200 mb-4" /><h2 className="text-xl font-bold text-gray-400">Rewards Program</h2><p className="text-sm text-gray-400 mt-2">Coming soon...</p></div>;
      default: return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1c1e] flex items-center justify-center p-4 lg:p-10 font-sans antialiased overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop')] bg-cover opacity-20 blur-3xl pointer-events-none"></div>
      
      {/* PHONE FRAME */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-white rounded-[3rem] shadow-2xl border-[8px] border-[#1a1a1a] ring ring-gray-800/50 overflow-hidden flex flex-col">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-3xl z-[60]"></div>
        <StatusBar />
        
        {/* MODAL OVERLAY */}
        <ContactModal />

        <div className="flex-1 overflow-y-auto bg-white scroll-smooth no-scrollbar relative">
          {renderContent()}
        </div>

        {/* BOTTOM NAV */}
        <div className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 px-2 py-1 pb-6 z-50 transition-transform duration-300 ${viewStack.length > 1 ? 'translate-y-full' : 'translate-y-0'}`}>
          <div className="flex justify-around items-center">
             {[ { id: 'home', icon: Home, label: 'Home' }, { id: 'policies', icon: Shield, label: 'Policies' }, { id: 'benefits', icon: Sparkles, label: 'Benefits' }, { id: 'buy', icon: ShoppingCart, label: 'Buy' }, { id: 'help', icon: HelpCircle, label: 'Help' }].map((tab) => (
               <button key={tab.id} onClick={() => { setActiveTab(tab.id); setViewStack(['main']); }} className={`flex flex-col items-center gap-1 p-2 w-16 rounded-xl transition-all duration-300 ${activeTab === tab.id ? 'text-orange-600 -translate-y-1' : 'text-gray-400 hover:text-gray-600'}`}>
                 <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                 <span className="text-[10px] font-medium">{tab.label}</span>
               </button>
             ))}
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default App;