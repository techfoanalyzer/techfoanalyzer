import Appsidebar from "@/components/Layout/sidebar/Appsidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Footer from "@/components/Layout/footer/footer";
import Topbar from "@/components/Layout/topbar/Topbar";
import { getCategory } from "@/apiServices/category/allCatergory";

export default  async function MainLayout({ children }) {
  const categories = await getCategory()

 
  
  return (
    <SidebarProvider>
      <Appsidebar categoryData={categories} />

      <Topbar />
      

      <main className="w-full flex flex-col justify-between">
        <div className="w-full min-h-[calc(100vh-45px)] pt-5 px-2 md:px-1">
          {children}
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  );
}


// import Appsidebar from "@/components/Layout/sidebar/Appsidebar";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import Footer from "@/components/Layout/footer/footer";
// import Topbar from "@/components/Layout/topbar/Topbar";

// export default function MainLayout({ children }) {
//   return (
//     <>
    
//     <SidebarProvider>
//       <Appsidebar  />
//       <Topbar />
//       <main className=" w-full ">
//         <div className="w-full min-h-[calc(100vh-45px)] pt-25 px-10">
//           {children}
//         </div>
//         <Footer />
//       </main>
//     </SidebarProvider>
//     </>
//   );
// }
