import { Navbar } from "@/components/navbar";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div>
            <main>
                <Navbar/>
                {children}
            </main>
        </div>
    );
};