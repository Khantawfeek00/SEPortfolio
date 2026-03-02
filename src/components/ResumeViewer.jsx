import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './ResumeViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export default function ResumeViewer({ pdfUrl }) {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className="resume-viewer">
            <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="resume-viewer__loading">
                        <div className="spinner"></div>
                        <p>Loading Resume...</p>
                    </div>
                }
                error={
                    <div className="resume-viewer__error">
                        <p>Failed to load resume. Please try downloading it instead.</p>
                    </div>
                }
            >
                {Array.from(new Array(numPages), (el, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        renderTextLayer={false} /* This disables text selection/copying! */
                        renderAnnotationLayer={false}
                        className="resume-viewer__page"
                        width={Math.min(window.innerWidth * 0.9, 850)} /* Responsive width */
                    />
                ))}
            </Document>
        </div>
    );
}
