import { updateUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {

    const { email, updates } = await request.json();

    const updatedUser = await updateUser(email, updates);

    if (!updatedUser) {
        return NextResponse.json('User not found', { status: 404 });

    } else {
        return redirect(process.env.DOMAIN + "/payments");
    }

}
