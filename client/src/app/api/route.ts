export async function GET() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    return new Response("Welcome to Backend");
}