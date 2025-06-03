import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
    MAKE_REQUEST: "make-request",
    GET_DATA: "get-data",
    ERROR: "error",
}

const BASE_URL = "https://remotive.com/api/remote-jobs"

function reducer(state, action){
    switch(action.type){
        case ACTIONS.MAKE_REQUEST: //shows loading state
            return{loading:true, jobs:[]}
        case ACTIONS.GET_DATA: //store jobs in state, hides loading
            return{ ...state, loading: false, jobs: action.payload.jobs} //pass payload jobs
        case ACTIONS.ERROR: //store error message
            return {...state, loading: false,  error: action.payload.error, jobs:[]}
        default:
            return state
    }
}

//params list of job attributes: description, location, lat, long, full_time
//function calls API and fetches data
export default function useFetchJobs(params, page){
    const [state, dispatch] = useReducer(reducer, {jobs: [], loading: true, error: null}) //initialises state

    //useEffect to fetch jobs
    useEffect(() => {
        const cancelToken = axios.CancelToken.source(); //for requese cancellation
        dispatch({type: ACTIONS.MAKE_REQUEST}); //set loading state
        axios.get(BASE_URL, {
            cancelToken: cancelToken.token
        }) //make get request to Arbeit API
            .then(res => { //extract job listings from response
                const allJobs = res.data.jobs;

                const filteredJobs = allJobs.filter(job => {
                    const title = job.title.toLowerCase();
                    const location = job.candidate_required_location.toLowerCase()
                    const description = job.description.toLowerCase();
                    //filter jobs by job title (params.descriptions) and location (params.location)
                    const isEnglishJob =
                        location.includes("united kingdom") ||
                            location.includes("uk") ||
                            location.includes("remote") ||
                            title.includes("english") ||
                            description.includes("english");                    
                    return isEnglishJob;
                });
                dispatch({type: ACTIONS.GET_DATA, payload: {jobs:filteredJobs}});
            })
            .catch(e => { //error handling
                if (axios.isCancel(e)) return;
                dispatch({ type: ACTIONS.ERROR, payload: { error: e.message } }); //store error if request fails
            });
        return () => cancelToken.cancel();
    }, [params,page]);

    return state
}
