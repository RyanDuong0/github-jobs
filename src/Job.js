import { useState } from "react";
import { Card, Badge, Button, Collapse } from "react-bootstrap";

function formatJobType(type) {
    return type
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '); 
}

export default function Job({ job }){
    const [open, setOpen] = useState(false)

    return (
        <Card className="mb-3">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        {/*left side of card, contains job title, date, type, location*/}
                        <Card.Title>
                            {job.title} - <span className="text-muted font-weight-light">{job.company_name}</span>
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                            {new Date(job.publication_date).toLocaleDateString()}
                        </Card.Subtitle>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Badge bg="secondary">{formatJobType(job.job_type)}</Badge>
                            <Badge
                                bg="secondary"
                                className="text-truncate d-inline-block"
                                style={{ maxWidth: "250px", overflow: "hidden", whiteSpace: "nowrap" }}
                                title={job.candidate_required_location}
                            >
                                {job.candidate_required_location}
                            </Badge>
                        </div>
                        <div style={{wordBreak: "break-all", marginTop:"0.5rem"}}>
                            <a 
                                href={job.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Apply Here!</a>
                        </div>
                    </div>
                    <img 
                        className="d-sm-none d-md-block" 
                        alt={job.company_name} 
                        src={job.company_logo}
                        height="75" 
                    />
                </div>
                <Card.Text>
                    <Button
                        bg="primary"
                        onClick={() => setOpen(prevOpen => !prevOpen)}
                    >
                        {open ? "Hide Details" : "View Details"}
                    </Button>
                </Card.Text>
                <Collapse in={open}>
                    <div className="mt-4" dangerouslySetInnerHTML={{__html: job.description}} />
                </Collapse>
            </Card.Body>
        </Card>
    )
}
