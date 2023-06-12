import React, { useState, useEffect } from 'react';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

const MapScreen = () => {
  const KOREA_LATITUDE = 37.5665; // 대한민국 위도
  const KOREA_LONGITUDE = 126.9780; // 대한민국 경도
  const ZOOM_LEVEL = 70; // 확대 정도 조절
  const GOOGLE_MAPS_API_KEY = 'AIzaSyD9zR2OmIdJG31qTIVjzMt54Fa64Tcy-Fs'; // Google Maps Geocoding API 키
  const COUNTRY_TRANSLATION_API_KEY = 'AIzaSyAb3_RJOHfh0awr5qu_tIHAoZKoc8K5x5A'; // 국가 이름 변환 API 키

  const [locations, setLocations] = useState([]);
  const [nationsFromServer, setNationFromServer] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedTravelList, setSelectedTravelList] = useState([]);


  async function fetchData() {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      console.log('fetch data token: ' + jwtToken);
  
      const response = await axios.get('http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/report', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      
      const data = response.data;
      console.log(data);

      setNationFromServer(response.data.nations);

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

   
    console.log(newLocations);
  } catch (error) {
    console.error('Error fetching nations:', error);
  }
}

  
  useEffect(() => {
    fetchData();
  }, []);


  const handleMarkerPress = async (countryIndex) => {
    const country = nationsFromServer[countryIndex];
    setSelectedCountry(country);
    console.log('선택한 국가:', country);
    const jwtToken = await AsyncStorage.getItem('jwtToken');

  try {
    const response = await axios.get(`http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/report/travel/list?nation=${encodeURIComponent(country)}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
   
    
    const data = response.data;
    console.log(data);
    
    setSelectedTravelList(data);

    console.log(selectedTravelList);

    // 받아온 데이터를 처리하는 로직을 작성합니다.
    
  } catch (error) {
    console.error('데이터 요청 중 오류 발생:', error);
  }
};




const SelectedTravelList = ({ travelList }) => {
  const navigation = useNavigation();
  return (
    <View>
      {travelList.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.travelItemContainer}
          onPress={() => {
            navigation.navigate('Report');
          }}>
          <Text style={styles.travelItemTitle}>{item.title}</Text>
          <Text style={styles.travelItemDate}>{item.startDate} - {item.endDate}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};


  
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
          title="나라"
          //description=""
          onPress={() => handleMarkerPress(index)}
        />
      ))}

      </MapView>
      {selectedCountry && (
      <View style={styles.travelListContainer}>
        <Text style={styles.travelListTitle}>Travel List</Text>
        <SelectedTravelList travelList={selectedTravelList} />
      </View>
    )}
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
  },
  travelListContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    maxHeight: 200,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    zIndex: 1,
    overflow: 'hidden',
  },
  travelItemContainer: {
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  travelItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  travelItemDate: {
    fontSize: 14,
    color: '#666',
  },
});