import AdminGuard from "@/components/common/AdminGuard";
import Appsidebar from "@/components/Layout/sidebar/Appsidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Footer from "@/components/Layout/footer/footer";
import Topbar from "@/components/Layout/topbar/Topbar";
import { getCategory } from "@/apiServices/category/allCatergory";

export default async function AdminLayout({ children }) {

  const categories = await getCategory()


  return (
    <AdminGuard>
    <SidebarProvider>
      <Appsidebar categoryData={categories} />

      <Topbar />
      <main className="w-full flex flex-col justify-between">
        <div className="w-full min-h-[calc(100vh-45px)] pt-25 px-3">
          {children}
        </div>
        <Footer />
      </main>
    </SidebarProvider>
    </AdminGuard>
  );
}
