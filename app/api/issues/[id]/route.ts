import db from "@/prisma/db";
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
