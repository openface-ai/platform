import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(req: NextRequest, { params }: { params: { fileName: string } }) {
  const { fileName } = await params;

  if (!fileName || typeof fileName !== 'string') {
    return NextResponse.json({ error: 'Invalid file name' }, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), 'docs', `${fileName}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return NextResponse.json({ content, data }, { status: 200 });
  } catch (error) {
    console.error('Error reading the documentation file:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}