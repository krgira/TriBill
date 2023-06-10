import React, { useState, useEffect } from 'react';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { Button, Image, Text, View, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MapScreen = () => {
  const KOREA_LATITUDE = 37.5665; // 대한민국의 위도
  const KOREA_LONGITUDE = 126.9780; // 대한민국의 경도
  const ZOOM_LEVEL = 70; // 확대 정도 조절을 위한 값
  const [location, setLocation] = useState(null);
  // const [country, setCountry] = useState('한국'); // 입력된 국가 이름 (한글)
  const GOOGLE_MAPS_API_KEY = 'AIzaSyD9zR2OmIdJG31qTIVjzMt54Fa64Tcy-Fs'; // Google Maps Geocoding API 키
  const COUNTRY_TRANSLATION_API_KEY = 'AIzaSyAb3_RJOHfh0awr5qu_tIHAoZKoc8K5x5A'; // 국가 이름 변환 API 키
  const [locations, setLocations] = React.useState([]);

  async function fetchData() {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      console.log(jwtToken);
  
      const response = await axios.get('http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/report', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
  
      const nationsFromServer = response.data.nations;
      console.log(nationsFromServer);
      const newLocations = [];

      for (const country of nationsFromServer) {
        try {
          const translationResponse = await axios.get(
            `https://translation.googleapis.com/language/translate/v2?key=${COUNTRY_TRANSLATION_API_KEY}&q=${encodeURIComponent(country)}&source=ko&target=en`
          );
  
          const translatedCountryName = translationResponse.data.data.translations[0].translatedText;
          console.log(translatedCountryName);
          const encodedCountry = encodeURIComponent(translatedCountryName);
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedCountry}&key=${GOOGLE_MAPS_API_KEY}`
          );
  
           if (response.data.results && response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location;
          const location = { latitude: lat, longitude: lng };
          newLocations.push(location);
          console.log(location);
        } else {
          console.error('No coordinates found for the country:', translatedCountryName);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    }

    setLocations(newLocations); // 새로운 배열을 상태로 설정

    // locations 배열에 모든 위치가 포함되어 있습니다.
    console.log(newLocations);
  } catch (error) {
    console.error('Error fetching nations:', error);
  }
}
  
  useEffect(() => {
    fetchData();
  }, []);
  
  

  return (
    <View style={styles.screen}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: KOREA_LATITUDE,
          longitude: KOREA_LONGITUDE,
          latitudeDelta: ZOOM_LEVEL,
          longitudeDelta: ZOOM_LEVEL,
        }}
        provider={PROVIDER_GOOGLE}
      >
      {locations.map((location, index) => (
        <Marker
          key={index}
          coordinate={location}
          pinColor="#2D63E2"
          title="제목"
          description="테스트"
        />
      ))}

      </MapView>
    </View>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  map: {
    width: "100%",
    height: "100%"
  }
});