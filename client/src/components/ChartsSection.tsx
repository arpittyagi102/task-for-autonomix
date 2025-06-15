"use client"

import { useMemo } from "react"
import { Label, Pie, PieChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ActionItem } from "@/lib/types"

import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    value: {
        label: "Tasks",
    },
} satisfies ChartConfig

export default function ChartsSection({ items }: { items: ActionItem[]}) {

    const ChartData = useMemo(() => {
        const summaryMap = {
            low: { tasks: 0, complete: 0, incomplete: 0 },
            medium: { tasks: 0, complete: 0, incomplete: 0 },
            high: { tasks: 0, complete: 0, incomplete: 0 },
        };
        let totalComplete = 0;
        let totalIncomplete = 0;

        items.forEach((item) => {
            let priorityKey: "low" | "medium" | "high";

            switch (item.priority) {
                case 1:
                    priorityKey = "low";
                    break;
                case 2:
                    priorityKey = "medium";
                    break;
                case 3:
                    priorityKey = "high";
                    break;
                default:
                    return;
            }

            summaryMap[priorityKey].tasks += 1;

            if (item.isCompleted) {
                summaryMap[priorityKey].complete += 1;
                totalComplete += 1;
            } else {
                summaryMap[priorityKey].incomplete += 1;
                totalIncomplete += 1;
            }
        });

        const pieData = [
            { priority: "low", tasks: summaryMap.low.tasks , fill: "#4ade80"},
            { priority: "medium", tasks: summaryMap.medium.tasks, fill: "#facc15" },
            { priority: "high", tasks: summaryMap.high.tasks, fill: "#f87171" },
        ]

        const barData = [
            { priority: "low", ...summaryMap.low },
            { priority: "medium", ...summaryMap.medium },
            { priority: "high", ...summaryMap.high },
        ]

        const percentComplete = Math.round((totalComplete/(totalIncomplete + totalComplete)) * 100);

        return { pieData, barData, percentComplete };
    }, [items]);

    return (
        <Card className="flex flex-col min-w-[250px] bg-white/5 backdrop-blur-lg rounded-lg px-4 py-2 border border-white/10 gap-5">
            <CardTitle className="pb-0 mb-0 text-lg text-center text-neutral-300 font-mono">Agile Work Enviroment</CardTitle>
            <CardContent className="flex-1 pb-0 pt-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[200px] mb-5">
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={ChartData.pieData}
                            dataKey="tasks"
                            nameKey="priority"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="text-3xl font-bold fill-neutral-300"
                                                >
                                                    {ChartData.percentComplete}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-neutral-300"
                                                >
                                                    % completed
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>

                <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[200px]">
                    <BarChart accessibilityLayer data={ChartData.barData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="priority"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Bar
                            dataKey="complete"
                            stackId="a"
                            fill="#0369a1"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="incomplete"
                            stackId="a"
                            fill="#38bdf8"
                            radius={[0, 0, 4, 4]}
                        />
                    </BarChart>
                </ChartContainer>

            </CardContent>
        </Card>
    )
}
