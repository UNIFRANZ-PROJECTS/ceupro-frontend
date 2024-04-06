import { StageModel } from ".";

export interface SeasonModel {
    id: number;
    name: string;
    price: number;
    start: Date;
    end: Date;
    stages:StageModel[]
}

export interface FormSeasonModel {
    name: string;
    price: number;
    start: Date|null;
    end: Date|null;
    stages: StageModel[];
}

export interface FormSeasonValidations {
    name: [(value: string) => boolean, string];
    price: [(value: number) => boolean, string];
    start: [(value: Date) => boolean, string];
    end: [(value: Date) => boolean, string];
    stages: [(value: StageModel[]) => boolean, string];
}