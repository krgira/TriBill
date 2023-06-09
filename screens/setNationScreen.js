import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4974A5",
    paddingHorizontal: 10,
    paddingVertical: 18,
    borderRadius: 10,
    
},
buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
},
  countryBox: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 8,
    position: 'absolute',
    width: screenWidth,
    height: 664,
    left: 0,
    top: 148,
    alignSelf: 'center',
    marginLeft: '1.5%',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    width: 359,
    height: 64,
  },
  countryEmojiBox: {
    width: 40,
    height: 40,
    backgroundColor: '#EAF0F7',
    borderRadius: 16,
    marginLeft: -8,
    marginRight: 8,
  },
  countryEmoji: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 29,
    textAlign: 'center',
    color: '#000000',
    marginTop: 5,
  },
  countryName: {
    flex: 1,
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgray',
    marginVertical: 8,
    width: '100%',
  },
  searchBar: {
    width: '95%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 40,
    marginTop: -80,
    alignSelf: 'center',
  },
});



const setNationScreen = () => {
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedNations, setSelectedNations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const countries = [
    { currencyType: "GHS", id: 1, name: "가나", emoji: "🇬🇭" },
    { currencyType: "GNF", id: 2, name: "기니", emoji: "🇬🇳" },
    { currencyType: "GMD", id: 3, name: "감비아", emoji: "🇬🇲" },
    { currencyType: "GYD", id: 4, name: "가이아나", emoji: "🇬🇾" },
    { currencyType: "GGP", id: 5, name: "건지 섬", emoji: "🇬🇬" },
    { currencyType: "XDR", id: 6, name: "국제통화기금", emoji: "💰" },
    { currencyType: "GRC", id: 7, name: "그리스", emoji: "🇬🇷" },
    { currencyType: "GTQ", id: 8, name: "과테말라", emoji: "🇬🇹" },
    { currencyType: "ANG", id: 9, name: "네덜란드령 안틸레스", emoji: "🇳🇱" },
    { currencyType: "NOK", id: 10, name: "노르웨이", emoji: "🇳🇴" },
    { currencyType: "NAD", id: 11, name: "나미비아", emoji: "🇳🇦" },
    { currencyType: "SSP", id: 12, name: "남수단", emoji: "🇸🇸" },
    { currencyType: "NGN", id: 13, name: "나이지리아", emoji: "🇳🇬" },
    { currencyType: "ZAR", id: 14, name: "남아프리카", emoji: "🇿🇦" },
    { currencyType: "NZD", id: 15, name: "뉴질랜드", emoji: "🇳🇿" },
    { currencyType: "NIO", id: 16, name: "니카라과", emoji: "🇳🇮" },
    { currencyType: "NLD", id: 17, name: "네덜란드", emoji: "🇳🇱" },
    { currencyType: "NPR", id: 18, name: "네팔", emoji: "🇳🇵" },
    { currencyType: "TWD", id: 19, name: "대만", emoji: "🇹🇼" },
    { currencyType: "DOP", id: 20, name: "도미니카 공화국", emoji: "🇩🇴" },
    { currencyType: "DKK", id: 21, name: "덴마크", emoji: "🇩🇰" },
    { id: 22, currencyType: "FOK", name: "덴마크령 페로제도", emoji: "🇫🇴" },
    { id: 23, currencyType: "XCD", name: "동카리브", emoji: "🏝️" },
    { id: 24, currencyType: "KRW", name: "대한민국", emoji: "🇰🇷" },
    { id: 25, currencyType: "EUR", name: "라트비아", emoji: "🇱🇻" },
    { id: 26, currencyType: "RON", name: "루마니아", emoji: "🇷🇴" },
    { id: 27, currencyType: "LBP", name: "레바논", emoji: "🇱🇧" },
    { id: 28, currencyType: "LYD", name: "리비아", emoji: "🇱🇾" },
    { id: 29, currencyType: "EUR", name: "리투아니아", emoji: "🇱🇹" },
    { id: 30, currencyType: "RUB", name: "러시아", emoji: "🇷🇺" },
    { id: 31, currencyType: "LSL", name: "레소토", emoji: "🇱🇸" },
    { id: 32, currencyType: "RWF", name: "르완다", emoji: "🇷🇼" },
    { id: 33, currencyType: "LRD", name: "라이베리아", emoji: "🇱🇷" },
    { id: 34, currencyType: "LAK", name: "라오스", emoji: "🇱🇦" },
    { id: 35, currencyType: "EUR", name: "말타", emoji: "🇲🇹" },
    { id: 36, currencyType: "MNT", name: "몽골", emoji: "🇲🇳" },
    { id: 37, currencyType: "USD", name: "미국", emoji: "🇺🇸" },
    { id: 38, currencyType: "MGA", name: "마다가스카르", emoji: "🇲🇬" },
    { id: 39, currencyType: "MDL", name: "몰도바", emoji: "🇲🇩" },
    { id: 40, currencyType: "MVR", name: "몰디브", emoji: "🇲🇻" },
    { id: 41, currencyType: "MUR", name: "모리셔스", emoji: "🇲🇺" },
    { id: 42, currencyType: "MWK", name: "말라위", emoji: "🇲🇼" },
    { id: 43, currencyType: "MYR", name: "말레이시아", emoji: "🇲🇾" },
    { id: 44, currencyType: "MAD", name: "모로코", emoji: "🇲🇦" },
    { id: 45, currencyType: "MRU", name: "모리타니", emoji: "🇲🇷" },
    { id: 46, currencyType: "IMP", name: "맨섬", emoji: "🇮🇲" },
    { id: 47, currencyType: "MXN", name: "멕시코", emoji: "🇲🇽" },
    { id: 48, currencyType: "MMK", name: "미얀마", emoji: "🇲🇲" },
    { id: 49, currencyType: "MZN", name: "모잠비크", emoji: "🇲🇿" },
    { id: 50, currencyType: "MOP", name: "마카오", emoji: "🇲🇴" },
    { id: 51, currencyType: "BDT", name: "방글라데시", emoji: "🇧🇩" },
    { id: 52, currencyType: "BGN", name: "불가리아", emoji: "🇧🇬" },
    { id: 53, currencyType: "VES", name: "베네수엘라", emoji: "🇻🇪" },
    { id: 54, currencyType: "VUV", name: "바누아투", emoji: "🇻🇺" },
    { id: 55, currencyType: "BND", name: "브루나이", emoji: "🇧🇳" },
    { id: 56, currencyType: "BIF", name: "부룬디", emoji: "🇧🇮" },
    { id: 57, currencyType: "BYN", name: "벨라루스", emoji: "🇧🇾" },
    { id: 58, currencyType: "BOB", name: "볼리비아", emoji: "🇧🇴" },
    { id: 59, currencyType: "BHD", name: "바레인", emoji: "🇧🇭" },
    { id: 60, currencyType: "BRL", name: "브라질", emoji: "🇧🇷" },
    { id: 61, currencyType: "EUR", name: "벨기에", emoji: "🇧🇪" },
    { id: 62, currencyType: "BZD", name: "벨리즈", emoji: "🇧🇿" },
    { id: 63, currencyType: "BMD", name: "버뮤다", emoji: "🇧🇲" },
    { id: 64, currencyType: "MKD", name: "북마케도니아", emoji: "🇲🇰" },
    { id: 65, currencyType: "BBD", name: "바베이도스", emoji: "🇧🇧" },
    { id: 66, currencyType: "BAM", name: "보스니아 헤르체고비나", emoji: "🇧🇦" },
    { id: 67, currencyType: "BWP", name: "보츠와나", emoji: "🇧🇼" },
    { id: 68, currencyType: "BTN", name: "부탄", emoji: "🇧🇹" },
    { id: 69, currencyType: "VND", name: "베트남", emoji: "🇻🇳" },
    { id: 70, currencyType: "BSD", name: "바하마", emoji: "🇧🇸" },
    { id: 71, currencyType: "SGD", name: "싱가포르", emoji: "🇸🇬" },
    { id: 72, currencyType: "SDG", name: "수단", emoji: "🇸🇩" },
    { id: 73, currencyType: "SRD", name: "수리남", emoji: "🇸🇷" },
    { id: 74, currencyType: "LKR", name: "스리랑카", emoji: "🇱🇰" },
    { id: 75, currencyType: "EUR", name: "스페인", emoji: "🇪🇸" },
    { id: 76, currencyType: "EUR", name: "슬로바키아", emoji: "🇸🇰" },
    { id: 77, currencyType: "EUR", name: "슬로베니아", emoji: "🇸🇮" },
    { id: 78, currencyType: "SBD", name: "솔로몬 제도", emoji: "🇸🇧" },
    { id: 79, currencyType: "RSD", name: "세르비아", emoji: "🇷🇸" },
    { id: 80, currencyType: "SYP", name: "시리아", emoji: "🇸🇾" },
    { id: 81, currencyType: "SOS", name: "소말리아", emoji: "🇸🇴" },
    { id: 82, currencyType: "WST", name: "사모아", emoji: "🇼🇸" },
    { id: 83, currencyType: "XOF", name: "서부 아프리카", emoji: "🌍" },
    { id: 84, currencyType: "SEK", name: "스웨덴", emoji: "🇸🇪" },
    { id: 85, currencyType: "SAR", name: "사우디아라비아", emoji: "🇸🇦" },
    { id: 86, currencyType: "SLE", name: "시에라리온", emoji: "🇸🇱" },
    { id: 87, currencyType: "SLL", name: "시에라리온 레온", emoji: "🇸🇱" },
    { id: 88, currencyType: "CHF", name: "스위스", emoji: "🇨🇭" },
    { id: 89, currencyType: "SCR", name: "세이셸", emoji: "🇸🇨" },
    { id: 90, currencyType: "SZL", name: "스와질랜드", emoji: "🇸🇿" },
    { id: 91, currencyType: "SHP", name: "세인트 헬레나", emoji: "🇬🇭" },
    { id: 92, currencyType: "STN", name: "상투메 프린시페", emoji: "🇸🇹" },
    { id: 93, currencyType: "GBP", name: "영국", emoji: "🇬🇧" },
    { id: 94, currencyType: "UGX", name: "우간다", emoji: "🇺🇬" },
    { id: 95, currencyType: "AOA", name: "앙골라", emoji: "🇦🇴" },
    { id: 96, currencyType: "INR", name: "인도", emoji: "🇮🇳" },
    { id: 97, currencyType: "IDR", name: "인도네시아", emoji: "🇮🇩" },
    { id: 98, currencyType: "HNL", name: "온두라스", emoji: "🇭🇳" },
    { id: 99, currencyType: "IRR", name: "이란", emoji: "🇮🇷" },
    { id: 100, currencyType: "EUR", name: "유럽 연합", emoji: "🇪🇺" },
    { id: 101, currencyType: "UYU", name: "우루과이", emoji: "🇺🇾" },
    { id: 102, currencyType: "JOD", name: "요르단", emoji: "🇯🇴" },
    { id: 103, currencyType: "AMD", name: "아르메니아", emoji: "🇦🇲" },
    { id: 104, currencyType: "AWG", name: "아루바", emoji: "🇦🇼" },
    { id: 105, currencyType: "AED", name: "아랍에미리트", emoji: "🇦🇪" },
    { id: 106, currencyType: "EUR", name: "아일랜드", emoji: "🇮🇪" },
    { id: 107, currencyType: "IQD", name: "이라크", emoji: "🇮🇶" },
    { id: 108, currencyType: "ERN", name: "에리트레아", emoji: "🇪🇷" },
    { id: 109, currencyType: "ARS", name: "아르헨티나", emoji: "🇦🇷" },
    { id: 110, currencyType: "OMR", name: "오만", emoji: "🇴🇲" },
    { id: 111, currencyType: "YER", name: "예멘", emoji: "🇾🇪" },
    { id: 112, currencyType: "JPY", name: "일본", emoji: "🇯🇵" },
    { id: 113, currencyType: "ALL", name: "알바니아", emoji: "🇦🇱" },
    { id: 114, currencyType: "ILS", name: "이스라엘", emoji: "🇮🇱" },
    { id: 115, currencyType: "AUD", name: "오스트레일리아", emoji: "🇦🇺" },
    { id: 116, currencyType: "EUR", name: "오스트리아", emoji: "🇦🇹" },
    { id: 117, currencyType: "ISK", name: "아이슬란드", emoji: "🇮🇸" },
    { id: 118, currencyType: "HTG", name: "아이티", emoji: "🇭🇹" },
    { id: 119, currencyType: "DZD", name: "알제리", emoji: "🇩🇿" },
    { id: 120, currencyType: "AZN", name: "아제르바이잔", emoji: "🇦🇿" },
    { id: 121, currencyType: "UZS", name: "우즈베키스탄", emoji: "🇺🇿" },
    { id: 122, currencyType: "EGP", name: "이집트", emoji: "🇪🇬" },
    { id: 123, currencyType: "EUR", name: "이탈리아", emoji: "🇮🇹" },
    { id: 124, currencyType: "UAH", name: "우크라이나", emoji: "🇺🇦" },
    { id: 125, currencyType: "ETB", name: "에티오피아", emoji: "🇪🇹" },
    { id: 126, currencyType: "AFN", name: "아프가니스탄", emoji: "🇦🇫" },
    { id: 127, currencyType: "CNY", name: "중국", emoji: "🇨🇳" },
    { id: 128, currencyType: "JMD", name: "자메이카", emoji: "🇯🇲" },
    { id: 129, currencyType: "GIP", name: "지브롤터", emoji: "🇬🇮" },
    { id: 130, currencyType: "ZWL", name: "짐바브웨", emoji: "🇿🇼" },
    { id: 131, currencyType: "ZMW", name: "잠비아", emoji: "🇿🇲" },
    { id: 132, currencyType: "DJF", name: "지부티", emoji: "🇩🇯" },
    { id: 133, currencyType: "XAF", name: "중앙 아프리카", emoji: "🇨🇫" },
    { id: 134, currencyType: "JEP", name: "저지 섬", emoji: "🇯🇪" },
    { id: 135, currencyType: "GEL", name: "조지아", emoji: "🇬🇪" },
    { id: 136, currencyType: "CLP", name: "칠레", emoji: "🇨🇱" },
    { id: 137, currencyType: "CZK", name: "체코", emoji: "🇨🇿" },
    { id: 138, currencyType: "CDF", name: "콩고 민주 공화국", emoji: "🇨🇩" },
    { id: 139, currencyType: "KES", name: "케냐", emoji: "🇰🇪" },
    { id: 140, currencyType: "CAD", name: "캐나다", emoji: "🇨🇦" },
    { id: 141, currencyType: "KGS", name: "키르기스스탄", emoji: "🇰🇬" },
    { id: 142, currencyType: "KID", name: "키리바시", emoji: "🇰🇮" },
    { id: 143, currencyType: "COP", name: "콜롬비아", emoji: "🇨🇴" },
    { id: 144, currencyType: "HRK", name: "크로아티아", emoji: "🇭🇷" },
    { id: 145, currencyType: "KMF", name: "코모로스", emoji: "🇰🇲" },
    { id: 146, currencyType: "CUP", name: "쿠바", emoji: "🇨🇺" },
    { id: 147, currencyType: "KHR", name: "캄보디아", emoji: "🇰🇭" },
    { id: 148, currencyType: "CVE", name: "카보베르데", emoji: "🇨🇻" },
    { id: 149, currencyType: "CRC", name: "코스타리카", emoji: "🇨🇷" },
    { id: 150, currencyType: "KYD", name: "케이맨 제도", emoji: "🇰🇾" },
    { id: 151, currencyType: "KWD", name: "쿠웨이트", emoji: "🇰🇼" },
    { id: 152, currencyType: "KZT", name: "카자흐스탄", emoji: "🇰🇿" },
    { id: 153, currencyType: "QAR", name: "카타르", emoji: "🇶🇦" },
    { id: 154, currencyType: "THB", name: "태국", emoji: "🇹🇭" },
    { id: 155, currencyType: "TOP", name: "통가", emoji: "🇹🇴" },
    { id: 156, currencyType: "TND", name: "튀니지", emoji: "🇹🇳" },
    { id: 157, currencyType: "TTD", name: "트리니다드 토바고", emoji: "🇹🇹" },
    { id: 158, currencyType: "TMT", name: "투르크메니스탄", emoji: "🇹🇲" },
    { id: 159, currencyType: "TZS", name: "탄자니아", emoji: "🇹🇿" },
    { id: 160, currencyType: "TRY", name: "터키", emoji: "🇹🇷" },
    { id: 161, currencyType: "PAB", name: "파나마", emoji: "🇵🇦" },
    { id: 162, currencyType: "PEN", name: "페루", emoji: "🇵🇪" },
    { id: 163, currencyType: "PYG", name: "파라과이", emoji: "🇵🇾" },
    { id: 164, currencyType: "EUR", name: "포르투갈", emoji: "🇵🇹" },
    { id: 165, currencyType: "PLN", name: "폴란드", emoji: "🇵🇱" },
    { id: 166, currencyType: "EUR", name: "프랑스", emoji: "🇫🇷" },
    { id: 167, currencyType: "XPF", name: "프랑스령 폴리네시아", emoji: "🇵🇫" },
    { id: 168, currencyType: "EUR", name: "핀란드", emoji: "🇫🇮" },
    { id: 169, currencyType: "PHP", name: "필리핀", emoji: "🇵🇭" },
    { id: 170, currencyType: "FJD", name: "피지", emoji: "🇫🇯" },
    { id: 171, currencyType: "FKP", name: "포클랜드 제도", emoji: "🇫🇰" },
    { id: 172, currencyType: "PKR", name: "파키스탄", emoji: "🇵🇰" },
    { id: 173, currencyType: "PGK", name: "파푸아뉴기니", emoji: "🇵🇬" },
    { id: 174, currencyType: "HUF", name: "헝가리", emoji: "🇭🇺" },
    { id: 175, currencyType: "HKD", name: "홍콩", emoji: "🇭🇰" }
  ];
  const navigation = useNavigation();
  const toggleFavorite = (id) => {
    setFavoriteCountries((prevFavorites) => {
      const isFavorite = prevFavorites.some((country) => country.id === id);

      if (isFavorite) {
        return prevFavorites.filter((country) => country.id !== id);
      } else {
        const countryIndex = countries.findIndex((country) => country.id === id);
        const updatedCountries = [...countries];
        updatedCountries[countryIndex] = { ...updatedCountries[countryIndex], isFavorite: true };

        return [...prevFavorites, updatedCountries[countryIndex]];
      }
    });
  };
  //console.log(selectedCountries);
  //console.log(selectedNations);

  const handlePayWithPress = (item) => {
    const isItemSelected = selectedCountries.some((selectedItem) => selectedItem.id === item.id);

    if (isItemSelected) {
      setSelectedCountries(selectedCountries.filter((selectedItem) => selectedItem.id !== item.id));
      setSelectedNations(selectedNations.filter((selectedItem) => selectedItem !== item.name));
    } else {
      setSelectedCountries([...selectedCountries, item]);
      setSelectedNations([...selectedNations, item.name]);
    }
  };

  const filteredCountries = countries
    .filter((country) => country.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const isAFavorite = favoriteCountries.some((country) => country.id === a.id);
      const isBFavorite = favoriteCountries.some((country) => country.id === b.id);

      if (isAFavorite && !isBFavorite) {
        return -1;
      } else if (!isAFavorite && isBFavorite) {
        return 1;
      } else {
        return 0;
      }
    });

  const handleSearchQueryChange = (text) => {
    setSearchQuery(text);
  };

  const renderCountry = ({ item, index }) => {
    const isFavorite = favoriteCountries.some((country) => country.id === item.id);
    const isLastFavorite = index === favoriteCountries.length - 1;

    return (
      <TouchableOpacity 
        onPress={() => handlePayWithPress(item)}
        style={{
          borderRadius: 20,
          backgroundColor: selectedCountries.some((selectedItem) => selectedItem.id === item.id)
            ? '#CBDAEC' // Change the background color to the desired color when selected
            : 'transparent' // Change the background color to the desired color when not selected
        }}
        >
        <View style={styles.countryItem}>
          <View style={styles.countryEmojiBox}>
            <Text style={styles.countryEmoji}>{item.emoji}</Text>
          </View>
          <Text style={styles.countryName}>{item.name}</Text>
          {!isFavorite ? (
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <Ionicons name="star-outline" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <Ionicons name="star" size={24} color="#F6C156" />
            </TouchableOpacity>
          )}
        </View>
        {isFavorite && isLastFavorite && <View style={styles.separator} />}
      </TouchableOpacity>


    );
  };

  const setNation = () => {
    fetch('http://172.30.1.16:8080/test/calendar', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nations: selectedNations,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
    console.log("fetch end");
  };

  const onPress = () => {
    setNation();
    navigation.navigate("SetSchedule");
  };


  return (
    <View style={styles.countryBox}>
      <TextInput
        style={styles.searchBar}
        value={searchQuery}
        onChangeText={handleSearchQueryChange}
        placeholder="국가를 검색하세요"
        autoCapitalize="none"
      />
      <FlatList
        data={filteredCountries}
        renderItem={renderCountry}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style ={{flex:2}}
      />
        <View>
          <TouchableOpacity 
              style={styles.button}
              onPress={onPress}>
                  <Text style={styles.buttonText}>새 가계부 등록하기</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default setNationScreen;
