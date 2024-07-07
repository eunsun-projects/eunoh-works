import Below from "../_components/BelowText";
import { getData } from "../layout";

export default function TextSlugLayout({ children }: { children: React.ReactNode }) {
    const posts = getData();

    return (
        <div className="h-full flex flex-col flex-1 py-4">
            {children}
            <Below posts={posts} />
        </div>
    );
}
