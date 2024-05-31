import Image from "next/image";
import postgres from "postgres";
import { useState } from "react";
import MainPage from "@/components/pages/main";

export default function Home() {

  return (
    <main>
      <div>
        <MainPage/>
      </div>
    </main>
  );
}
