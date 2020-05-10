import React, {useState} from "react";
import TriangleIcon from "./TriangleIcon";
import './news.css'

function News(props) {
    const {history}= props
    let params = new URLSearchParams(history.location.search);
    let pageNo = params.get("page")||1

    const [page, setPage] = useState(pageNo)
    const [newsArticles, setNewsArticles] = useState([])

    // on mount
    React.useEffect(() => {
        fetchArticles(page)
    }, [])

    const fetchArticles = page => {
        const url = `https://hn.algolia.com/api/v1/search?page=${page}`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                    console.log('res', res)
                    setNewsArticles(res.hits)

                },
                error => {
                    // setLoaded(true)
                    console.log(error)
                }
            )
    }



    const prevClick = () =>{
        console.log('nextClick', page)
        let pageNo = parseInt(page)
        if(pageNo >1){
            pageNo = pageNo -1
            setPage(pageNo)
            fetchArticles(pageNo)
            const url = `/?page=${pageNo}`
            history.push(url)
        }

    }
    const nextClick = () => {

        let pageNo = parseInt(page)
        pageNo = pageNo +1
        console.log('nextClick', pageNo)
        setPage(pageNo)
        fetchArticles(pageNo)
        const url = `/?page=${pageNo}`
        history.push(url)
    }


    return (
        <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Comments</th>
                    <th scope="col">Vote Count</th>
                    <th scope="col">UpVote</th>
                    <th scope="col">News Details</th>
                </tr>
                </thead>
                <tbody>
                {newsArticles.map(r=>(
                    <tr key={r.objectID}>
                        <td>{r.num_comments}</td>
                        <td>{r.points}</td>
                        <td><TriangleIcon/></td>
                        <td>{r.title}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="paginateRoot">
                <span className="navItem" onClick={prevClick}>Previous</span>
                &nbsp;| &nbsp;
                <span className="navItem" onClick={nextClick}>Next</span>
            </div>
        </div>
    )
}

export default News