"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

type PaginationParams = {
  page: number;
  totalPages: number;
};

const Pagination = ({ page, totalPages }: PaginationParams) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChangePage = (btnType: string) => {
    const pageValue = btnType === "prev" ? Number(page - 1) : Number(page + 1);

    // .toString() because it URL so we need to convert it to string
    const paginationParam = new URLSearchParams(searchParams.toString());

    paginationParam.set("page", pageValue.toString());

    router.push(`?${paginationParam}`, { scroll: false });
  };

  return (
    <div className="mt-14 flex gap-2">
      <Button
        size="lg"
        variant="outline"
        onClick={() => onChangePage("prev")}
        disabled={page <= 1}
        className="w-28"
      >
        &larr; Prev
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => onChangePage("next")}
        disabled={page >= totalPages}
        className="w-28"
      >
        Next &rarr;
      </Button>
    </div>
  );
};

export default Pagination;
