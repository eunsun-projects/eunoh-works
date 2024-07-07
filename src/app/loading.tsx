export default function Loading() {
    return (
        <div
            style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                overflow: "hidden",
            }}
        >
            <p
                style={{
                    color: "rgb(80, 80, 80)",
                    fontSize: "1.5rem",
                    position: "relative",
                }}
            >
                Loading...
            </p>
        </div>
    );
}
