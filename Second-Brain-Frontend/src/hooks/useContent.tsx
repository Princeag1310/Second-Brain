import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface ContentItem {
    _id: string;
    title: string;
    link: string;
    type: "youtube" | "twitter" | string;
    userId: string;        // or full object if populated
    tags: string[];        // or tag objects if populated
}

interface ContentResponse {
    content: ContentItem[];
}

export function useContent() {
    const [contents, setContents] = useState<ContentItem[]>([]);

    function refresh() {
        axios
            .get<ContentResponse>(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    authorization: localStorage.getItem("token") || "",
                },
            })
            .then((response) => {
                setContents(response.data.content);
            })
            .catch((err) => {
                console.error("Failed to fetch content", err);
            });
    }

    useEffect(() => {
        refresh();

        const interval = setInterval(refresh, 10 * 1000);
        return () => clearInterval(interval);
    }, []);

    return { contents, refresh };
}
