import React,{useState,useEffect} from "react";
import {Form,Input,Button,Table, Container,Col,Row} from "reactstrap";
import axios from "axios";


function SearchBook(){

    const [searchBookName,setSearchBookName]= useState('');
    const [searchBookAuthor,setSearchBookAuthor]= useState('');
    const [searchError,setSearchError]=useState('');
    const [bookNameList,setBookNameList]=useState([]);
    const [bookAuthorList,setBookAuthorList]=useState([]);
    const [flag,setFlag]=useState(0);
    const [error,setError]=useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/member/searchByName/${searchBookName}`)
            .then(res => {
                if(res.data.length===0){
                    setError('No match found !');
                    setSearchError('');
                }else{
                    setError('');
                    setSearchError('');
                    setBookNameList(res.data);
                }
            }).catch(err => {
                console.log(err);
                setSearchError('');
                setError(err.response.data);
                setBookNameList([]);
            });
        },[bookNameList]);

    const searchByName= (e) =>{
        e.preventDefault();
        setFlag(0);
        if(searchBookName===''){
            setError('Book Name field must not be empty');
            setSearchError('');
        }else{
            axios.get(`http://localhost:8080/member/searchByName/${searchBookName}`)
            .then(res => {
                if(res.data.length===0){
                    setError('No match found !');
                    setSearchError('');
                }else{
                    setError('');
                    setSearchError('');
                    setBookNameList(res.data);
                }
            }).catch(err => {
                console.log(err);
                setSearchError('');
                setError(err.response.data);
                setBookNameList([]);
            });
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/member/searchByAuthor/${searchBookAuthor}`)
            .then(res => {
                if(res.data.length===0){
                    setError('No match found !');
                    setSearchError('');
                }else{
                    setError('');
                    setBookAuthorList(res.data);
                    setSearchError('');
                }
            }).catch(err => {
                console.log(err);
                setError(err.response.data);
                setSearchError('');
                setBookAuthorList([]);
            });
        },[bookAuthorList]);
    
    const searchByAuthor= (e) =>{
        e.preventDefault();
        if(searchBookAuthor===''){
            setError('Book Author field must not be empty');
            setSearchError('');
        }else{
            axios.get(`http://localhost:8080/member/searchByAuthor/${searchBookAuthor}`)
            .then(res => {
                if(res.data.length===0){
                    setError('No match found !');
                    setSearchError('');
                }else{
                    setError('');
                    setBookAuthorList(res.data);
                    setSearchError('');
                }
            }).catch(err => {
                console.log(err);
                setError(err.response.data);
                setSearchError('');
                setBookAuthorList([]);
            });
        }
    }

    const removeBook = (book) =>{
        
        var proceed = window.confirm("All copies of the book will be removed. Do you want to proceed ?");
        if (proceed) {
              axios.delete(`http://localhost:8080/admin/removeBook/${book.bookName}/${book.bookAuthor}`)
            .then(res => {
                if(res.data===true){
                    setSearchError('All copies of: '+book.bookName+' by '+book.bookAuthor+' removed!');
                    setError('');
                }else{
                    setSearchError('Could not delete the book.');
                    setError('');
                }
            }).catch(err => {
                console.log(err);
                setSearchError('');
                setSearchError(err.response.data);
            });
        } 
    }

    return(
        <div>
            <h4 className="m-3 text-center">Search Books</h4><br/>

            <Container>
            <Row>
                <Col xs="6">
                    <center>
                        <Form className="m-3 ">
                            <Input type="text" className="m-2" style={{width: 300}} value={searchBookName}  placeholder="Search By Book Name" className="form-control" 
                                onChange={ (e) => {setSearchBookName(e.target.value)}} />
                            <Button type="Submit" color="primary" className="btn m-2" 
                                onClick={ searchByName }>Search By Book Name</Button>    
                        </Form>
                    </center>
                </Col>
                <Col xs="6">
                    <center>
                        <Form className="m-3 ">
                            <Input type="text" className="m-2" style={{width: 300}} value={searchBookAuthor}  placeholder="Search By Book Author" className="form-control" 
                                onChange={ (e) => {setSearchBookAuthor(e.target.value)}} />
                            <Button type="Submit" color="primary" className="btn m-2" 
                                onClick={ searchByAuthor }>Search By Book Author</Button>    
                        </Form>
                    </center>
                </Col>
            </Row>
            </Container>
            <center style={{paddingTop:"1rem"}}>
                    {
                        error === '' ? <div></div> : <div class="alert alert-danger" role="alert" style={{width: 600}}>
                            {error}
                        </div>
                    }
            </center>
            
            <h4 className="mt-1 text-center">List Of Books</h4>
            <Table striped>
                <thead>
                    <tr>
                    <th>Book Name</th>
                    <th>Book Author</th>
                    <th>Category</th>
                    <th>Total Books</th>
                    <th>Available Books</th>
                    <th>Language</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                {
                    bookList.map((book)=>{
                        return (
                            <tr>
                                <th scope="row">{book.bookName}</th>
                                <td>{book.bookAuthor}</td>
                                <td>{book.category}</td>
                                <td>{book.totalBooks}</td>
                                <td>{book.availableBooks}</td>
                                <td>{book.language}</td>
                                <td>
                                    <Button color="danger" onClick={()=> removeBook(book)}>Remove Book</Button>
                                </td>
                            </tr>
                        );
                    })
                }
            
                </tbody>
        </Table>
        <center style={{paddingTop:"1rem"}}>
                    {
                        searchError === '' ? <div></div> : <div class="alert alert-danger" role="alert" style={{width: 600}}>
                            {searchError}
                        </div>
                    }
        </center>
        <hr/>
        </div>
    )
}
export default SearchBook