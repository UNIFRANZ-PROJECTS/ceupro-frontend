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
    lastName: string;
    email: string;
    phone: number;
    // typeDocumentId: TypeDocumentModel | null;
    numberDocument: number;
}

export interface FormSeasonValidations {
    name: [(value: string) => boolean, string];
    lastName: [(value: string) => boolean, string];
    email: [(value: string) => boolean, string];
    phone: [(value: number) => boolean, string];
    // typeDocumentId: [(value: TypeDocumentModel) => boolean, string];
    numberDocument: [(value: number) => boolean, string];
}