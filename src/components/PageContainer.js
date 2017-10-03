import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

const NewFavoritesListPage = ( props ) => (
  <FavoritesListPage {...props} newList={true} />
);

const FavoritesListPage = ( {match, newList} ) => (
  <div>
    <h2>{newList ? "New " : ""}{match.params.id ? "Favorites page for id:"+match.params.id : "Favorite page for non-logged in user"}</h2>
  </div>
);
const AccountPage = ( {match} ) => (
  <div>
    <h2>Account page for id: {match.params.id}</h2>
  </div>
);


class PageContainer extends React.Component {
  render() {
    return (
      <div className="page-container"> 
        <Router>
          <Switch>
            <Route path="/favorites/:id/:listId/share" component={FavoritesListPage}/>
            <Route path="/favorites/:id/new" component={NewFavoritesListPage}/>
            <Route path="/favorites/:id/:listId" component={FavoritesListPage}/>
            <Route path="/favorites/:id/" component={FavoritesListPage}/>
            <Route path="/favorites/:id" component={FavoritesListPage}/>
            <Route path="/favorites/" component={FavoritesListPage}/>
            <Route path="/account/:id" component={AccountPage}/>
            <Redirect from="/account" to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default PageContainer;