import { findProducts } from "@/lib/actions/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { searchTerm: string } }) {
    const products = await findProducts(params.searchTerm);
    if (!products || products.length === 0) return NextResponse.json([]);
    return NextResponse.json(products);
}
