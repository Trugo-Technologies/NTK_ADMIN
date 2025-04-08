import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "bootstrap/dist/css/bootstrap.min.css";
import { useReactToPrint } from "react-to-print";

const PdfScreen = ({ formData, tableData }) => {
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    console.log("form:", formData);
    console.log("Tableform:", tableData);



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

                    <h5 className="text-center fw-bold text-dark " style={{ marginTop: '40px', fontSize: "13px" }}>அறிவிப்பு:</h5>
                    <div className="desContent2 d-flex flex-column ">
                        <p className="text-dark">
                            <strong>{formData?.[0]?.data?.district_name || '___'}</strong> மாவட்டம், <strong>{formData?.[0]?.data?.zone_name || '___'}</strong> தொகுதி, <strong>{tableData?.[0]?.data?.voteNumber || '___'}</strong> ஆவது வாக்ககத்தைச் சேர்ந்த
                            <strong> {tableData?.[0]?.data?.fullName || 'பயனர் பெயர்'} ({tableData?.[0]?.data?.memberNumber || 'ID'}) </strong> அவர்கள்,
                            <strong>நாம் தமிழர் கட்சி</strong> - <strong>{formData?.[0]?.data?.appointment || '___'}</strong> <strong>ஒருங்கிணைப்பாளர்களில் ஒருவராக  </strong>
                            நியமிக்கப்படுகிறார்.
                        </p>

                        <p className="text-dark">
                            இவருக்கு, கட்சியின் அனைத்துநிலைப் பொறுப்பாளர்களும், அன்பு உறவுகள் அனைவரும் முழு ஒத்துழைப்பு நல்குமாறு அன்போடு கேட்டுக் கொள்ளப்படுகிறார்கள்,
                        </p>
                        <p className="text-dark">
                            புதிதாகப் பொறுப்பேற்கும் உறவுக்கு என்னுடைய புரட்சி வாழ்த்துக்கள். பொறுப்பையும், கடமையையும் உணர்ந்து நீங்கள் சிறப்பாகச் செயலாற்றுவீர்கள் என்ற நம்பிக்கையோடு!
                        </p>
                        {/* <p className="text-dark">
                            கட்சியின் அனைத்து உறுப்பினர்களும், ஆதரவாளர்களும், பொறுப்பாளர்களும் நம்பிக்கையுடன் செயல்பட வேண்டும்.
                        </p> */}
                    </div>
                    {/* Signature Section */}
                    <div className="text-end" style={{ marginRight: "40px", marginTop:"80px" }}>
                        <p className="fw-semibold" style={{marginRight:"80px"}}>சீமான்</p>
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