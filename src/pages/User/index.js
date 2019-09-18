import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OnwerAvatar,
  Info,
  Title,
  Author,
  ActivityIndicator,
} from './styles';

class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  state = {
    stars: [],
    loading: false,
    page: 1,
    refreshing: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const { page } = this.state;

    await this.loadStarred(page);

    this.setState({ loading: false });
  }

  loadStarred = async () => {
    const { navigation } = this.props;
    const { login } = navigation.getParam('user');
    const { page, stars } = this.state;

    const response = await api.get(`/users/${login}/starred`, {
      params: {
        per_page: 15,
        page,
      },
    });

    this.setState({
      stars: [].concat(stars, response.data),
      loading: false,
      page: page + 1,
      refreshing: false,
    });
  };

  handleNavigate = repository => {
    const { navigation } = this.props;
    navigation.navigate('Repository', { repository });
  };

  refreshList = () => {
    this.setState({ refreshing: true, stars: [], page: 1 }, this.loadStarred);
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Stars
            data={stars}
            keyExtractor={start => String(start.id)}
            onEndReachedThreshold={0.1}
            onEndReached={this.loadStarred}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OnwerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};

export default User;
