import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TamilElectionPage = () => {
    const contentRef = useRef(null);

    const generatePDF = () => {
        const input = contentRef.current;

        html2canvas(input, { scale: 3, useCORS: true, logging: false })
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                const pageWidth = 210; // A4 width in mm
                const imgWidth = pageWidth;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
                pdf.save("Election_Report.pdf");
            })
            .catch((error) => console.error("Error generating PDF:", error));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
            {/* A4 Sized Content */}
            <div
                className="relative w-[210mm] h-[297mm] bg-white border border-gray-400 shadow-2xl rounded-lg overflow-hidden flex flex-col"
                ref={contentRef}
            >
                {/* Header */}
                <div className="bg-red-700 text-white text-center py-4 sticky top-0 w-full rounded-t-lg z-10 shadow-md">
                    <h1 className="text-3xl font-bold">நாம் தமிழர் கட்சி</h1>
                    <h2 className="text-lg mt-1">செந்தமிழன் சீமான்</h2>
                    <p className="text-sm">தமிழீழம் ஓரியடிவிடும் நாள்: 04-08-2013</p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 px-10 py-6 text-center overflow-auto">
                    <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
                        இராமநாதபுரம் திருவாடானை மண்டலம் <br /> பொது தேர்தல் - 2025
                    </h2>
                    <p className="text-gray-700 mt-2">வாக்கு எண்ணிக்கை</p>

                    {/* Logo */}
                    <div className="flex justify-center my-4">
                        <img
                            src={`${window.location.origin}/logo1.png`}
                            alt="Logo"
                            className="w-60 h-auto rounded-lg border shadow-md"
                            crossOrigin="anonymous"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center border-t border-gray-300 py-3 text-gray-700 text-sm sticky bottom-0 bg-white z-10 shadow-md">
                    <p className="mb-1">எண், DB, மடிப்பாக்கம் பகுதி, சென்னை 600116</p>
                    <p>தொடர்புக்கு: 044-43408484 / 9092522522 | Email: naamtamizhar@gmail.com</p>
                </div>
            </div>

            {/* Download Button */}
            <div className="text-center mt-4">
                <button
                    onClick={generatePDF}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
                >
                    PDF பதிவிறக்க
                </button>
            </div>
        </div>
    );
};

export default TamilElectionPage;
