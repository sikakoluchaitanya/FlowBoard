"use client";;
import { use } from "react";

import { EmptyOrg } from "./_components/empty-org";
import { useOrganization } from "@clerk/nextjs";
import { BoardList } from "./_components/board-list";

interface DashboardPageProps {
  searchParams: Promise<{
    search?: string;
    favorites?: string;
  }>;
}

const Dashboard = (props: DashboardPageProps) => {
  const searchParams = use(props.searchParams);
  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6"> 
      {!organization ? ( <EmptyOrg /> ) : (
        <BoardList 
            orgId={organization.id} 
            query={searchParams} 
        />
      )}
    </div>
  );
};

export default Dashboard;
