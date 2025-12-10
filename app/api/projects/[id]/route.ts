import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Stub
  const id = params.id;
  return NextResponse.json({ message: `API endpoint for fetching project ${id}` });
}
