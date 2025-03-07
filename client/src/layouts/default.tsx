
import { Header } from "@/components/header";
import Sidebar from "@/components/sidebar";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative font-poppins text-foreground bg-background h-screen overflow-hidden flex flex-col bg-gradient-to-b from-custom-blue-dark to-custom-blue-light">
      <Header />
      <main className="container mx-auto px-3 flex">
        <div className="w-64 h-screen shadow-sm shadow-gray-500 fixed left-0 top-16 p-4">
          <Sidebar />
        </div>
        <div className="ml-64 w-full p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
