import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import axios from "axios";

//location.state.email
function MemberLandingPage(props){
    const history = useHistory();

    const [allBookList, setAllBookList] = useState([]);

    const location = useLocation();

    const [memberMail, setMemberMail] = useState(location.state.email);


    useEffect(() => {

        axios.get(`http://localhost:8080/member/viewAllBooks`)
            .then(res => {
                setAllBookList(res.data);
            })


    }, [allBookList])

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Welcome</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">View All Books</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" href="/" onClick={e => {
                            e.preventDefault();
                            history.push({
                                pathname : "/searchBooksBy",
                                state : {email : memberMail }
                            })
                        }}>Search Books By</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" href="/">View Issues</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" href="/" onClick = { e => {
                            e.preventDefault();
                            history.push({
                                pathname : "/viewAndSubmitRequest",
                                state : {email : memberMail}
                            });
                        }}>Request Book</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <label className="nav-link" style={{color : "black"}}>{memberMail}</label>
                        <button className="btn btn-outline-success" type="submit">Logout</button>
                    </form>
                    </div>
                </div>
            </nav>
            <div style={{padding:"2rem"}}>
                {allBookList.map((book) => {
                    return(
                        <div class="list-group">
                            <div style={{padding : "1rem"}}>
                            <a href="/" className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{book.bookName}</h5>
                                    <small>{book.availableBooks} books available</small>
                                </div>
                                <p class="mb-1">{book.category}</p>
                                <small><b>Language : </b> {book.language}</small>
                            </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MemberLandingPage;



{/* <table>
    <tr>
        <td><b>Book Author :</b></td>
        <td>{book.bookAuthor}</td>
    </tr>
    <tr>
        <td><b>Genre :</b></td>
        <td>{book.category}</td>
    </tr>
    <tr>
        <td><b>Available Books :</b></td>
        <td>{book.availableBooks}</td>
    </tr>
    <tr>
        <td><b>Language :</b></td>
        <td>{book.language}</td>
    </tr>
</table> */}