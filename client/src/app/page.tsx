'use client';
export default function Home() {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const transcript = formData.get("transcript") as string;
        if (!transcript) {
            alert("Please enter a call transcript.");
            return;
        }
        fetch("http://localhost:5000/ai/getActionItems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ transcript }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Action Items:", data.actionItems);
                alert("Action items retrieved successfully! Check console for details.");
            })
            .catch((error) => {
                console.error("Error fetching action items:", error);
                alert("Failed to retrieve action items. Please try again.");
            });
    }            

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="border border-gray-300 p-2 rounded-md"
                    placeholder="Enter call transcript"
                    name="transcript"
                />
                <button
                    type="submit"
                    className="mt-2 bg-blue-500 text-white p-2 rounded-md"
                >
                    Get Action Items
                </button>
            </form>
        </div>
    );
}
