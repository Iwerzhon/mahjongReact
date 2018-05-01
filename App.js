import React from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View  } from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { isLoading: true}
  }

  getInfos(fetchOpts = {}) {
    let baseUrl = 'https://api.guildwars2.com/v2/';
    let path = 'achievements';
    // let params = { 'lang': 'en', 'ids': '141,3672' };
    let params = { 'lang': 'en', 'ids': '141,3672' };

    var url = `${baseUrl}${path}`;
    var query = Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
    if (query) {
      url += `?${query}`;
    }
    // console.error("\n", url, 'https://api.guildwars2.com/v2/achievements?lang=en&ids=141,3672');
    return fetch(url, fetchOpts)
      .then((res) => res)
      .catch((ex) => console.log("Fetch Exception", ex));
  }

  componentDidMount(){
    return this.getInfos()
      .then((response) => response.json())
      .then((responseJson) => {
        console.error(responseJson);
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
