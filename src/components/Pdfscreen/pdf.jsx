import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "bootstrap/dist/css/bootstrap.min.css";
import { useReactToPrint } from "react-to-print";

const PdfScreen = ({ formData, tableData }) => {
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    const generatePDF = () => {
        const input = contentRef.current;

        html2canvas(input, { scale: 3, useCORS: true, logging: false })
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4", true); // 'true' for better quality

                const pageWidth = 210; // A4 width in mm
                const pageHeight = 297; // A4 height in mm
                const imgWidth = pageWidth;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                // Add the image without any margin
                pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
                pdf.save("Election_Report.pdf");
            })
            .catch((error) => console.error("Error generating PDF:", error));
    };



    return (
        <div className="container d-flex flex-column align-items-center py-4">
            <div className="card " style={{ width: "210mm", height: "297mm", position: "relative" }} ref={contentRef}>
                {/* Header Section */}
                <div className="w-100" style={{ height: "40mm" }}>
                    <img src="/Header.jpg" alt="Header" className="img-fluid w-100 h-100" style={{ objectFit: "cover" }} crossOrigin="anonymous" />
                </div>

                {/* Main Content Section */}
                <div className="p-4 " >
                    <div className="text-end" style={{ marginRight: "40px", lineHeight: "1.2" }}>
                        <p className="text-dark" style={{ margin: 0 }}>க.எண் : 733653482 </p>
                        <p className="text-dark" style={{ margin: 0 }}>நாள் : 25.03.2025</p>
                    </div>

                    <h5 className="text-center fw-bold text-dark " style={{ marginTop: '40px' }}>அறிவிப்பு:</h5>
                    <div className="desContent2 d-flex flex-column ">
                        <p className="text-dark  " >
                            சேலம் மாவட்டம், மேட்டூர் தொகுதி, <strong>{formData?.district || '___'}</strong>ஆவது வாக்குச்சாவடியில்
                            <strong> {formData?.name || 'பயனர் பெயர்'} ({formData?.voterId || 'ID'}) </strong>, நாம் தமிழர் கட்சி - {formData?.division || '___'} பாசறையின் மாபெரும் ஒருங்கிணைப்பாளராக
                            ஒருமனதாக நியமிக்கப்படுகிறார்.
                        </p>
                        <p className="text-dark">
                            இதற்கு, கட்சியின் அனைத்து உறுப்பினர்களும், மாவட்ட மற்றும் ஒன்றிய முழு ஒருங்கிணைப்பாளர்களும் ஒத்துழைப்பு வழங்க வேண்டும் என்று கேட்டுக் கொள்கிறோம்.
                        </p>
                        <p className="text-dark">
                            இது தொடர் வெற்றியை நோக்கி நாம் தமிழர் கட்சி முன்னேற தொடர்ந்த பயணத்திற்கான உறுதிப்பாட்டாகும்.
                        </p>
                        <p className="text-dark">
                            கட்சியின் அனைத்து உறுப்பினர்களும், ஆதரவாளர்களும், பொறுப்பாளர்களும் நம்பிக்கையுடன் செயல்பட வேண்டும்.
                        </p>
                    </div>
                    {/* Signature Section */}
                    <div className="text-end" style={{ marginRight: "40px" }}>
                        <p className="fw-semibold">சீமான்</p>
                        <p className="text-muted">தலைமை ஒருங்கிணைப்பாளர்</p>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="w-100 position-absolute bottom-0" style={{ height: "20mm" }}>
                    <img src="/Footer.jpg" alt="Footer" className="img-fluid w-100 h-100" style={{ objectFit: "cover" }} crossOrigin="anonymous" />
                </div>
            </div>

            {/* PDF Download Button */}
            <div className="text-center mt-3">
                <button onClick={() => reactToPrintFn()} className="btn btn-primary">
                    PDF பதிவிறக்க
                </button>
            </div>
        </div>
    );
};

export default PdfScreen;