
import { FileText, FileSpreadsheet, FilePresentation, Image, FilePlus, Trash2, Grid } from "lucide-react";

const ToolButton = ({ icon: Icon, label, description }: { icon: any; label: string; description: string }) => (
  <button className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all w-full">
    <div className="p-2 rounded-lg bg-gray-50">
      <Icon size={24} className="text-primary" />
    </div>
    <div className="text-left">
      <h3 className="font-medium">{label}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </button>
);

const Index = () => {
  const tools = [
    {
      icon: FileText,
      label: "PDF to Word",
      description: "Convert PDF to editable Word document",
    },
    {
      icon: FileSpreadsheet,
      label: "PDF to Excel",
      description: "Convert PDF to editable Excel spreadsheet",
    },
    {
      icon: FilePresentation,
      label: "PDF to PPT",
      description: "Convert PDF to PowerPoint presentation",
    },
    {
      icon: Image,
      label: "PDF to JPG",
      description: "Convert PDF pages to JPG images",
    },
    {
      icon: FilePlus,
      label: "Merge PDF",
      description: "Combine multiple PDF files into one",
    },
    {
      icon: Trash2,
      label: "Delete PDF Pages",
      description: "Remove pages from PDF document",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Recent</h2>
        <button className="flex items-center gap-2 text-primary hover:underline">
          <Grid size={20} />
          View All Tools
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <ToolButton key={tool.label} {...tool} />
        ))}
      </div>

      {/* Empty state for recent documents */}
      <div className="text-center py-12">
        <p className="text-gray-500">No file available. Upload one and try</p>
      </div>
    </div>
  );
};

export default Index;
