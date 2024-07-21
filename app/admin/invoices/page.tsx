'use client'
import DashboardHeader from "@/app/components/Admin/DashboardHeader"
import AllInvoices from "@/app/components/Admin/Order/AllInvoices"
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar"
import Heading from "@/app/utils/Heading"

type Props={}

const page = (props: Props) => {
  return (
    <div>
        <Heading
         title="Invoices | Dev-Learning - Admin"
         description="ELearning is a platform for students to learn and get help from teachers"
         keywords="Prograaming,MERN,Redux,Machine Learning"
        />
        <div className="flex">
            <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar />
            </div>
            <div className="w-[85%]">
               <DashboardHeader />
               <AllInvoices />
            </div>
        </div>
    </div>
  )
}

export default page