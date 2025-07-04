import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SchemesByCategory = () => {
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSchemeId, setExpandedSchemeId] = useState(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {

        const response = await axios.get(
          `http://localhost:8000/api/schemes/category/${categoryId}`
        );
        setCategoryName(response.data.categoryName);
        setSchemes(response.data.schemes);
        console.log(response.data.schemes);
      } catch (err) {
        console.error("Error fetching schemes for category:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, [categoryId]);

  const toggleExpand = (id) => {
    setExpandedSchemeId(expandedSchemeId === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-10 flex-grow">
        {/* Display category name */}
        <h2 className="text-3xl font-bold text-blue-700 mb-6 mt-20">{categoryName}</h2>

        {loading ? (
          <p>Loading schemes...</p>
        ) : schemes.length === 0 ? (
          <p className="text-gray-600">No schemes available for this category.</p>
        ) : (
          <div className="space-y-6">
            {schemes.map((scheme) => (
              <div
                key={scheme._id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{scheme.name}</h3>
                  <button
                    onClick={() => toggleExpand(scheme._id)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {expandedSchemeId === scheme._id ? "Show Less" : "Show More"}
                  </button>
                </div>

                {/* Description section */}
                <div className="text-gray-600 mt-2 mb-4">{scheme.description}</div>

                {expandedSchemeId === scheme._id && (
                  <div className="space-y-4 text-sm text-gray-700">
                    <div>
                      <strong className="font-semibold">Eligibility:</strong>
                      <p>{scheme.eligibility}</p>
                    </div>
                    <div>
                      <strong className="font-semibold">Benefits:</strong>
                      <p>{scheme.benefits}</p>
                    </div>
                    <div>
                      <strong className="font-semibold">Application Process:</strong>
                      <p>{scheme.applicationProcess}</p>
                    </div>
                    <div>
                      <strong className="font-semibold">Scheme Type:</strong>
                      <p>{scheme.schemeType}</p>
                    </div>
                    <div>
                      <strong className="font-semibold">State:</strong>
                      <p>{scheme.stateName}</p>
                    </div>
                    {scheme.documentsRequired?.length > 0 && (
                      <div>
                        <strong className="font-semibold">Documents Required:</strong>
                        <ul className="list-disc ml-6">
                          {scheme.documentsRequired.map((doc, i) => (
                            <li key={i}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      <strong className="font-semibold">Contact:</strong>
                      <p>{scheme.contactDetails}</p>
                    </div>
                    <div>
                      <a
                        href={scheme.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-blue-600 hover:underline"
                      >
                        Apply Here
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SchemesByCategory;
