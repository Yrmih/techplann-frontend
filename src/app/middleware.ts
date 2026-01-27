
import { redirect } from "next/navigation";

export default function RootPage() {
  // Se aqui estiver "/dashboard/registrations", mude para:
  redirect("/dashboard"); 
}