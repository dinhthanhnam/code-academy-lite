import {User} from "@/types/User";
import Exercise from "@/types/Exercise";

export interface PaginatedExercise {
    data: Exercise[];
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