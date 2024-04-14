import { issueSchema } from "@/schemas/issueSchema";
import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ success: false, errors: {} }, { status: 401 });

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
  revalidatePath("/issues");
  return NextResponse.json({ success: true, data: newIssue }, { status: 201 });
}
