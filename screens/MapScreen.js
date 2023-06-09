import * as React from 'react';
import { PROVIDER_GOOGLE, Marker  } from 'react-native-maps';
import MapView from 'react-native-maps';
import { Button, Image, Text, View, StyleSheet}from 'react-native';
import axios from 'axios';

const MapScreen = () => {
 
  return(
  <View style={styles.screen}>
  	  <MapView // 셀프클로징해도 되지만 후의 마커를 위해서
		style={styles.map}
		initialRegion={{
            latitude: 37.00000,
            longitude: 126.00000,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        provider={PROVIDER_GOOGLE}
		> 
    <Marker
            coordinate={{
            latitude: 37.00000,
            longitude: 126.00000,
          }}
            pinColor="#2D63E2"
            title="하이"
            description="테스트"
          />
      </MapView>
  </View>
  )
  
}

export default MapScreen

const styles = StyleSheet.create({
	screen:{
      flex:1
    },
  	map:{
	  width: "100%",
  	  height : "100%"
	}
})