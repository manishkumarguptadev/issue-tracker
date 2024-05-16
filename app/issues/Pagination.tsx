import { Button } from "@/components/ui/button";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import {
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
  RxChevronLeft,
  RxChevronRight,
} from "react-icons/rx";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    sort: "asc" | "desc";
    page: string;
  };
  pageCount: number;
  currentPage: number;
  pageSize: number;
  issueCount: number;
}
export default function Pagination({
  searchParams,
  pageCount,
  currentPage,
  pageSize,
  issueCount,
}: Props) {
  return (
    <nav
      className="flex items-center justify-between bg-background px-4 py-3  sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-foreground">
          Showing{" "}
          <span className="font-medium">
            {(currentPage - 1) * pageSize + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(currentPage * pageSize, issueCount)}
          </span>{" "}
          of <span className="font-medium">{issueCount}</span> issues
        </p>
      </div>
      <div className="flex flex-1 justify-between gap-2 sm:justify-end">
        <Button
          variant={"outline"}
          className={`${currentPage === 1 ? "pointer-events-none" : "bg-accent hover:bg-input dark:hover:bg-muted-foreground"}`}
          asChild
        >
          <Link
            href={{
              query: {
                ...searchParams,
                page: 1,
              },
            }}
          >
            <RxDoubleArrowLeft />
          </Link>
        </Button>
        <Button
          variant={"outline"}
          className={`${currentPage === 1 ? "pointer-events-none" : "bg-accent hover:bg-input dark:hover:bg-muted-foreground"}`}
          asChild
        >
          <Link
            href={{
              query: {
                ...searchParams,
                page: currentPage > 2 ? currentPage - 1 : 1,
              },
            }}
          >
            <RxChevronLeft />
          </Link>
        </Button>
        <Button
          variant={"outline"}
          className={`${currentPage === pageCount ? "pointer-events-none" : "bg-accent hover:bg-input dark:hover:bg-muted-foreground"}`}
          asChild
        >
          <Link
            href={{
              query: {
                ...searchParams,
                page: currentPage < pageCount ? currentPage + 1 : pageCount,
              },
            }}
          >
            <RxChevronRight />
          </Link>
        </Button>
        <Button
          variant={"outline"}
          className={`${currentPage === pageCount ? "pointer-events-none" : "bg-accent hover:bg-input dark:hover:bg-muted-foreground"}`}
          asChild
        >
          <Link
            href={{
              query: {
                ...searchParams,
                page: pageCount,
              },
            }}
          >
            <RxDoubleArrowRight />
          </Link>
        </Button>
      </div>
    </nav>
  );
}
