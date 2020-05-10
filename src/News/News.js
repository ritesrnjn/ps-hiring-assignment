import React from "react";
import TriangleIcon from "./TriangleIcon";
import './news.css'

function News() {
    const [newsArticles, setNewsArticles] =React.useState([])

    const prevClick = () =>{

    }
    const nextClick = () => {

    }

    React.useEffect(() => {
        fetch('https://hn.algolia.com/api/v1/search?page=2')
            .then(res => res.json())
            .then(res => {
                    setNewsArticles(res.hits)
                },
                error => {
                    // setLoaded(true)
                    console.log(error)
                }
            )
    }, [])



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
                <span onClick={prevClick}>Previous</span> &nbsp;| &nbsp;<span onClick={nextClick}>Next</span>
            </div>
        </div>
    )
}

export default News