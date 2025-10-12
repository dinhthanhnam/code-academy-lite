import {Course} from "@/types/Course";

export interface PaginatedCourse {
    data: Course[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: object[];
        path: string;
        per_page: number;
        to: string;
        total: string;
    };
}