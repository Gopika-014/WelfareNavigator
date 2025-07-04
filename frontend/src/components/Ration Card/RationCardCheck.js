import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFileAlt, FaMapMarkedAlt, FaCheckCircle } from "react-icons/fa";
import Header from "../../components/Header";




// Dummy ration card schemes
const defaultRationCardSchemes = [
  {
    rationCardType: "AAY",
    description: "Antyodaya Anna Yojana for the poorest families.",
    generalBenefits: ["35 kg rice at ₹3/kg", "Sugar, kerosene at subsidized rates"],
  },
  {
    rationCardType: "PHH",
    description: "Priority Household for low-income families.",
    generalBenefits: ["5 kg rice per member at ₹3/kg", "Access to other government schemes"],
  },
  {
    rationCardType: "BPL",
    description: "Below Poverty Line families for essential subsidies.",
    generalBenefits: ["Essential food grains at subsidized rates", "Eligible for housing and education aid"],
  },
  {
    rationCardType: "APL",
    description: "Above Poverty Line families, limited subsidies.",
    generalBenefits: ["Basic food grains at non-subsidized rates", "Limited access to certain schemes"],
  },
  {
    rationCardType: "NPHH",
    description: "Non-Priority Households with limited benefits.",
    generalBenefits: ["No commodity entitlement", "Can apply for general services"],
  },
];

const RationCardCheck = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const sidebarItems = [
    {
      key: "schemes",
      label: "Check Government Schemes",
      icon: <FaFileAlt />,
      path: "/rationschemes",
    },
    {
      key: "state",
      label: "State-Specific Entitlements",
      icon: <FaMapMarkedAlt />,
      path: "/rationinfo",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Layout */}
      
      <div className="flex mt-16">
  {/* Sidebar */}
  <aside className="w-1/4 mt-4 hidden md:flex flex-col gap-4 border-r border-gray-200 pr-4 pl-6 py-6 bg-white shadow-sm rounded-tr-xl rounded-br-xl">
    <h3 className="text-2xl font-bold text-blue-800 mb-6 border-b pb-2 border-gray-300">
      Ration Info
    </h3>

    {sidebarItems.map((item) => (
      <button
        key={item.key}
        className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium
          ${
            isActive(item.path)
              ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500 shadow-sm"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        onClick={() => navigate(item.path)}
      >
        <span className="text-lg">{item.icon}</span>
        <span>{item.label}</span>
      </button>
    ))}
  </aside>


        {/* Main Content */}
        <main className="flex-1 p-6">
        <section className="bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 px-6 py-5 rounded-xl mb-8 shadow-sm">
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-2xl font-semibold text-blue-900 mb-2">
      Know Your Ration Card Benefits
    </h2>
    <p className="text-sm text-blue-800">
      Explore the government-backed entitlements linked to your ration card type. 
     
    </p>
  </div>
</section>





          {/* Card Grid Section */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {defaultRationCardSchemes.map((scheme, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow hover:shadow-md p-6 border-t-4 border-blue-600 transition"
                >
                  <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    {scheme.rationCardType} Card
                  </h3>
                  <p className="text-gray-600 mb-4">{scheme.description}</p>
                  <ul className="list-disc ml-5 text-gray-700 text-sm space-y-1">
                    {scheme.generalBenefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default RationCardCheck;
