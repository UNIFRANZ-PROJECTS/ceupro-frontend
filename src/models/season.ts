import { TypeProjectModel } from ".";

export interface SeasonModel {
    id: number;
    name: string;
    price: number;
    start: Date;
    end: Date;
    enableState: boolean;
    stages:TypeProjectModel[]
}

export interface FormSeasonModel {
    name: string;
    price: number;
    start: Date|null;
    end: Date|null;
    stages: TypeProjectModel[];
}

export interface FormSeasonValidations {
    name: [(value: string) => boolean, string];
    price: [(value: number) => boolean, string];
    start: [(value: Date) => boolean, string];
    end: [(value: Date) => boolean, string];
    stages: [(value: TypeProjectModel[]) => boolean, string];
}