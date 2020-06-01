import React from "react";
import { Link } from "react-router-dom";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: { ingredients: "" }
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/items/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error retrieving record item");
      })
      .then(response => this.setState({ item: response }))
      .catch(err => console.log(err.message));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  render() {
    const { item } = this.state;
    let ingredientList = "No ingredients available";

    if (item.ingredients.length > 0) {
      ingredientList = item.ingredients.split(",").map((ingredient, index) => (
        <li key={index} className="list-group-item">
          {ingredient}
        </li>
      ));
    }
    const itemDescription = this.addHtmlEntities(item.description);

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={item.image_url}
            alt={`${item.name} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {item.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Ingredients</h5>
                {ingredientList}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Description</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${itemDescription}`
                }}
              />
            </div>
          </div>
          <Link to="/admin/items" className="btn btn-link">
            Back to items
          </Link>
        </div>
      </div>
    );
  }
}

export default Item;
