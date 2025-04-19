import { useState, useRef } from "react";
import { FileText, Upload, Loader2, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// Mock function to simulate conversion process
const convertPdfToWord = async (file: File): Promise<Blob> => {
  // In a real implementation, this would call a backend service
  // For this mockup, we'll just simulate a delay 
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return a mock Word document blob
      resolve(new Blob([file], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }));
    }, 2000);
  });
};

const PdfToWord = () => {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please select a valid PDF file');
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      setError(null);
      setConverted(false);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.type !== 'application/pdf') {
        setError('Please select a valid PDF file');
        setFile(null);
        return;
      }
      
      setFile(droppedFile);
      setError(null);
      setConverted(false);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    
    setConverting(true);
    setError(null);
    
    try {
      const wordDoc = await convertPdfToWord(file);
      
      // Create a download link
      const url = URL.createObjectURL(wordDoc);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.replace('.pdf', '')}.docx`;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setConverted(true);
      toast({
        title: "Conversion Complete",
        description: "Your PDF has been converted to Word successfully!",
      });
    } catch (err) {
      setError('An error occurred during conversion. Please try again.');
      toast({
        variant: "destructive",
        title: "Conversion Failed",
        description: "There was an error converting your PDF file.",
      });
    } finally {
      setConverting(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setConverted(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText size={24} className="text-primary" />
            <h2 className="text-2xl font-semibold">PDF to Word Converter</h2>
          </div>
        </div>

        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {error && (
            <div className="flex items-center justify-center gap-2 text-red-500 mb-4">
              <AlertTriangle size={20} />
              <p>{error}</p>
            </div>
          )}

          {!file ? (
            <>
              <div className="mb-4 flex justify-center">
                <Upload size={48} className="text-gray-400" />
              </div>
              <p className="text-gray-600 mb-4">Drag & drop your PDF file here, or click to browse</p>
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
              >
                Select PDF File
              </Button>
              <input 
                type="file" 
                accept=".pdf" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <FileText size={24} className="text-primary" />
                <span className="font-medium">{file.name}</span>
                <span className="text-gray-500 text-sm">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
              </div>

              <div className="flex justify-center gap-3">
                {converted ? (
                  <>
                    <Button variant="outline" onClick={resetForm}>
                      Convert Another File
                    </Button>
                    <Button
                      onClick={handleConvert}
                    >
                      Download Again
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={resetForm}>
                      Remove
                    </Button>
                    <Button
                      onClick={handleConvert}
                      disabled={converting}
                    >
                      {converting ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Converting...
                        </>
                      ) : converted ? (
                        <>
                          <Check size={16} className="mr-2" />
                          Converted
                        </>
                      ) : (
                        "Convert to Word"
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-lg mb-2">How to convert PDF to Word</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Upload your PDF file by dragging it into the upload box or clicking the select button.</li>
            <li>Click the "Convert to Word" button to start the conversion process.</li>
            <li>Once complete, your Word document will automatically download.</li>
            <li>Your files remain private and are deleted after conversion.</li>
          </ol>
        </div>
      </Card>
    </div>
  );
};

export default PdfToWord; 