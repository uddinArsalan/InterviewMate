interface LoadModelReturnType {
    renderer: HTMLCanvasElement;
}

declare module "LoadModel" {
    export function loadModel(): LoadModelReturnType;
}