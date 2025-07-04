
import { useEffect, useState } from "react";
import axios from "axios";
import { HiMegaphone } from "react-icons/hi2";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import Header from "../Header"
const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/notices")
      .then(res => {
        const data = res.data; // Directly use the array from backend
        setNotices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching notices:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-5xl mx-auto">
      <Header/>
      <div className="bg-[#f9fafb] shadow-md rounded-xl mt-20 p-8 border border-gray-300">
        <div className="flex items-center gap-3 mb-8">
          <HiMegaphone className="text-indigo-600 w-7 h-7" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Official Government Notices
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10 text-gray-600">
            <svg className="animate-spin h-5 w-5 mr-3 text-indigo-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <p>Fetching latest notices...</p>
          </div>
        ) : (
          <>
            {notices.length > 0 ? (
              <ul className="space-y-5">
                {notices.map((notice, index) => (
                  <li
                    key={index}
                    className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow transition duration-200"
                  >
                    <a
                      href={notice.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start sm:items-center gap-3 group"
                    >
                      <HiOutlineDocumentDownload className="w-6 h-6 text-indigo-500 group-hover:text-indigo-700 transition duration-200" />
                      <span className="text-gray-700 group-hover:text-indigo-800 text-sm sm:text-base font-medium leading-snug">
                        {index + 1}. {notice.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500 py-8 text-sm">
                🚫 No notices available at the moment.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;

