import React, { Component } from "react";
import PortfolioCard from "../components/PortfolioCard";
import { connect } from "react-redux";
import { fetchPortfolios } from "../store/actions/portfolios";
import Loading from "../components/Loading";

class PortfolioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      search: "",
      category: null,
    };
  }
  componentDidMount() {
    this.getPortfolios();
  }
  async getPortfolios() {
    try {
      await this.props.fetchPortfolios();
      this.setState({ loading: false });
    } catch (err) {
      console.log(err);
      return;
    }
  }
  sortLogic = (searchArr, portfolio) => {
    let count = 0;
    for (let word of searchArr) {
      word = word.toLowerCase();
      if (
        word !== "" &&
        (portfolio.name.toLowerCase().indexOf(word) !== -1 ||
          portfolio.type.toLowerCase().indexOf(word) !== -1 ||
          portfolio.location.toLowerCase().indexOf(word) !== -1)
      ) {
        count += 1;
      }
    }
    return count;
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  filterPortfolios = (portfoliosArr, searchTerm) => {
    const term = searchTerm.toLowerCase();
    const rankedPortfolios = portfoliosArr.sort((a, b) => {
      return b.recommendations.length - a.recommendations.length;
    });
    if (term.trim() === "") {
      return rankedPortfolios;
    } else {
      const searchArr = term.split(" ");
      const matches = rankedPortfolios.filter((portfolio) => {
        for (let word of searchArr) {
          word = word.toLowerCase();
          if (
            word !== "" &&
            (portfolio.name.toLowerCase().indexOf(word) !== -1 ||
              portfolio.type.toLowerCase().indexOf(word) !== -1 ||
              portfolio.location.toLowerCase().indexOf(word) !== -1)
          ) {
            return true;
          }
        }
        return false;
      });
      return matches.sort((a, b) => {
        const a_count = this.sortLogic(searchArr, a);
        const b_count = this.sortLogic(searchArr, b);
        return b_count - a_count;
      });
    }
  };
  filterByCategory = (portfoliosArr, categoryArr) => {
    return portfoliosArr.filter((portfolio) => {
      for (let term of categoryArr) {
        if (portfolio.type.toLowerCase().indexOf(term.toLowerCase()) !== -1) {
          return true;
        }
      }
      return false;
    });
  };
  render() {
    let { portfolios } = this.props;
    if (!portfolios || this.state.loading) {
      return <Loading />;
    }
    if (this.state.category) {
      portfolios = this.filterByCategory(portfolios, this.state.category);
    }
    const portfoliosList = this.filterPortfolios(
      portfolios,
      this.state.search
    ).map((p) => (
      <PortfolioCard {...p} key={p._id} history={this.props.history} />
    ));
    return (
      <div className="pb-5" style={{ backgroundColor: "#F2F8F6" }}>
        <div
          className="container-fluid p-0 m-0 d-flex align-items-center"
          style={{
            backgroundColor: "#161716",
            zIndex: 3,
          }}
        >
          <div className="container mt-3">
            <div className="row ">
              <div className="col-lg-8 d-flex flex-column justify-content-center">
                <h1
                  className="mt-5 mb-md-3 mb-0 homeTitle"
                  style={{
                    color: "#FFF",
                    fontWeight: "bold",
                  }}
                >
                  Discover the community.
                </h1>

                <input
                  style={{ position: "relative", zIndex: 5 }}
                  type="text"
                  name="search"
                  value={this.state.search}
                  onChange={this.handleChange}
                  className="form-control mb-4 searchBar"
                  aria-label="searchBar"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row mt-4 justify-content-center">
            <div className="col-md-8   flex-column order-2 order-md-1 h-100">
              {portfolios.length === 0 ? (
                <div className="text-center" id="no-matches">
                  <h5 className="mt-5">Sorry no matches were found...</h5>
                </div>
              ) : (
                <div>{portfoliosList}</div>
              )}
            </div>
            <div
              className="col-md-4 order-1 order-md-2"
              style={{ position: "sticky" }}
            >
              <div
                className="card w-100 mb-4 elevated"
                style={{ color: "black", overflow: "hidden" }}
              >
                <div
                  className="card-header d-none d-md-block"
                  style={{ fontWeight: "bold" }}
                >
                  Popular Categories
                </div>
                <ul
                  className="nav nav-pills flex-row flex-md-column"
                  id="categories"
                  role="tablist"
                >
                  <li
                    className="nav-item flex-grow-1 border-bottom "
                    onClick={() => {
                      this.setState({ category: null });
                    }}
                  >
                    <a
                      className="nav-link active text-sm-left text-center"
                      id="all-tab"
                      data-toggle="tab"
                      href="#all"
                      role="tab"
                      aria-controls="All"
                      aria-selected="true"
                    >
                      All
                    </a>
                  </li>
                  <li
                    className="nav-item flex-grow-1 border-bottom"
                    onClick={() => {
                      this.setState({ category: ["architect", "home"] });
                    }}
                  >
                    <a
                      className="nav-link text-sm-left text-center"
                      id="architecture-tab"
                      data-toggle="tab"
                      href="#architecture"
                      role="tab"
                      aria-controls="Architecture"
                      aria-selected="true"
                    >
                      Architecture
                    </a>
                  </li>
                  <li
                    className="nav-item flex-grow-1 border-bottom"
                    onClick={() => {
                      this.setState({ category: ["art"] });
                    }}
                  >
                    <a
                      className="nav-link text-sm-left text-center "
                      id="art-tab"
                      data-toggle="tab"
                      href="#art"
                      role="tab"
                      aria-controls="Art"
                      aria-selected="true"
                    >
                      Art
                    </a>
                  </li>
                  <li
                    className="nav-item flex-grow-1 border-bottom"
                    onClick={() => {
                      this.setState({ category: ["dance"] });
                    }}
                  >
                    <a
                      className="nav-link text-sm-left text-center"
                      id="dance-tab"
                      data-toggle="tab"
                      href="#dance"
                      role="tab"
                      aria-controls="Dance"
                      aria-selected="true"
                    >
                      Dance
                    </a>
                  </li>
                  <li
                    className="nav-item flex-grow-1 border-bottom"
                    onClick={() => {
                      this.setState({ category: ["fashion", "model"] });
                    }}
                  >
                    <a
                      className="nav-link text-sm-left text-center"
                      id="fashion-tab"
                      data-toggle="tab"
                      href="#fashion"
                      role="tab"
                      aria-controls="Fashion"
                      aria-selected="true"
                    >
                      Fashion
                    </a>
                  </li>
                  <li
                    className="nav-item flex-grow-1 border-bottom"
                    onClick={() => {
                      this.setState({ category: ["graphic"] });
                    }}
                  >
                    <a
                      className="nav-link text-sm-left text-center"
                      id="design-tab"
                      data-toggle="tab"
                      href="#design"
                      role="tab"
                      aria-controls="Design"
                      aria-selected="true"
                    >
                      Graphic Design
                    </a>
                  </li>
                  <li
                    className="nav-item flex-grow-1 border-bottom"
                    onClick={() => {
                      this.setState({ category: ["engineer"] });
                    }}
                  ></li>
                  <li
                    className="nav-item flex-grow-1 border-bottom"
                    onClick={() => {
                      this.setState({ category: ["photo"] });
                    }}
                  >
                    <a
                      className="nav-link text-sm-left text-center"
                      id="photography-tab"
                      data-toggle="tab"
                      href="#photography"
                      role="tab"
                      aria-controls="Photography"
                      aria-selected="true"
                    >
                      Photography
                    </a>
                  </li>
                  <li
                    className="nav-item flex-grow-1 border-bottom"
                    onClick={() => {
                      this.setState({
                        category: ["software", "develop", "program"],
                      });
                    }}
                  >
                    <a
                      className="nav-link text-sm-left text-center"
                      id="software-tab"
                      data-toggle="tab"
                      href="#software"
                      role="tab"
                      aria-controls="Software"
                      aria-selected="true"
                    >
                      Software
                    </a>
                  </li>
                  <li
                    className="nav-item flex-grow-1 border-bottom"
                    onClick={() => {
                      this.setState({
                        category: ["sport", "athlete", "coach", "player"],
                      });
                    }}
                  >
                    <a
                      className="nav-link text-sm-left text-center"
                      id="sport-tab"
                      data-toggle="tab"
                      href="#sport"
                      role="tab"
                      aria-controls="Sport"
                      aria-selected="true"
                    >
                      Sports
                    </a>
                  </li>
                  <li
                    className="nav-item flex-grow-1 border-bottom"
                    onClick={() => {
                      this.setState({ category: ["ui", "ux"] });
                    }}
                  >
                    <a
                      className="nav-link text-sm-left text-center"
                      id="design-tab"
                      data-toggle="tab"
                      href="#design"
                      role="tab"
                      aria-controls="Design"
                      aria-selected="true"
                    >
                      UI/UX Design
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    portfolios: state.portfolios,
  };
}

export default connect(mapStateToProps, { fetchPortfolios })(PortfolioList);
