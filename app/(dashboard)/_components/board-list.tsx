"use client";

import React from "react";
import { use } from "react";
import { EmptySearch } from "./empty-search";
import { EmptyBoard } from "./empty-board";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
    const data = [];

    if(!data?.length && query.search) {
        return(
            <div>
                <EmptySearch />
            </div>
        )
    }

    if(!data?.length && query.favorites) {
        return(
            <div>
                No favorites  {/* // have to enter the images for the boards similar to emptysearch component */}
            </div>
        )
    }

    if(!data?.length) {
        return(
            <EmptyBoard />
        )
    }

  return (
    <div>
        {JSON.stringify(query)}
    </div>
  );
};
