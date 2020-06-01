import React from "react";
import { Link } from "react-router-dom";

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.deleteItemId = null;
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    const url = "/api/v1/items";

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error while getting items data");
      })
      .then(response => this.setState({ items: response }))
      .catch(err => console.log(err.message));
  }

  deleteItem() {
    const url = `/api/v1/items/${this.deleteItemId}`;

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        console.log(response.message);
        this.props.history.push(`/admin/items/`);
      })
      .catch(error => console.log(error.message));
  }

  render() {
    const { items } = this.state;
    const itemsComps = items.map((item, index) => (
      <div key={index} className="col-md-6 col-lg-4 mb-2">
        <div className="card">
          <img
            src={item.image_url}
            className="card-img-top"
            alt={`${item.name} image`}
          />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{item.cusine}</h6>
            <p className="card-text">{item.description}</p>
            <Link to={`/admin/items/${item.id}`} className="card-link">
              View Item
            </Link>
            <Link to={`/admin/items/${item.id}/edit`} className="card-link">
              Edit Item
            </Link>
            <Link
              className="card-link text-danger"
              data-toggle="modal"
              data-target="#itemDelWarningModal"
              onClick={() => (this.deleteItemId = item.id)}
            >
              Delete Item
            </Link>
          </div>
        </div>
      </div>
    ));

    const itemDelWarningModal = (
      <div
        className="modal fade"
        id="itemDelWarningModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="itemDelWarningModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Item</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this item?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.deleteItem}
                data-dismiss="modal"
              >
                Delete Item
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="container">
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/admin/items/new" className="btn custom-button">
                Create New Item
              </Link>
            </div>
            <div className="row">{itemsComps}</div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
        {itemDelWarningModal}
      </div>
    );
  }
}

export default Items;
