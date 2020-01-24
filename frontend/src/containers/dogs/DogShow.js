import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchDogs } from '../../actions/dogs';
import DogHeader from '../../components/dogs/DogHeader';
import { DogsSidebar } from './DogsSidebar';
import Skills from '../skills/Skills';

class DogShow extends Component {

  renderShowComponents = () => {
    console.log('load state in render fx: ', this.props.loading)
    if (this.props.loading && !this.props.dogs.length) {
      console.log('dogshow loading');
      return <h3>Loading...</h3>
    } else {

      const { dogs, match } = this.props;
      console.log('all dogs:', dogs);
      const dog = dogs.find(dog => dog.id.toString() === match.params.dogId.toString());
      console.log('dog:', dog);
      return(
        <>
          <DogHeader dog={dog} />
          <Skills dogId={dog.id} />
          <DogsSidebar dogs={dogs} currentDogId={dog.id} />
        </>
      );
    }
  }

  render() {
    console.log('load state at initial attemp to render: ', this.props.loading)
    return(
      <div className="dog-show">
        {this.renderShowComponents()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dogs: state.dogs.dogs,
    loading: state.dogs.loading
  }
}

export default connect(mapStateToProps, { fetchDogs })(DogShow);
