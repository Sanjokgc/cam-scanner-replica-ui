import React, { useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { toast } from 'react-hot-toast';

const PdfToWordConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log('File selected:', selectedFile?.name);
    
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
      setProgress(0);
      toast.success('PDF file selected successfully');
    } else {
      setError('Please select a valid PDF file');
      toast.error('Please select a valid PDF file');
    }
  }, []);

  const handleConvert = useCallback(async () => {
    if (!file) {
      setError('Please select a file first');
      toast.error('Please select a file first');
      return;
    }

    setIsConverting(true);
    setError(null);
    setProgress(0);
    toast.loading('Starting conversion...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Starting conversion...', {
        fileSize: file.size,
        fileName: file.name,
        apiUrl: API_URL
      });
      setProgress(10);

      // Test server connection first
      try {
        const healthCheck = await fetch(`${API_URL}/health`);
        if (!healthCheck.ok) {
          throw new Error('Server is not responding');
        }
        const healthData = await healthCheck.json();
        console.log('Server health check:', healthData);
      } catch (err) {
        console.error('Server health check failed:', err);
        throw new Error('Unable to connect to server. Please ensure the server is running.');
      }

      const response = await fetch(`${API_URL}/convert/pdf-to-word`, {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      setProgress(30);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Conversion failed');
      }

      setProgress(60);

      const contentDisposition = response.headers.get('content-disposition');
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : 'converted.docx';

      console.log('Downloading file:', filename);
      setProgress(80);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setProgress(100);
      console.log('Conversion completed successfully');
      toast.success('Conversion completed successfully!');
    } catch (err) {
      console.error('Conversion error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Conversion failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsConverting(false);
      toast.dismiss();
    }
  }, [file, API_URL]);

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
            disabled={isConverting}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {isConverting && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

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