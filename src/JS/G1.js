import React from 'react';
import '../CSS/G1.css';
import PdfViewer from './PdfViewer'; 

const G1 = () => {
  return (
    <div className="G1">
      <h1>Visualizador de PDF</h1>
      <PdfViewer pdfUrl="/media/Livreto_trabalho.pdf" />
    </div>
  );
};

export default G1;