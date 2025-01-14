interface TaskProgressProps {
    total: number;
    completed: number;
}

export function TaskProgress({ total, completed }: TaskProgressProps) {
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                    className="text-muted-foreground/30"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                />
                <circle
                    className="text-gradient"
                    strokeWidth="10"
                    strokeDasharray={`${percentage * 2.51327}, 251.327`}
                    strokeLinecap="round"
                    stroke="url(#gradient)"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    transform="rotate(-90 50 50)"
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#34D399" />
                        <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-primary">{total - completed}</span>
                <span className="text-sm tracking-wide uppercase text-muted-foreground">
                    Pending
                </span>
            </div>
        </div>
    );
}