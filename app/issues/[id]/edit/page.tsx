import db from "@/prisma/db";
import { notFound } from "next/navigation";
import IssueForm from "../../IssueForm";

async function EditIssuePage({ params }: { params: { id: string } }) {
  if (isNaN(+params.id)) notFound();
  const issue = await db.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}

export default EditIssuePage;
