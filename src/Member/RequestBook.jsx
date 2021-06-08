import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";


//not completed
function RequestBook(){
    const history = useHistory();
    const location = useLocation();
    const [memberMail, setMemberMail] = useState(location.state.email);

    const [bookName, setBookName] = useState(undefined);
    const [bookAuthor, setBookAuthor] = useState(undefined);

    const [requestedBookList, setRequestedBookList] = useState([]);



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
                        <a className="nav-link active" aria-current="page" href="/" onClick={e => {
                            e.preventDefault();
                            history.push({
                                pathname : "/memberLandingPage",
                                state : {email : memberMail }
                            });
                        }}>View All Books</a>
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
                        <a className="nav-link active" href="/" onClick = { e => {
                            e.preventDefault();
                            history.push({
                                pathname : "/viewIssuesByMember",
                                state : {email : memberMail }
                            });

                        }}>View Issues</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" href="/">Request Book</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <label className="nav-link" style={{color : "black"}}>{memberMail}</label>
                        <button className="btn btn-outline-success" type="submit">Logout</button>
                    </form>
                    </div>
                </div>
            </nav>
            <div style={{justifyContent : "center", "padding" : "1.5rem"}}>
                <center><h1 className="text-muted">Request a Book</h1></center>
                <center><h5 className="text-muted">Fill in the required Details of the Book</h5></center>
                <div className="input-group mb-3" style={{"paddingTop" : "2rem"}}>
                    <span class="input-group-text">Enter Book Name</span>
                    <input type="text" className="form-control" placeholder="Book Name" aria-label="bookName"/>
                    <span class="input-group-text">Enter Author Name</span>
                    <input type="text" className="form-control" placeholder="Book Author" aria-label="bookAuthor"/>
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2">Submit Request</button>
                </div>
            </div>
        </div>
    );

}

export default RequestBook;