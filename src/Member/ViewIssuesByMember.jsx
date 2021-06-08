import React from "react";

function viewIssuesByMember(){

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
                            // history.push({
                            //     pathname : "/memberLandingPage",
                            //     state : {email : memberMailId }
                            // });
                        }}>View All Books</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" href="/" onClick={e => {
                            e.preventDefault();
                            // history.push({
                            //     pathname : "/searchBooksBy",
                            //     state : {email : memberMailId }
                            // })
                        }}>Search Books By</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" href="/">View Issues</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" href="/">Request Book</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <label className="nav-link" style={{color : "black"}}>member1@gmail.com</label>
                        <button className="btn btn-outline-success" type="submit">Logout</button>
                    </form>
                    </div>
                </div>
            </nav>
        </div>
    );

}

export default viewIssuesByMember;