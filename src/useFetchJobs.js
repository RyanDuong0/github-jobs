import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
    MAKE_REQUEST: "make-request",
    GET_DATA: "get-data",
    ERROR: "error",
    UPDATE_HAS_NEXT_PAGE: "update-has-next-page",
}

const BASE_URL = "https://remotive.com/api/remote-jobs"
const PAGE_SIZE = 20;

function reducer(state, action){
    switch(action.type){
        case ACTIONS.MAKE_REQUEST:
            return { ...state, loading: true, error: null };
        case ACTIONS.GET_DATA:
            return { 
                ...state, 
                loading: false, 
                jobs: action.payload.jobs,
                hasNextPage: action.payload.hasNextPage
            };
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, jobs: [] };
        default:
            return state
    }
}

export default function useFetchJobs(params, page){
    const [state, dispatch] = useReducer(reducer, {
        jobs: [],
        loading: true,
        error: null,
        hasNextPage: false
    });

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        dispatch({ type: ACTIONS.MAKE_REQUEST });
        axios.get(BASE_URL, {
            cancelToken: cancelToken.token
        })
            .then(res => {
                const allJobs = res.data.jobs;

                // Client-side filtering using params
                const filteredJobs = allJobs.filter(job => {
                    // Description/title/company search
                    const matchesSearch = params.search
                        ? (
                            (job.title + job.description + job.company_name)
                            .toLowerCase()
                            .includes(params.search.toLowerCase())
                          )
                        : true;

                    // Location filter
                    const matchesLocation = params.location
                        ? job.candidate_required_location.toLowerCase().includes(params.location.toLowerCase())
                        : true;

                    // Full time filter
                    const matchesFullTime = params.full_time
                        ? job.job_type && job.job_type.toLowerCase() === "full_time"
                        : true;

                    return matchesSearch && matchesLocation && matchesFullTime;
                });

                // Pagination
                const startIdx = (page - 1) * PAGE_SIZE;
                const endIdx = startIdx + PAGE_SIZE;
                const jobsForPage = filteredJobs.slice(startIdx, endIdx);
                const hasNextPage = endIdx < filteredJobs.length;

                dispatch({ 
                    type: ACTIONS.GET_DATA, 
                    payload: { jobs: jobsForPage, hasNextPage }
                });
            })
            .catch(e => {
                if (axios.isCancel(e)) return;
                dispatch({ type: ACTIONS.ERROR, payload: { error: e.message } });
            });

        return () => {
            cancelToken.cancel();
        };
    }, [params, page]);

    return state;
}
