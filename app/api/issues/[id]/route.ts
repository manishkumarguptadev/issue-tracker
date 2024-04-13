import db from "@/prisma/db";
import { issueSchema } from "@/schemas/issueSchema";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const issue = await db.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return NextResponse.json(
      { success: false, error: "Issue not found" },
      { status: 404 },
    );
  }
  await db.issue.delete({
    where: { id: parseInt(params.id) },
  });
  revalidatePath("/issues");
  return NextResponse.json({ success: true, data: {} }, { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await request.json();

  const result = issueSchema.safeParse(body);

  if (!result.success) {
    let zoderrors = {};
    result.error.issues.forEach(
      (issue) => (zoderrors = { ...zoderrors, [issue.path[0]]: issue.message }),
    );
    return NextResponse.json(
      { success: false, errors: zoderrors },
      { status: 400 },
    );
  }
  const issue = await db.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return NextResponse.json(
      { success: false, error: "Issue not found" },
      { status: 404 },
    );
  }
  const updatedIssue = await db.issue.update({
    where: { id: parseInt(params.id) },
    data: { ...result.data },
  });
  revalidatePath("/issues");
  return NextResponse.json(
    { success: true, data: updatedIssue },
    { status: 200 },
  );
}
