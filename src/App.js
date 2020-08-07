import React, { Component } from "react";
import "./App.css";
import { createClient } from "pexels";
const client = createClient(
  "563492ad6f917000010000010c330e5e357640bf87e11cdd09f91652"
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      pics: [],
      load: false,
      query: "summer",
      currentPage: 2,
      yourPage: 1,
    };
  }

  componentDidMount() {
    var query = this.state.query;

    client.photos.search({ query, per_page: 10 }).then((photos) => {
      this.setState({ pics: photos.photos, load: true });
      console.log(photos);
    });
  }

  handleQuery = (e) => {
    this.setState({ query: e.target.value });
  };

  handleLoadPics = () => {
    var query = this.state.query;
    var currentPage = this.state.currentPage;

    if (query === "") {
      alert("Please complete the field.");
    } else {
      client.photos
        .search({ query, per_page: 10, page: currentPage })
        .then((photos) => {
          this.setState({
            pics: photos.photos,
            load: true,
          });
          console.log(photos);
        });
    }
  };

  handleNextPage = () => {
    var currentPage = this.state.currentPage;
    var yourPage = this.state.yourPage;

    currentPage++;
    yourPage++;
    this.setState({
      currentPage: currentPage,
      // yourPage: yourPage,
    });
    this.handleLoadPics();
  };

  handlePreviousPage = () => {
    var currentPage = this.state.currentPage;
    var yourPage = this.state.yourPage;

    if (yourPage > 1) {
      currentPage--;
      yourPage--;

      this.setState({
        currentPage: currentPage,
        // yourPage: yourPage,
      });
      this.handleLoadPics();
    }
  };

  render() {
    const picsList = this.state.pics.map((item) => (
      <div key={item.id} index={item.id}>
        <img src={item.src.small} alt="beauty img" className="queryImg" />
      </div>
    ));
    return (
      <div className="App">
        <h1 className="title">Hello in nice picture finder!</h1>
        <div className="search">
          <input
            className="queryInput"
            type="text"
            initialvalue={this.state.query}
            onChange={this.handleQuery}
          />
          <button className="bubbly-button" onClick={this.handleLoadPics}>
            Click to load new images!
          </button>
        </div>
        <div className="paginationButtons">
          <button className="previousPage" onClick={this.handlePreviousPage}>
            Previous Page
          </button>
          <p className="currentPage">You are on page: {this.state.yourPage}</p>
          <button className="nextPage" onClick={this.handleNextPage}>
            Next Page
          </button>
        </div>
        <div className="queryPics">{picsList}</div>

        <div className="area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      // </div>
    );
  }
}
export default App;
