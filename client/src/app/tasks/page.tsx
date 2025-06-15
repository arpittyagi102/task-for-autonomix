'use client'

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Trash2, Search } from "lucide-react";
import { ActionItem } from "@/lib/types";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { toggleActionItemCompletion, removeActionItem, updatePriority } from "@/store/slices/actionItems";
import { priorityColors } from "@/lib/constants";
import { useCallback, useEffect, useState, useMemo } from "react";
import PieChart from "@/components/ChartsSection"
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Page() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const actionItems = useAppSelector((state) => state.actionItems);

    // Filter and sort state
    const [searchQuery, setSearchQuery] = useState("");
    const [completionFilter, setCompletionFilter] = useState<"all" | "completed" | "pending">("all");
    const [priorityFilter, setPriorityFilter] = useState<"all" | "1" | "2" | "3">("all");
    const [sortBy, setSortBy] = useState<"priority" | "completion" | "none">("none");

    // Filtered and sorted items
    const filteredItems = useMemo(() => {
        let filtered = [...actionItems];

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.task.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply completion filter
        if (completionFilter !== "all") {
            filtered = filtered.filter(item =>
                completionFilter === "completed" ? item.isCompleted : !item.isCompleted
            );
        }

        // Apply priority filter
        if (priorityFilter !== "all") {
            filtered = filtered.filter(item =>
                item.priority === Number(priorityFilter)
            );
        }

        // Apply sorting
        if (sortBy !== "none") {
            filtered.sort((a, b) => {
                if (sortBy === "priority") {
                    return b.priority - a.priority;
                } else if (sortBy === "completion") {
                    return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
                }
                return 0;
            });
        }

        return filtered;
    }, [actionItems, searchQuery, completionFilter, priorityFilter, sortBy]);

    useEffect(() => {
        if (actionItems.length == 0) {
            router.push('/transcript')
        }
    }, [router, actionItems])

    const toggleTask = useCallback((id: string) => {
        dispatch(toggleActionItemCompletion(id));
    }, [dispatch]);

    const deleteTask = useCallback((id: string) => {
        dispatch(removeActionItem(id));
    }, [dispatch]);

    const updateTaskPriority = useCallback((id: string, newPriority: 1 | 2 | 3) => {
        dispatch(updatePriority({ id, priority: newPriority }));
    }, [dispatch]);

    return (
        <div className="flex flex-col gap-8 mx-auto px-2 md:px-4 py-12 md:max-w-10/12">
            <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-lg rounded-lg px-3 py-2 border border-white/10">
                    <Search className="w-4 h-4 text-white/50" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm w-48 placeholder:text-white/50"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    <Select value={completionFilter} onValueChange={(value: "all" | "completed" | "pending") => setCompletionFilter(value)}>
                        <SelectTrigger className="w-[140px] bg-white/5 backdrop-blur-lg border-white/10">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={priorityFilter} onValueChange={(value: "all" | "1" | "2" | "3") => setPriorityFilter(value)}>
                        <SelectTrigger className="w-[140px] bg-white/5 backdrop-blur-lg border-white/10">
                            <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Priority</SelectItem>
                            <SelectItem value="3">High</SelectItem>
                            <SelectItem value="2">Medium</SelectItem>
                            <SelectItem value="1">Low</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={(value: "priority" | "completion" | "none") => setSortBy(value)}>
                        <SelectTrigger className="w-[140px] bg-white/5 backdrop-blur-lg border-white/10">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">No Sort</SelectItem>
                            <SelectItem value="priority">Priority</SelectItem>
                            <SelectItem value="completion">Completion</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col gap-5 md:flex-row justify-evenly">
                <div className="left">
                    <AnimatePresence>
                        {filteredItems.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-4"
                            >
                                {filteredItems.map((item) => (
                                    <Task key={item.id} item={item} toggleTask={toggleTask} updateTaskPriority={updateTaskPriority} deleteTask={deleteTask} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-white/50 py-8"
                            >
                                No tasks found matching your filters
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="right">
                    <PieChart items={filteredItems} />
                </div>
            </div>
        </div>
    );
}

function Task({ item, toggleTask, updateTaskPriority, deleteTask }: TaskProps) {

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={cn(
                "bg-white/5 backdrop-blur-lg rounded-lg px-2 md:px-4 md:py-2 text-xs md:text-lg border border-white/10",
                "flex items-center gap-1 md:gap-4 group hover:bg-white/10 transition-all"
            )}
        >
            <button
                onClick={() => toggleTask(item.id)}
                className={cn(
                    "w-4 h-4 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all",
                    item.isCompleted
                        ? "bg-green-500 border-green-500"
                        : "border-white/30 hover:border-white/50"
                )}
            >
                {item.isCompleted && <Check className="w-4 h-4 text-white" />}
            </button>

            <div className="flex-1">
                <p className={item.isCompleted ? "line-through text-gray-400" : ""}>
                    {item.task}
                </p>
            </div>

            <div className="flex items-center gap-1">
                <select
                    value={item.priority}
                    onChange={(e) => updateTaskPriority(item.id, Number(e.target.value) as 1 | 2 | 3)}
                    className={cn(
                        "md:px-3 md:py-1 rounded-full text-xs font-medium border",
                        priorityColors[item.priority],
                        "hover:bg-white/5 transition-all"
                    )}
                >
                    <option value={3}>High</option>
                    <option value={2}>Medium</option>
                    <option value={1}>Low</option>
                </select>

                <button
                    onClick={() => deleteTask(item.id)}
                    className="md:p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                >
                    <Trash2 className="w-3 h-3 md:w-5 md:h-5" />
                </button>
            </div>
        </motion.div>
    )
}

interface TaskProps {
    item: ActionItem;
    toggleTask: (id: string) => void;
    updateTaskPriority: (id: string, newPriority: 1 | 2 | 3) => void;
    deleteTask: (id: string) => void;
}