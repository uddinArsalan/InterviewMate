export type AvailableModelsTypes = "Conan" | "Jamie" | "Casey" | "Pluto";

export interface CharactersType {
    id : number;
    name : AvailableModelsTypes;
    url : string;
}

export interface stepsType {
    isInterviewStarted: boolean;
    isCharacterSelected : boolean;
    isDomainSelected: boolean;
}