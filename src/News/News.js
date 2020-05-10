import React from "react";
import TriangleIcon from "./TriangleIcon";
import res from './response.json'

function News() {
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
                {res.hits.map(r=>(
                    <tr key={r.objectID}>
                        <td>{r.num_comments}</td>
                        <td>{r.points}</td>
                        <td><TriangleIcon/></td>
                        <td>{r.title}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default News