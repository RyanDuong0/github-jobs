import { Pagination } from "react-bootstrap"

export default function JobsPagination({page, setPage, hasNextPage}){
    function adjustPage(amount) {
        setPage(prevPage => prevPage + amount)
    }

    return(
        <Pagination>
            {page !==1 && <Pagination.Prev onClick={() => adjustPage(-1)} />} {/*if page not equal to 1, render the page*/}
            {page !==1 && <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>} {/*if not on page 1, render page 1 always*/}
            {page > 2 && <Pagination.Ellipsis />} {/*if on page greater than 2, render ellipsis*/}
            {page > 2 && <Pagination.Item onClick={() => adjustPage(-1)}>{page-1}</Pagination.Item>} {/*if page not equal to 1, render the page*/}
            <Pagination.Item active>{page}</Pagination.Item>
            {hasNextPage && <Pagination.Item onClick={() => adjustPage(1)}>{page + 1}</Pagination.Item>}
            {hasNextPage && <Pagination.Next onClick={() => adjustPage(1)}/>}
        </Pagination> 
    )
}
