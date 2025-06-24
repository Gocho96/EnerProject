export interface Project {
    code: string;
    name: string;
    type_service: string;
    state: string;
    start_contract: Date;
    end_contract: Date
    next_maintenance: Date;
}