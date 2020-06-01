import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Items from "../components/Items";
import Item from "../components/Item";
import EditItem from "../components/EditItem";
import NewItem from "../components/NewItem";

export default (
    <Switch>
  <Router>
      <Route path="/" exact component={Home} />
      <Route path="/admin/items" exact component={Items} />
      <Route path="/admin/items/new" exact component={NewItem} />
      <Route path="/admin/items/:id" exact component={Item} />
      <Route path="/admin/items/:id/edit" exact component={EditItem} />
    </Switch>
  </Router>
);
