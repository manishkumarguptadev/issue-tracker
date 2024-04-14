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

import Link from "next/link";
import MoreOptions from "./MoreOptions";

export default async function IssuesPage() {
  const issues = await db.issue.findMany();
  return (
    <>
      <div className="mb-4 flex items-center">
        <Button asChild>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-accent">
              <TableHead>Issue</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell">Created</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>
                  <div className="font-medium">
                    <Button asChild variant={"link"}>
                      <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
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
                  <MoreOptions id={issue.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
