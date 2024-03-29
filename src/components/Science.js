import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import PageBodyList from './PageBodyList';
import {
  UPDATE_FIELD_AUTH,
  SCIENCE,
  SCIENCE_PAGE_UNLOADED
} from '../constants/actionTypes';

const rails_url = "http://localhost:3000/api/v1/science";
const node_url = "http://localhost:3000/science";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onUnload: () =>
    dispatch({ type: SCIENCE_PAGE_UNLOADED })
});

class Science extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  fetchData() {
    // fetch(rails_url)
    fetch(node_url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (
      <div className="page-container" style={{ marginTop: "5rem"}}>
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Science</h1>
              <p className="text-xs-center">
                  No plastic please.. 
              </p>
          </div>
        </div>
        <PageBodyList page_name="science" items={this.state.items}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Science);
