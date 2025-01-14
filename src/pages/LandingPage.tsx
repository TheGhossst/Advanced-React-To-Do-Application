import { motion } from "framer-motion"
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { AnimatedText } from '../components/ui/animated-text'
import { CheckCircle, Clock, List } from 'lucide-react'
import { FeatureCard } from "@/components/FeatureCard"

export function LandingPage() {
    return (
        <main className="flex-1">
            <section className="relative w-full py-12 overflow-hidden md:py-24 lg:py-32 xl:py-48 bg-dot-pattern">
                <div className="container px-4 mx-auto md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-8 text-center">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block px-3 py-1 text-sm rounded-lg bg-emerald-500/10 text-emerald-500"
                        >
                            Organize Better
                        </motion.div>
                        <AnimatedText
                            text="Transform Your Productivity with DoIt"
                            className="relative z-10 max-w-3xl mx-auto text-4xl font-extrabold leading-tight tracking-tight text-center sm:text-5xl md:text-6xl lg:text-7xl"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
                        >
                            Stay organized, focused, and accomplish more with our intuitive todo application.
                            Built for individuals and teams who want to achieve their goals efficiently.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            <Link to="/login">
                                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                                    Get Started
                                </Button>
                            </Link>
                            <Link to="/features">
                                <Button size="lg" variant="outline">
                                    Learn More
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
                <div className="absolute inset-0 w-full h-full bg-white -z-10 dark:bg-gray-950">
                    <div className="absolute h-full w-full bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
                </div>
            </section>

            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 mx-auto md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="space-y-2"
                        >
                            <div className="inline-block px-3 py-1 text-sm rounded-lg bg-emerald-500/10 text-emerald-500">
                                Features
                            </div>
                            <h2 className="max-w-2xl mx-auto text-3xl font-bold tracking-tighter sm:text-5xl">
                                Everything you need to stay productive
                            </h2>
                            <p className="max-w-[900px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Powerful features to help you manage tasks, collaborate with your team, and achieve your goals.
                            </p>
                        </motion.div>
                    </div>
                    <div className="grid max-w-5xl gap-8 pt-12 mx-auto sm:grid-cols-2 lg:grid-cols-3">
                        <FeatureCard
                            icon={CheckCircle}
                            title="Task Management"
                            description="Create, organize, and track your tasks with our intuitive interface."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={Clock}
                            title="Time Tracking"
                            description="Monitor your productivity and track time spent on each task."
                            delay={0.4}
                        />
                        <FeatureCard
                            icon={List}
                            title="Priority Levels"
                            description="Set task priorities and focus on what matters most to you."
                            delay={0.6}
                        />

                    </div>
                </div>
            </section>

            <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50 dark:bg-emerald-950/20">
                <div className="container px-4 mx-auto md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center justify-center space-y-4 text-center"
                    >
                        <div className="space-y-2">
                            <h2 className="max-w-2xl mx-auto text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Ready to get started?
                            </h2>
                            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Join thousands of users who are already improving their productivity with DoIt.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/login">
                                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                                    Get Started for Free
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button size="lg" variant="outline">
                                    Contact Sales
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
            <footer className="py-6 border-t">
                <div className="container px-4 mx-auto md:px-6">
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                        © 2024 DoIt. All rights reserved.
                    </p>
                </div>
            </footer>
        </main>

    )
}
