import React from "react";
import { Link } from "react-router-dom";

class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.itemTypes = ["Appetizer", "Dessert", "MainCourse", "Drink"];
    this.state = {
      item: {
        name: "",
        description: "",
        image_url: "",
        cost: "",
        ingredients: "",
        cusine: "",
        type: "Appetizer"
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({
      item: { ...this.state.item, [event.target.name]: event.target.value }
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const {
      name,
      ingredients,
      description,
      image_url,
      cost,
      cusine,
      type
    } = this.state.item;
    const url = `/api/v1/items/create`;

    if (name.length == 0 || ingredients.length == 0 || cost.length == 0) return;

    const body = {
      name,
      ingredients,
      description: description.replace(/\n/g, "<br> <br>"),
      image_url,
      cost,
      cusine,
      type
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/admin/items/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    const { item } = this.state;
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            {/* <h1 className="font-weight-normal mb-5">
              Add a new recipe to our awesome recipe collection.
            </h1> */}
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="itemName">Item Name</label>
                <input
                  value={item.name}
                  type="text"
                  name="name"
                  id="itemName"
                  className="form-control"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="itemCost">Cost</label>
                <input
                  value={item.cost}
                  type="text"
                  name="cost"
                  id="itemCost"
                  className="form-control"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="itemImage">Image Url</label>
                <input
                  value={item.image_url}
                  type="text"
                  name="image_url"
                  id="itemImage"
                  className="form-control"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="itemCusine">Cusine</label>
                <input
                  value={item.cusine}
                  type="text"
                  name="cusine"
                  id="itemCusine"
                  className="form-control"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="itemType">Type</label>
                <select
                  className="form-control"
                  value={item.type}
                  id="itemType"
                  onChange={this.onChange}
                  name="type"
                >
                  {this.itemTypes.map((itemType, i) => (
                    <option value={itemType} key={i}>
                      {itemType}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="itemIngredients">Ingredients</label>
                <input
                  value={item.ingredients}
                  type="text"
                  name="ingredients"
                  id="itemIngredients"
                  className="form-control"
                  onChange={this.onChange}
                />
                <small id="ingredientsHelp" className="form-text text-muted">
                  Separate each ingredient with a comma.
                </small>
              </div>
              <label htmlFor="itemDescription">Description</label>
              <textarea
                value={item.description}
                className="form-control"
                id="itemDescription"
                name="description"
                rows="5"
                onChange={this.onChange}
              />
              <button type="submit" className="btn custom-button mt-3">
                Create Item
              </button>
              <Link to="/admin/items" className="btn btn-link mt-3">
                Back to Items
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewItem;
