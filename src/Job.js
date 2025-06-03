import React from "react";

export default function Job({ job }){
    return (
        <div>
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company_name}</p>
            <p><strong>Location:</strong> {job.candidate_required_location}</p>
            <p><strong>Posted on:</strong> {new Date(job.publication_date).toLocaleDateString()}</p>
            <a href={job.url} target="_blank" rel="noopener noreferrer">View Job</a>        
        </div>
    )
}
