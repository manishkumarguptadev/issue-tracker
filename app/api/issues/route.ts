import { issueSchema } from "@/schemas/issueSchema";
import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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

  const newIssue = await db.issue.create({
    data: { ...result.data },
  });
  return NextResponse.json({ success: true, data: newIssue }, { status: 201 });
}
