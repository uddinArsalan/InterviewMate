interface LoadModelReturnType {
    renderer: HTMLCanvasElement;
}

// Declare the module
declare module "LoadModel" {
    // Export the loadModel function
    export function loadModel(): LoadModelReturnType;
}