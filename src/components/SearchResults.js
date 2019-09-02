import React, { Component } from "react";
import PropTypes from "prop-types";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class SearchResults extends Component {
  state = {
    open: false,
    currentImg: ""
  };

  handleOpen = img => {
    this.setState({ open: true, currentImg: img });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let photoListContent;
    const { photos } = this.props;

    if (photos) {
      photoListContent = (
        <GridList cols={4}>
          {photos.map(photo => (
            <GridListTile key={photo.id}>
              <img src={photo.largeImageURL} alt="" />
              <GridListTileBar
                title={photo.tags}
                subtitle={
                  <span>
                    submitted by: <strong>{photo.user}</strong>
                  </span>
                }
                actionIcon={
                  <IconButton
                    onClick={() => this.handleOpen(photo.largeImageURL)}
                  >
                    <ZoomInIcon color="primary" />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      );
    } else {
      photoListContent = null;
    }

    return (
      <div>
        {photoListContent}
        <Dialog
          modal={"false"}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <img src={this.state.currentImg} alt="" style={{ width: "100%" }} />
          <DialogActions>
            <Button primary={"true"} onClick={this.handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SearchResults.propTypes = {
  photos: PropTypes.array.isRequired
};

export default SearchResults;
