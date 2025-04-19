import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

const PdfToWordConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid PDF file');
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsConverting(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/convert/pdf-to-word', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      // Get the filename from the response headers
      const contentDisposition = response.headers.get('content-disposition');
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1]
        : 'converted.docx';

      // Create a blob from the response
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Conversion failed. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">PDF to Word Converter</h2>
        
        <div className="space-y-2">
          <Input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <Button
          onClick={handleConvert}
          disabled={!file || isConverting}
          className="w-full"
        >
          {isConverting ? 'Converting...' : 'Convert to Word'}
        </Button>

        <p className="text-sm text-gray-500 text-center">
          Upload your PDF file and convert it to Word format
        </p>
      </div>
    </Card>
  );
};

export default PdfToWordConverter; 