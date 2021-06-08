import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminLogin from "./Admin/AdminLogin";
import MemberLandingPage from "./Member/MemberLandingPage";
import MemberLogin from "./Member/MemberLogin";
import RequestBook from "./Member/RequestBook";
import SearchBookBy from "./Member/SearchBooksPage";
import viewIssuesByMember from "./Member/ViewIssuesByMember";

function App(){
  
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/member" component={MemberLogin} />
        <Route path="/admin" component={AdminLogin} />
        <Route path="/memberLandingPage" component={MemberLandingPage}/>
        <Route path="/searchBooksBy" component={SearchBookBy} />
        <Route path="/viewIssuesByMember" component={viewIssuesByMember} />
        <Route path="/viewAndSubmitRequest" component={RequestBook} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;