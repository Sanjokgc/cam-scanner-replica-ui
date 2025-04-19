
import { Search, Upload, Camera } from "lucide-react";
import Sidebar from "./Sidebar";
import { Button } from "./ui/button";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search my files..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <Button className="bg-primary hover:bg-primary-hover text-white gap-2">
              <Upload size={20} />
              Upload
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white gap-2">
              <Camera size={20} />
              Capture
            </Button>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
