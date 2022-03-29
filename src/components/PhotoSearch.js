import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import SearchResults from "./SearchResults";

class PhotoSearch extends Component {
  state = {
    searchText: "",
    numPhotos: 20,
    apiUrl: "https://pixabay.com/api",
    apiKey: `${process.env.PIXABAY_API_KEY}`,
    photos: []
  };

  onTextChange = e => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === "") {
        this.setState({ photos: [] });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&per_page=${this.state.numPhotos}&image_type=photo`
          )
          .then(res => this.setState({ photos: res.data.hits }))
          .catch(err => console.log(err));
      }
    });
  };

  onNumPhotosChange = e => {
    this.setState({ numPhotos: e.target.value });
  };

  render() {
    return (
      <Container maxWidth="xl">
        <TextField
          mt={5}
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          fullWidth={true}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <InputLabel htmlFor="num-photos"># of Photos</InputLabel>
                <Select
                  value={this.state.numPhotos}
                  onChange={this.onNumPhotosChange}
                  inputProps={{
                    name: "numPhotos",
                    id: "num-photos"
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={40}>40</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </InputAdornment>
            )
          }}
        />

        <br />
        {this.state.photos.length > 0 ? (
          <SearchResults photos={this.state.photos} />
        ) : null}
      </Container>
    );
  }
}

export default PhotoSearch;
