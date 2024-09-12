import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 20;

  const res = await fetch(`https://next-ecommerce-api.vercel.app/products?limit=${limit}&page=${page}`);
  const data = await res.json();

  return NextResponse.json(data);
}