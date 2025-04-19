
import { Home, FileText, Settings, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ icon: Icon, label, path, isActive }: { icon: any; label: string; path: string; isActive: boolean }) => (
  <Link
    to={path}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive ? "bg-sidebar-active text-white" : "hover:bg-sidebar-hover text-gray-700"
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: FileText, label: "My Documents", path: "/documents" },
    { icon: Settings, label: "Tools", path: "/tools" },
    { icon: Trash2, label: "Trash", path: "/trash" },
  ];

  return (
    <div className="w-64 h-screen bg-sidebar-bg border-r border-gray-200 p-4 flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3 mb-6">
        <img src="/lovable-uploads/59b2d1a9-d4a0-4d3f-a82e-c51c2f267c4b.png" alt="Logo" className="w-8 h-8" />
        <span className="text-xl font-semibold">CamScanner</span>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={location.pathname === item.path}
          />
        ))}
      </nav>

      <div className="mt-auto">
        <button className="w-full px-4 py-2 text-sm border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
          Download For PC/Mac
        </button>
        <div className="mt-4 px-4 text-sm text-gray-500">
          <span>0B / 1.00GB</span>
          <button className="ml-2 text-primary hover:underline">Expand</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
