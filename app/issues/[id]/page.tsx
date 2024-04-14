import { Badge } from "@/components/ui/badge";
import db from "@/prisma/db";
import { notFound } from "next/navigation";
import MoreOptions from "./MoreOptions";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

async function IssueDetailPage({ params }: { params: { id: string } }) {
  if (isNaN(+params.id)) notFound();
  const issue = await db.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  const session = await getServerSession(authOptions);

  return (
    <div className="m-4 grid gap-4 md:grid-cols-[1fr_250px]">
      <div className=" grid gap-2">
        <h1 className="text-3xl font-bold">{issue.title}</h1>
        <div className="flex gap-4 text-sm text-muted-foreground">
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
          <span>{issue.createdAt.toDateString()}</span>
        </div>
        <div className="mt-2 min-h-40 max-w-3xl rounded-md border p-2">
          {issue.description}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {session && <MoreOptions id={issue.id} />}
      </div>
    </div>
  );
}

export default IssueDetailPage;
