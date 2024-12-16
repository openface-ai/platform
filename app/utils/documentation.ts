export async function getDocumentationContent(fileName: string): Promise<{ content: string; data: string }> {
  const response = await fetch(`/api/docs/${fileName}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch documentation: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}