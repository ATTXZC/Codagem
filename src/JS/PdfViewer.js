import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/webpack';

const PdfViewer = ({ pdfUrl }) => {
  const canvasRef = useRef(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    const loadPdf = async () => {
      if (!pdfUrl) {
        console.error('No PDF URL provided');
        return;
      }

      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdfDocument = await loadingTask.promise;
        setPdf(pdfDocument);
        renderPage(pageNumber);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPdf();
  }, [pdfUrl, pageNumber]);

  const renderPage = async (num) => {
    if (pdf) {
      try {
        const page = await pdf.getPage(num);
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
      } catch (error) {
        console.error('Error rendering page:', error);
      }
    }
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      <div>
        <button onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}>Previous</button>
        <button onClick={() => setPageNumber(prev => (pdf ? Math.min(prev + 1, pdf.numPages) : prev))}>Next</button>
      </div>
    </div>
  );
};

export default PdfViewer;