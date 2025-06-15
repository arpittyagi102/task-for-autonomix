export async function POST() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return new Response(JSON.stringify({ actionItems: dummyData }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const dummyData = [
    {
        task: "Follow up with the client about the project timeline",
        priority: 1,
    },
    {
        task: "Prepare the presentation for next week's meeting",
        priority: 2,
    },
    {
        task: "Review the budget proposal and send feedback",
        priority: 3,
    },
    {
        task: "Schedule a team meeting to discuss project updates",
        priority: 1,
    },
    {
        task: "Update the project documentation with recent changes",
        priority: 2,
    },
];
