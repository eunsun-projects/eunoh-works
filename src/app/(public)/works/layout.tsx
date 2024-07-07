import WorksNav from "./_components/WorksNav";

export default function WorksLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col w-full">
            <WorksNav />
            {children}
        </section>
    );
}
