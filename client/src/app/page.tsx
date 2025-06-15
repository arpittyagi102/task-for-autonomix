'use client'
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PAGE() {
    const [buttonStatus, setButtonStatus] = useState("Get Started");
    const [serverStatus, setServerStatus] = useState("loading");
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    useEffect(() => {
        bootupBackend();
    }, []);

    useEffect(() => {
        if (serverStatus === "ready" && (buttonStatus === "loading" || buttonStatus === "Ready to Go")) {
            router.push('/transcript');
        }
    }, [serverStatus, buttonStatus]);


    async function bootupBackend() {
        if (!API_URL) {
            setButtonStatus("Backend API_URL is not set in env");
            return;
        }

        try {
            const response = await fetch(API_URL);
            if (response.ok) {
                if (buttonStatus === "loading") {
                    router.push("/transcript");
                } else {
                    console.log("button status after api call", buttonStatus)
                }
                setServerStatus("ready")
                setButtonStatus("Ready to Go")
            } else {
                setButtonStatus("Not able to connect to Backend");
            }
        } catch (e) {
            console.log(e)
            setButtonStatus("Error connecting to Backend");
        }
    }


    function handleClick() {
        if (serverStatus == "loading") {
            setButtonStatus("loading");
        } else if (serverStatus == "ready") {
            router.push('/transcript');
        }
    }

    return (
        <section className="border-grid h-screen flex items-center justify-center">
            <div className="container flex flex-col items-center gap-5 py-8 text-center md:py-16 lg:py-20 xl:gap-4">

                <h1 className="font-extrabold text-3xl  md:text-7xl p-5 text-transparent bg-clip-text bg-gradient-to-t to-white/90 from-white/10">
                    Get Things Done Faster
                </h1>

                <p className="text-neutral-500 max-w-3xl text-base text-balance tex-xs md:text-lg">
                    Convert your transcript into meaningful and actionable items, and beautiful charts
                </p>

                <motion.button onClick={handleClick} className="border bg-gradient-to-l hover:bg-gradient-to-r to-purple-500/40 from-indigo-500/10 text-lg px-10 py-2 rounded-full">
                    {buttonStatus == "loading" ? <span className="flex gap-5">Loading <Loader className="-mb-5 animate-spin" /></span> : buttonStatus}
                </motion.button>
            </div>
        </section>
    )
}