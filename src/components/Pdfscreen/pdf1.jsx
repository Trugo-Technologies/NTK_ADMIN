

import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "bootstrap/dist/css/bootstrap.min.css";
import { useReactToPrint } from "react-to-print";

const PdfScreen1 = ({ formData, tableData }) => {
    const contentRef = useRef(null);

    const reactToPrintFn = useReactToPrint({ contentRef });
    console.log("form:", formData);
    console.log("Tableform:", tableData);
    const tableForm = JSON.parse(localStorage.getItem("tableForm") || "[]");
    const forms = JSON.parse(localStorage.getItem("forms") || "{}");
    console.log("Array Form", forms);
    console.log("Array Table Form", tableForm);
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
        <div className="container d-flex flex-column align-items-center py-4" >
            <div className="printcontent  " style={{ width: "210mm", minHeight: "297mm" }}
                ref={contentRef}
            >

                {/* Header Section */}
                <div className="header w-100" style={{ height: "40mm" }}>
                    <img src="/Header.jpg" alt="Header" className="img-fluid w-100 h-100"
                        style={{ objectFit: "cover" }} crossOrigin="anonymous" />
                </div>

                {/* Main Content Section */}
                <div className="content " style={{ fontSize: '14px' }}>
                    <div className="text-end" style={{ marginTop: "20px", marginRight: "40px", lineHeight: "1.2" }}>
                        <p className="text-dark" style={{ margin: 0 }}>க.எண் : 733653482 </p>
                        <p className="text-dark" style={{ margin: 0 }}>நாள் : 25.03.2025</p>
                    </div>

                    <p className="text-center fw-bold text-dark" style={{ textDecoration: "underline" }}>
                        அறிவிப்பு :
                    </p>
                    <h6 className="fw-bold text-center"><strong>{formData?.[0]?.data?.district_name || '___'}</strong> <strong>{formData?.[0]?.data?.zone_name || '___'}</strong> மண்டலம்</h6>
                    <p className="fw-bold text-center">(<strong>{formData?.[0]?.data?.zone_name || '___'}</strong> சட்டமன்றத் தொகுதி)</p>
                    <h6 className="fw-bold text-center">பொறுப்பாளர்கள் நியமனம் – 2025</h6>

                    <p className="fw-bold text-center "><strong>{formData?.[0]?.data?.district_name || '___'}</strong> <strong>{formData?.[0]?.data?.zone_name || '___'}</strong> மண்டலம் - பொறுப்பாளர்கள் நியமனம்  2025</p>


                    <div className="d-flex flex-column p-2" style={{ textAlign: "start", marginLeft: '30px' }}>
                        <div className="d-flex pb-1 fw-bold">
                            <div className="col">பொறுப்பு</div>
                            <div className="col">பெயர்</div>
                            <div className="col">உறுப்பினர் எண்</div>
                            <div className="col">வாக்கக எண்</div>
                        </div>
                        <p className="fw-bold  mt-1"><strong>{formData?.[0]?.data?.district_name || '___'}</strong> <strong>{formData?.[0]?.data?.zone_name || '___'}</strong> மண்டலம் பொறுப்பாளர்</p>

                        {tableData.map((tabData) => (

                            <div className="d-flex ">
                                <div className="col">{tabData?.data?.selectedRole || '___'}</div>
                                <div className="col">{tabData?.data?.fullName || '___'}</div>
                                <div className="col">{tabData?.data?.memberNumber || '___'}</div>
                                <div className="col">{tabData?.data?.voteNumber || '___'}</div>
                            </div>
                        ))}


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


                    <div className="pagecontent2" >
                        <div className=" d-flex flex-column p-2" style={{ textAlign: "start", marginLeft: '30px', }}>

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
                        <div className="d-flex flex-column p-2 " style={{ textAlign: "start", marginLeft: '30px ', }}>
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
                        <div className="desContent d-flex flex-column p-2 " >

                            <p className="  text-dark  " >
                                மேற்கண்ட அனைவரும் <strong>நாம் தமிழர் கட்சி</strong>-
                                <strong> இராமநாதபுரம் திருவாடானை மண்டலத்திற்குட்பட்ட பொறுப்பாளர்களாக </strong>நியமிக்கப்படுகிறார்கள். இவர்கள் அனைவருக்கும் , கட்சியின் அனைத்துநிலைப்  பொறுப்பாளாளர்களும் , அன்பு உறவுகள் அனைவரும் முழு ஒத்துழைப்பு
                                நல்குமாறு அன்போடு கேட்டு கொள்ளப்படுகிறார்கள்
                            </p>
                            <p className="text-dark">
                                புதிதாக பொறுபேற்கும் உறவுகள் அனைவர்க்கும் என் புரட்சி வாழ்த்துகள்.
                                பொறுப்பையும் கடமையையும் உணர்ந்து நீங்கள் சிறப்பாகச் செயலாற்றுவீர்கள் என்ற  நம்பிக்கையோடு
                            </p>

                            {/* Signature Section */}
                            <div className="d-flex flex-column align-items-center align-self-end">
                                <p className="fw-semibold m-0">சீமான்</p>
                                <p className="text-muted m-0">தலைமை ஒருங்கிணைப்பாளர்</p>
                            </div>

                        </div>
                    </div>

                </div>
                {/* Footer Section */}
                <div className="footer w-100" >
                    <img src="/Footer.jpg" alt="Footer" className="img-fluid w-100 h-100"
                        style={{ objectFit: "cover" }} crossOrigin="anonymous" />
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

export default PdfScreen1;
