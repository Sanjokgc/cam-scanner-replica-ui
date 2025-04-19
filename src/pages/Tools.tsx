import { 
  FileText, FileSpreadsheet, Presentation, Image as ImageIcon, 
  FilePlus, Lock, FileKey, FileSearch, Scissors, RotateCw,
  PenTool, FileImage, Stamp
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface Tool {
  icon: any;
  label: string;
  description: string;
  isProFeature?: boolean;
  id: string;
}

const ToolCard = ({ icon: Icon, label, description, isProFeature }: Tool) => (
  <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
    <div className="w-full text-left p-6 transition-colors hover:bg-gray-50">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon size={24} className="text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-lg">{label}</h3>
            {isProFeature && (
              <span className="px-2 py-1 text-xs font-medium text-orange-700 bg-orange-100 rounded-full">
                Pro App
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </div>
  </Card>
);

const Tools = () => {
  const convertTools: Tool[] = [
    {
      icon: FileText,
      label: "PDF to Word",
      description: "Convert your PDF files to Word with layout retained for easy editing",
      id: "pdf-to-word"
    },
    {
      icon: FileSpreadsheet,
      label: "PDF to Excel",
      description: "Convert files in PDF to editable ones in Excel with one click",
      id: "pdf-to-excel"
    },
    {
      icon: Presentation,
      label: "PDF to PPT",
      description: "Convert files in PDF to editable ones in PowerPoint for easy presentation",
      id: "pdf-to-ppt"
    },
    {
      icon: ImageIcon,
      label: "PDF to JPG",
      description: "Convert each page of a file in PDF to that in JPG for exporting",
      id: "pdf-to-jpg"
    },
    {
      icon: FileText,
      label: "Word to PDF",
      description: "Convert Word files to PDFs online",
      id: "word-to-pdf"
    },
    {
      icon: FileSpreadsheet,
      label: "Excel to PDF",
      description: "Convert Excel documents to PDF documents",
      id: "excel-to-pdf"
    },
    {
      icon: Presentation,
      label: "PPT to PDF",
      description: "Convert PowerPoint presentations to PDF documents",
      id: "ppt-to-pdf"
    },
    {
      icon: ImageIcon,
      label: "JPG to PDF",
      description: "Convert JPG/JPEG images to PDF documents",
      id: "jpg-to-pdf"
    }
  ];

  const editTools: Tool[] = [
    {
      icon: FilePlus,
      label: "PDF Merge",
      description: "Merge multiple PDF files into one single PDF document",
      id: "pdf-merge"
    },
    {
      icon: Lock,
      label: "PDF Password",
      description: "Password protect your PDF files to secure sensitive content",
      isProFeature: true,
      id: "pdf-password"
    },
    {
      icon: FileKey,
      label: "PDF Unlock",
      description: "Remove password and restrictions from protected PDF documents",
      isProFeature: true,
      id: "pdf-unlock"
    },
    {
      icon: FileSearch,
      label: "OCR",
      description: "Convert image PDFs to searchable text PDFs with OCR technology",
      isProFeature: true,
      id: "ocr"
    },
    {
      icon: Scissors,
      label: "PDF Split",
      description: "Split a large PDF file into multiple smaller PDF files",
      id: "pdf-split"
    },
    {
      icon: RotateCw,
      label: "PDF Rotate",
      description: "Permanently rotate PDF pages for better viewing orientation",
      id: "pdf-rotate"
    },
    {
      icon: PenTool,
      label: "PDF Sign",
      description: "Electronically sign PDF documents with your signature",
      id: "pdf-sign"
    },
    {
      icon: FileImage,
      label: "PDF Compress",
      description: "Reduce the file size of your PDF documents without losing quality",
      id: "pdf-compress"
    },
    {
      icon: Stamp,
      label: "PDF Watermark",
      description: "Add text or image watermarks to your PDF files",
      isProFeature: true,
      id: "pdf-watermark"
    }
  ];

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Convert Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {convertTools.map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Edit Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {editTools.map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
