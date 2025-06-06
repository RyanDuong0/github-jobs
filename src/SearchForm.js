import React from "react"
import { Col, Form, Row } from "react-bootstrap"

export default function SearchForm({params, onParamChange}){
    return(
        <Form className="mb-4">
            <Row className="align-items-end">
                <Form.Group as={Col}>
                    <Form.Label>Search</Form.Label>
                    <Form.Control 
                        onChange={onParamChange} 
                        value={params.search || ""} 
                        name="search" 
                        type="text" 
                        placeholder="Keywords, company, etc." 
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control 
                        onChange={onParamChange} 
                        value={params.location || ""} 
                        name="location" 
                        type="text" 
                        placeholder="e.g. United States" 
                    />
                </Form.Group>
                <Form.Group as={Col} xs="auto" className="ml-2">
                    <Form.Check 
                        onChange={onParamChange} 
                        checked={!!params.full_time} 
                        name="full_time" 
                        id="full_time" 
                        label="Only Full Time" 
                        type="checkbox" 
                        className="mb-2" 
                    />
                </Form.Group>
            </Row>
        </Form>
    )
}
