

import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "bootstrap/dist/css/bootstrap.min.css";

const PdfScreen1 = () => {
    const contentRef = useRef(null);

    const generatePDF = () => {
        const input = contentRef.current;

        html2canvas(input, { scale: 3, useCORS: true, logging: false }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");

            const pageWidth = 210;
            const pageHeight = 297;
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save("Election_Report.pdf");
        }).catch((error) => console.error("Error generating PDF:", error));
    };

    return (
        <div className="container d-flex flex-column align-items-center py-4">
            <div className="card border border-secondary shadow-lg" 
                style={{ width: "210mm", minHeight: "297mm", position: "relative" }}
                ref={contentRef}>
                
                {/* Header Section */}
                <div className="w-100" style={{ height: "40mm" }}>
                    <img src="/Header.jpg" alt="Header" className="img-fluid w-100 h-100" 
                        style={{ objectFit: "cover" }} crossOrigin="anonymous" />
                </div>

                {/* Main Content Section */}
                <div className="p-4" style={{ fontSize: '14px', marginTop: "10px" }}>
                    <p className="text-center fw-bold text-dark" style={{ textDecoration: "underline" }}>
                        அறிவிப்பு :
                    </p>
                    <h6 className="fw-bold text-center">இராமநாதபுரம் திருவாடானை மண்டலம்</h6>
                    <p className="fw-bold text-center">(திருவாடானை சட்டமன்றத் தொகுதி)</p>
                    <h6 className="fw-bold text-center">பொறுப்பாளர்கள் நியமனம் – 2025</h6>

                    <p className="fw-bold text-center ">இராமநாதபுரம் திருவாடானை மண்டலம் - பொறுப்பாளர்கள் நியமனம்  2025</p>


                    <div className="d-flex flex-column p-2" style={{ textAlign: "start", marginLeft: '30px' }}>
                        <div className="d-flex pb-1 fw-bold">
                            <div className="col">பொறுப்பு</div>
                            <div className="col">பெயர்</div>
                            <div className="col">உறுப்பினர் எண்</div>
                            <div className="col">வாக்கக எண்</div>
                        </div>
                        <p className="fw-bold  mt-1">இராமநாதபுரம் திருவாடானை மண்டலம் பொறுப்பாளர்</p>

                        <div className="d-flex ">
                            <div className="col">செயலாளர்</div>
                            <div className="col">அருண்குமார்</div>
                            <div className="col">17017056341</div>
                            <div className="col">66</div>
                        </div>

                    </div>
                    <div className="d-flex flex-column p-2" style={{ textAlign: "start", marginLeft: '30px' }}>
                        <p className="fw-bold  ">இராமநாதபுரம் திருவாடானை வடக்கு மாவட்டப் பொறுப்பாளர்</p>
                        <p className="fw-bold  ">129 வாக்ககங்கள் (1-129)</p>

                        <div className="d-flex ">
                            <div className="col">தலைவர்</div>
                            <div className="col">அருண்குமார்</div>
                            <div className="col">17017056341</div>
                            <div className="col">66</div>
                        </div>
                        <div className="d-flex pt-2">
                            <div className="col">செயலாளர் </div>
                            <div className="col">அருண்குமார்</div>
                            <div className="col">17017056341</div>
                            <div className="col">66</div>
                        </div>
                        <div className="d-flex pt-2">
                            <div className="col">பொருளாளர்</div>
                            <div className="col">அருண்குமார்</div>
                            <div className="col">17017056341</div>
                            <div className="col">66</div>
                        </div>
                        <div className="d-flex pt-2">
                            <div className="col">செய்தி தொடர்பாளர்</div>
                            <div className="col">அருண்குமார்</div>
                            <div className="col">17017056341</div>
                            <div className="col">66</div>
                        </div>
                    </div>
                    <div className="d-flex flex-column p-2" style={{ textAlign: "start", marginLeft: '30px' }}>
                        <p className="fw-bold  ">இளைஞர் பாசறை பொறுப்பாளர்கள் - இராமநாதபுரம் திருவாடானை வடக்கு மாவட்டப் பொறுப்பாளர்</p>

                        <div className="d-flex ">
                            <div className="col">செயலாளர்</div>
                            <div className="col">அருண்குமார்</div>
                            <div className="col">17017056341</div>
                            <div className="col">66</div>
                        </div>
                        <div className="d-flex pt-2">
                            <div className="col">இணைச் செயலாளர்</div>
                            <div className="col">அருண்குமார்</div>
                            <div className="col">17017056341</div>
                            <div className="col">66</div>
                        </div>
                        <div className="d-flex pt-2">
                            <div className="col">துணைச் செயலாளர்</div>
                            <div className="col">அருண்குமார்</div>
                            <div className="col">17017056341</div>
                            <div className="col">66</div>
                        </div>

                    </div>
                    <div className="d-flex flex-column p-2" style={{ textAlign: "start", marginLeft: '30px ' }}>
                        <p className="fw-semibold  ">மகளிர் பாசறை பொறுப்பாளர்கள் - இராமநாதபுரம் திருவாடானை வடக்கு மாவட்டப் பொறுப்பாளர்</p>

                        <div className="d-flex ">
                            <div className="col">செயலாளர்</div>
                            <div className="col">அருண்குமார்</div>
                            <div className="col">17017056341</div>
                            <div className="col">66</div>
                        </div>
                        <div className="d-flex pt-2">
                            <div className="col">இணைச் செயலாளர் </div>
                            <div className="col">அருண்குமார்</div>
                            <div className="col">17017056341</div>
                            <div className="col">66</div>
                        </div>
                        <div className="d-flex pt-2">
                            <div className="col">துணைச் செயலாளர்</div>
                            <div className="col">அருண்குமார்</div>
                            <div className="col">17017056341</div>
                            <div className="col">66</div>
                        </div>

                    </div>
                    <div className="d-flex flex-column p-2" style={{ textAlign: "start", marginLeft: '30px' }}>
                        <p className="fw-bold  ">மாணவர்  பாசறை பொறுப்பாளர்கள் - இராமநாதபுரம் திருவாடானை வடக்கு மாவட்டப் பொறுப்பாளர்</p>

                        <div className="d-flex ">
                            <div className="col">செயலாளர்</div>
                            <div className="col">அருண்குமார்</div>
                            <div className="col">17017056341</div>
                            <div className="col">66</div>
                        </div>
                        <div className="d-flex pt-2">
                            <div className="col">இணைச் செயலாளர்</div>
                            <div className="col">அருண்குமார்</div>
                            <div className="col">17017056341</div>
                            <div className="col">66</div>
                        </div>
                        <div className="d-flex pt-2">
                            <div className="col">துணைச் செயலாளர்</div>
                            <div className="col">அருண்குமார்</div>
                            <div className="col">17017056341</div>
                            <div className="col">66</div>
                        </div>

                    </div>
                    <div className="d-flex flex-column p-2" style={{ textAlign: "start", marginLeft: '30px ' }}>
                        <p className="fw-semibold  ">குருதி பாசறை பொறுப்பாளர்கள் - இராமநாதபுரம் திருவாடானை வடக்கு மாவட்டப் பொறுப்பாளர்</p>

                        <div className="d-flex ">
                            <div className="col">செயலாளர்</div>
                            <div className="col">அருண்குமார்</div>
                            <div className="col">17017056341</div>
                            <div className="col">66</div>
                        </div>
                        <div className="d-flex pt-2">
                            <div className="col">இணைச் செயலாளர் </div>
                            <div className="col">அருண்குமார்</div>
                            <div className="col">17017056341</div>
                            <div className="col">66</div>
                        </div>
                        <div className="d-flex pt-2">
                            <div className="col">துணைச் செயலாளர்</div>
                            <div className="col">அருண்குமார்</div>
                            <div className="col">17017056341</div>
                            <div className="col">66</div>
                        </div>

                    </div>
                    
                </div>
                {/* Footer Section */}
                <div className="w-100 position-absolute bottom-0" style={{ height: "20mm" }}>
                    <img src="/Footer.jpg" alt="Footer" className="img-fluid w-100 h-100" 
                        style={{ objectFit: "cover" }} crossOrigin="anonymous" />
                </div>
            </div>

            {/* PDF Download Button */}
            <div className="text-center mt-3">
                <button onClick={generatePDF} className="btn btn-primary">
                    PDF பதிவிறக்க
                </button>
            </div>
        </div>
    );
};

export default PdfScreen1;
