import React, { useState } from 'react';
import { useFetchDocumentMutation } from '../slices/adminApiSlice';

export default function ImportantDownload() {
    const [FetchDocument, { isLoading }] = useFetchDocumentMutation();
    const [documents, setDocuments] = useState([]);

    const handleFetchDocuments = async () => {
        try {
            const data = await FetchDocument().unwrap();
            setDocuments(data); // Assuming the API returns an array of document objects
        } catch (error) {
            console.error('Failed to fetch documents:', error);
        }
    };
    console.log("documents",documents)
    return (
        <div className="p-6 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Important Downloads
            </h1>

            <div className="text-center mb-6">
                <button
                    onClick={handleFetchDocuments}
                    className={`px-6 py-3 font-semibold rounded-lg shadow-md text-white transition-colors duration-300 ${
                        isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex justify-center items-center space-x-2">
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                            <span>Loading...</span>
                        </span>
                    ) : (
                        'Fetch Documents'
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {documents.map((doc, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition-shadow"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            {doc.title || `Document ${index + 1}`}
                        </h2>
                        <a
                            href={doc.DocsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 bg-green-500 text-white text-center rounded-lg font-medium hover:bg-green-600"
                        >
                            Download
                        </a>
                    </div>
                ))}
            </div>

            {documents.length === 0 && !isLoading && (
                <p className="text-center text-gray-600 mt-8">
                    No documents available. Please click "Fetch Documents" to load the files.
                </p>
            )}
        </div>
    );
}
