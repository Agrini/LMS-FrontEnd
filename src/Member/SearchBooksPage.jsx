import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import axios from "axios";

function SearchBookBy(){
    const [content, setContent] = useState(undefined);
    const [searchBy, setSearchBy] = useState('Name');

    const [allBookList, setAllBookList] = useState([]);

    const [error, setError] = useState('');

    const location = useLocation();
    const [memberMail, setMemberMail] = useState(location.state.email);

    const handleClick = (e) => {
        e.preventDefault();

        if(content === undefined){
            setError(`Search Book By ${searchBy} cannot be EMPTY!`);
        }else{
            axios.get(`http://localhost:8080/member/searchBy${searchBy}/${content}`)
            .then(res => {
                setAllBookList(res.data);
                setError('');
            }).catch(err => {
                err.response.data === undefined || content === undefined? setError("Cannot be Empty") : setError(err.response.data);
                setAllBookList([]);
            })
        }
    };

    const history = useHistory();
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
                        <a className="nav-link active" href="/">Search Books By</a>
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
            <div style={{justifyContent : "center", "padding" : "1.5rem"}}>
            <center><h1 className="text-muted">Search Books By</h1></center>
            <div class="input-group mb-3" style={{padding : "1rem", justifyContent:"center"}}>
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{`Book by ${searchBy}`}</button>
                <ul class="dropdown-menu">
                    <li><a className="dropdown-item" href="/" onClick= { e => {
                        e.preventDefault();
                        setSearchBy('Name');
                    } }>Book Name</a></li>
                    <li><a className="dropdown-item" href="/" onClick= { e => {
                        e.preventDefault();
                        setSearchBy('Author');
                    } }>Book Author</a></li>
                    <li><a className="dropdown-item" href="/" onClick= { e => {
                        e.preventDefault();
                        setSearchBy('Category');
                    } }>Book Category (Genre)</a></li>
                </ul>
                <input type="text" className="form-control" aria-label="Text input with dropdown button" value={content} onChange= { e=> {
                    e.target.value !== undefined || e.target.value !== null ? setContent(e.target.value) : setError("Cannot be Empty")
                }} required/>
                <button class="btn btn-outline-secondary" type="button" onClick = {handleClick}>Search</button>
                </div>
            </div>
            <div style={{padding : "1rem"}}>
            {allBookList.map((book) => {
                    return(
                        <div class="list-group">
                            <div style={{padding : "1rem"}}>
                            <a href="/" className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{book.bookName}</h5>
                                    <div style={{paddingTop : "0.5rem"}}><button type="button" className="btn btn-outline-primary" onClick = { e => {
                                        e.preventDefault();

                                        axios.post(`http://localhost:8080/member/addIssueRequest/${memberMail}/${book.bookName}/${book.bookAuthor}`)
                                            .then(res => {
                                                if(res.data){
                                                    alert(`Your request to issue ${book.bookName} has been placed.`);
                                                }
                                            }).catch(err => alert(`Your request to issue ${book.bookName} has already been Submitted.`));

                                    }}>Request For Issue</button></div>
                                </div>
                                <p class="mb-1">{book.category}</p>
                                <small><b>Language : </b> {book.language}</small><br />
                                <small><b>{book.availableBooks}</b> books available</small>
                            </a>
                            </div>                         
                        </div>
                    );
            })}
            </div>
            <center style={{paddingTop:"1rem"}}>
                    {
                        error === '' ? <div></div> : <div class="alert alert-danger" role="alert" style={{width: "50%"}}>
                            {error}
                        </div>
                    }
            </center>
        </div>
    );
}

export default SearchBookBy;