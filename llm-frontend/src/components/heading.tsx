import { LucideIcon } from "lucide-react";

interface HeadingProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;
}

export const Heading = ({
    title,
    description,
    icon: Icon,
    iconColor = "text-black", // Default to black if no iconColor is provided
    bgColor = "bg-white", // Default to white if no bgColor is provided
}: HeadingProps) => {
    return (
        <>
            <div className={`px-4 lg:px-8 flex items-start gap-x-5 mb-8`}>
                <div className={`p-2 w-fit rounded-md ${bgColor}`}>
                    <Icon className={`w-10 h-10 ${iconColor}`} />
                </div>
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>
        </>
    );
};
