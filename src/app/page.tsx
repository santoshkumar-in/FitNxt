//import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
//import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "FitNxt Dashboard",
  description: "This is FitNxt Dashboard",
};

export default function Home() {
  return (
    <>
      Home Page
      {/* <DefaultLayout>
        <ECommerce />
      </DefaultLayout> */}
    </>
  );
}
