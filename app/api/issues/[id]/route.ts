import db from "@/prisma/db";
import { issueSchema, patchIssueSchema } from "@/schemas/issueSchema";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ success: false, errors: {} }, { status: 401 });
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
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const result = patchIssueSchema.safeParse(body);

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

  const { assignedToUserId, title, description } = body;

  if (assignedToUserId) {
    const user = await db.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  const issue = await db.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await db.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  revalidatePath("/issues");
  return NextResponse.json(
    { success: true, data: updatedIssue },
    { status: 200 },
  );
}
