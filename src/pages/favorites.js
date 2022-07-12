import React from 'react';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../components/caregando';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      lista: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite = () => {
    this.setState({ loading: true }, async () => {
      const lista = await getFavoriteSongs();
      this.setState({ lista, loading: false });
    });
  }

  favoriteSongs = (aa, e) => {
    this.setState({ loading: true }, async () => {
      const listen = e ? addSong : removeSong;
      await listen(aa);
      const lista = await getFavoriteSongs();
      this.setState({ lista, loading: false });
    });
  }

  render() {
    const { lista, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Carregando /> : (
          <MusicCard musicas={ lista } funOnChange={ this.favoriteSongs } />
        ) }
      </div>
    );
  }
}

export default Favorites;
