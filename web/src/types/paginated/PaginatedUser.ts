import {User} from "@/types/User";

export interface PaginatedUser {
    data: User[];
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