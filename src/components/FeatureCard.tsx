import { motion } from "framer-motion"
import { CheckCircle } from 'lucide-react'

export function FeatureCard({ icon: Icon, title, description, delay }: {
    icon: typeof CheckCircle
    title: string
    description: string
    delay: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            viewport={{ once: true }}
            className="relative p-8 overflow-hidden transition-colors border rounded-lg group hover:border-emerald-500"
        >
            <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 mb-4 transition-colors rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white">
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="absolute w-40 h-40 transition-transform border rounded-full -right-12 -top-12 border-emerald-500/20 group-hover:scale-150" />
        </motion.div>
    )
}