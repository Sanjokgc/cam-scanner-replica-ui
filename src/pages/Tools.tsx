
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
}

const ToolCard = ({ icon: Icon, label, description, isProFeature }: Tool) => (
  <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
    <button className="w-full text-left p-6 transition-colors hover:bg-gray-50">
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
    </button>
  </Card>
);

const Tools = () => {
  const convertTools: Tool[] = [
    {
      icon: FileText,
      label: "PDF to Word",
      description: "Convert your PDF files to Word with layout retained for easy editing"
    },
    {
      icon: FileSpreadsheet,
      label: "PDF to Excel",
      description: "Convert files in PDF to editable ones in Excel with one click"
    },
    {
      icon: Presentation,
      label: "PDF to PPT",
      description: "Convert files in PDF to editable ones in PowerPoint for easy presentation"
    },
    {
      icon: ImageIcon,
      label: "PDF to JPG",
      description: "Convert each page of a file in PDF to that in JPG for exporting"
    },
    {
      icon: FileText,
      label: "Word to PDF",
      description: "Convert Word files to PDFs online"
    },
    {
      icon: FileSpreadsheet,
      label: "Excel to PDF",
      description: "Convert Excel documents to PDF documents"
    },
    {
      icon: Presentation,
      label: "PPT to PDF",
      description: "Convert PowerPoint presentations to PDF documents"
    },
    {
      icon: FileImage,
      label: "Image to PDF",
      description: "Convert files in JPG, PNG, BMP and other image formats to those in PDF"
    },
    {
      icon: FileSearch,
      label: "Image to Text",
      description: "Recognize the text in the images, copy it easily with one click"
    }
  ];

  const editTools: Tool[] = [
    {
      icon: FilePlus,
      label: "Merge PDF",
      description: "Merge multiple PDF files into one online"
    },
    {
      icon: Scissors,
      label: "Extract PDF Pages",
      description: "Extract specific pages from a PDF and store them as a new PDF"
    },
    {
      icon: FileText,
      label: "Delete PDF Pages",
      description: "Delete one or more pages from a PDF to generate a new PDF"
    },
    {
      icon: FileText,
      label: "Sort PDF Pages",
      description: "Adjust the order of PDF pages, delete or rotate pages freely"
    },
    {
      icon: RotateCw,
      label: "Rotate PDF",
      description: "Rotate all or specific pages in a PDF with ease and convenience"
    },
    {
      icon: PenTool,
      label: "Sign PDF",
      description: "Add e-signatures to your PDF by importing images",
      isProFeature: true
    },
    {
      icon: Lock,
      label: "PDF Password",
      description: "Add a password and encrypt your PDF file",
      isProFeature: true
    },
    {
      icon: FileKey,
      label: "Bank Statement",
      description: "Recognize and convert your bank statement accurately with AI-powered technology"
    },
    {
      icon: Stamp,
      label: "PDF Watermark",
      description: "Stamp an image or text over your PDF in seconds",
      isProFeature: true
    }
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-6">Convert</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {convertTools.map((tool) => (
            <ToolCard key={tool.label} {...tool} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Edit</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {editTools.map((tool) => (
            <ToolCard key={tool.label} {...tool} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tools;
