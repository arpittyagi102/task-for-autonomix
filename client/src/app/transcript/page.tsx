'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ActionItem, ActionItemFromServer } from '@/lib/types';
import { addMultipleActionItems } from "@/store/slices/actionItems"
import { useAppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const dispatch = useAppDispatch();
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const transcript = formData.get("transcript") as string;

        if (!transcript) {
            alert("Please enter a call transcript.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(API_URL + "/ai/getActionItems", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ transcript }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = (await response.json()).actionItems;
            const itemsWithIds = (data as ActionItemFromServer[]).map((item) => ({
                ...item,
                id: `TASK-${crypto.randomUUID()}`,
                isCompleted: false
            })) as ActionItem[];


            // ✅ Dispatch to Redux store
            dispatch(addMultipleActionItems(itemsWithIds));

            // ✅ Navigate to tasks page
            router.push("/tasks");

        } catch (error) {
            console.error("Error fetching action items:", error);
            alert("Failed to retrieve action items. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <h1 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    AI Task Extractor
                </h1>
                <p className="text-center text-gray-300 mb-8">
                    Transform your conversation into actionable tasks
                </p>

                <motion.form
                    onSubmit={handleSubmit}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <textarea
                        className="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Paste your conversation transcript here..."
                        name="transcript"
                    />
                    <motion.button
                        type="submit"
                        className={cn(
                            "mt-4 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-medium cursor-pointer",
                            "hover:from-purple-600 hover:to-blue-600 transition-all duration-300",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Extract Tasks'}
                    </motion.button>
                </motion.form>
            </motion.div>
        </div>
    );
}