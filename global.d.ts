import type { HTMLAttributes } from "react";

type ModelViewerElementProps = HTMLAttributes<HTMLElement> & {
    autoRotate?: boolean;
    cameraControls?: boolean;
    class?: string;
    poster?: string;
    src?: string;
    "auto-rotate"?: boolean;
    "camera-controls"?: boolean;
    "shadow-intensity"?: string;
};

declare module "react/jsx-runtime" {
    namespace JSX {
        interface IntrinsicElements {
            "model-viewer": ModelViewerElementProps;
        }
    }
}
