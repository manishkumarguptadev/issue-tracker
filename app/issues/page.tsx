import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/prisma/db";

import { Issue, Status } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import authOptions from "../auth/authOptions";
import IssueStatusFilter from "./IssueStatusFilter";
import MoreOptions from "./MoreOptions";
import Pagination from "./Pagination";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    sort: "asc" | "desc";
    page: string;
  };
}
export default async function IssuesPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const columns: {
    label: string;
    value: keyof Issue;
    classes: string;
  }[] = [
    { label: "Issue", value: "title", classes: "" },
    { label: "Status", value: "status", classes: "hidden sm:table-cell" },
    { label: "Created", value: "createdAt", classes: "hidden lg:table-cell" },
  ];

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.sort }
    : undefined;

  const pageSize = 10;
  const issueCount = await db.issue.count({
    where: {
      status,
    },
  });
  const pageCount = Math.ceil(issueCount / pageSize);

  const page =
    +searchParams.page > 1 && +searchParams.page <= pageCount
      ? +searchParams.page
      : 1;

  const issues = await db.issue.findMany({
    where: {
      status,
    },
    orderBy,
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <IssueStatusFilter />
        <Button asChild>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-accent">
              {/* <TableHead>Issue</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell">Created</TableHead>
              <TableHead></TableHead> */}
              {columns.map((column) => (
                <TableHead className={column.classes} key={column.value}>
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: column.value,
                        sort:
                          column.value === searchParams.orderBy
                            ? searchParams.sort === "asc"
                              ? "desc"
                              : "asc"
                            : "asc",
                      },
                    }}
                  >
                    {column.label}
                  </Link>
                  {column.value === searchParams.orderBy &&
                    (searchParams.sort === "asc" ? (
                      <BsArrowDown className="m-1 inline" />
                    ) : (
                      <BsArrowUp className="m-1 inline" />
                    ))}
                </TableHead>
              ))}
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>
                  <div className="font-medium">
                    <Button asChild variant={"link"}>
                      <Link href={`/issues/${issue.id}`} className="pl-0">
                        {issue.title}
                      </Link>
                    </Button>
                  </div>
                  <Badge
                    className={`${
                      issue.status === "CLOSED"
                        ? "bg-green-50 text-green-500"
                        : issue.status === "OPEN"
                          ? "bg-red-50 text-red-500"
                          : "bg-violet-50 text-violet-500"
                    } sm:hidden`}
                    variant={"outline"}
                  >
                    {issue.status}
                  </Badge>
                  <div className="font-medium lg:hidden">
                    {issue.createdAt.toDateString()}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge
                    className={
                      issue.status === "CLOSED"
                        ? "bg-green-50 text-green-500"
                        : issue.status === "OPEN"
                          ? "bg-red-50 text-red-500"
                          : "bg-violet-50 text-violet-500"
                    }
                    variant={"outline"}
                  >
                    {issue.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {issue.createdAt.toDateString()}
                </TableCell>
                <TableCell>
                  {session && <MoreOptions id={issue.id} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {pageCount > 1 && (
        <Pagination
          searchParams={searchParams}
          pageCount={pageCount}
          currentPage={page}
          pageSize={pageSize}
          issueCount={issueCount}
        />
      )}
    </>
  );
}
