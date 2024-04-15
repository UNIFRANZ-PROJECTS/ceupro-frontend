import { useSeasonStore } from "@/hooks";
import { useEffect } from "react";

export const DashboardView = () => {
  const { getSeasons } = useSeasonStore();
  useEffect(() => {
    getSeasons();
  }, [])
  
  return (
    <div>DashboardView</div>
  )
}
