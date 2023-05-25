import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  countryBox: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 8,
    position: 'absolute',
    width: 375,
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

const NationListView = () => {
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const countries = [
    { id: "GHS", name: "가나", emoji: "🇬🇭" }, 
{ id: "GNF", name: "기니", emoji: "🇬🇳" }, 
{ id: "GMD", name: "감비아", emoji: "🇬🇲" },
{ id: "GYD", name: "가이아나", emoji: "🇬🇾" },
{ id: "GGP", name: "건지 섬", emoji: "🇬🇬" },
{ id: "XDR", name: "국제통화기금", emoji: "💰" },
{ id: "GTQ", name: "과테말라", emoji: "🇬🇹" },
{ id: "ANG", name: "네덜란드령 안틸레스", emoji: "🇳🇱" },
{ id: "NOK", name: "노르웨이", emoji: "🇳🇴" },
{ id: "NAD", name: "나미비아", emoji: "🇳🇦" },
{ id: "SSP", name: "남수단", emoji: "🇸🇸" },
{ id: "NGN", name: "나이지리아", emoji: "🇳🇬" },
{ id: "ZAR", name: "남아프리카", emoji: "🇿🇦" },
{ id: "NZD", name: "뉴질랜드", emoji: "🇳🇿" },
{ id: "NIO", name: "니카라과", emoji: "🇳🇮" },
{ id: "NPR", name: "네팔", emoji: "🇳🇵" },
{ id: "TWD", name: "대만", emoji: "🇹🇼" },
{ id: "DOP", name: "도미니카 공화국", emoji: "🇩🇴" },
{ id: "DKK", name: "덴마크", emoji: "🇩🇰" },
{ id: "FOK", name: "덴마크령 페로제도", emoji: "🇫🇴" },
{ id: "XCD", name: "동카리브", emoji: "🏝️" },
{ id: "KRW", name: "대한민국", emoji: "🇰🇷" },
{ id: "RON", name: "루마니아", emoji: "🇷🇴" },
{ id: "LBP", name: "레바논", emoji: "🇱🇧" },
{ id: "LYD", name: "리비아", emoji: "🇱🇾" },
{ id: "RUB", name: "러시아", emoji: "🇷🇺" },
{ id: "LSL", name: "레소토", emoji: "🇱🇸" },
{ id: "RWF", name: "르완다", emoji: "🇷🇼" },
{ id: "LRD", name: "라이베리아", emoji: "🇱🇷" },
{ id: "LAK", name: "라오스", emoji: "🇱🇦" },
{ id: "MNT", name: "몽골", emoji: "🇲🇳" },
{ id: "USD", name: "미국", emoji: "🇺🇸" },
{ id: "MGA", name: "마다가스카르", emoji: "🇲🇬" },
{ id: "MDL", name: "몰도바", emoji: "🇲🇩" },
{ id: "MVR", name: "몰디브", emoji: "🇲🇻" },
{ id: "MUR", name: "모리셔스", emoji: "🇲🇺" },
{ id: "MWK", name: "말라위", emoji: "🇲🇼" },
{ id: "MYR", name: "말레이시아", emoji: "🇲🇾" },
{ id: "MAD", name: "모로코", emoji: "🇲🇦" },
{ id: "MRU", name: "모리타니", emoji: "🇲🇷" },
{ id: "IMP", name: "맨섬", emoji: "🇮🇲" },
{ id: "MXN", name: "멕시코", emoji: "🇲🇽" },
{ id: "MMK", name: "미얀마", emoji: "🇲🇲" },
{ id: "MZN", name: "모잠비크", emoji: "🇲🇿" },
{ id: "MOP", name: "마카오", emoji: "🇲🇴" },
{ id: "BDT", name: "방글라데시", emoji: "🇧🇩" },
{ id: "BGN", name: "불가리아", emoji: "🇧🇬" },
{ id: "VES", name: "베네수엘라", emoji: "🇻🇪" },
{ id: "VUV", name: "바누아투", emoji: "🇻🇺" },
{ id: "BND", name: "브루나이", emoji: "🇧🇳" },
{ id: "BIF", name: "부룬디", emoji: "🇧🇮" },
{ id: "BYN", name: "벨라루스", emoji: "🇧🇾" },
{ id: "BOB", name: "볼리비아", emoji: "🇧🇴" },
{ id: "BHD", name: "바레인", emoji: "🇧🇭" },
{ id: "BRL", name: "브라질", emoji: "🇧🇷" },
{ id: "BZD", name: "벨리즈", emoji: "🇧🇿" },
{ id: "BMD", name: "버뮤다", emoji: "🇧🇲" },
{ id: "MKD", name: "북마케도니아", emoji: "🇲🇰" },
{ id: "BBD", name: "바베이도스", emoji: "🇧🇧" },
{ id: "BAM", name: "보스니아 헤르체고비나", emoji: "🇧🇦" },
{ id: "BWP", name: "보츠와나", emoji: "🇧🇼" },
{ id: "BTN", name: "부탄", emoji: "🇧🇹" },
{ id: "VND", name: "베트남", emoji: "🇻🇳" },
{ id: "BSD", name: "바하마", emoji: "🇧🇸" },
{ id: "SGD", name: "싱가포르", emoji: "🇸🇬" },
{ id: "SDG", name: "수단", emoji: "🇸🇩" },
{ id: "SRD", name: "수리남", emoji: "🇸🇷" },
{ id: "LKR", name: "스리랑카", emoji: "🇱🇰" },
{ id: "SBD", name: "솔로몬 제도", emoji: "🇸🇧" },
{ id: "RSD", name: "세르비아", emoji: "🇷🇸" },
{ id: "SYP", name: "시리아", emoji: "🇸🇾" },
{ id: "SOS", name: "소말리아", emoji: "🇸🇴" },
{ id: "WST", name: "사모아", emoji: "🇼🇸" },
{ id: "XOF", name: "서부 아프리카", emoji: "🌍" },
{ id: "SEK", name: "스웨덴", emoji: "🇸🇪" },
{ id: "SAR", name: "사우디아라비아", emoji: "🇸🇦" },
{ id: "SLE", name: "시에라리온", emoji: "🇸🇱" },
{ id: "SLL", name: "시에라리온 레온", emoji: "🇸🇱" },
{ id: "CHF", name: "스위스", emoji: "🇨🇭" },
{ id: "SCR", name: "세이셸", emoji: "🇸🇨" },
{ id: "SZL", name: "스와질랜드", emoji: "🇸🇿" },
{ id: "SHP", name: "세인트 헬레나", emoji: "🇬🇭" },
{ id: "STN", name: "상투메 프린시페", emoji: "🇸🇹" },
{ id: "GBP", name: "영국", emoji: "🇬🇧" },
{ id: "UGX", name: "우간다", emoji: "🇺🇬" },
{ id: "AOA", name: "앙골라", emoji: "🇦🇴" },
{ id: "INR", name: "인도", emoji: "🇮🇳" },
{ id: "IDR", name: "인도네시아", emoji: "🇮🇩" },
{ id: "HNL", name: "온두라스", emoji: "🇭🇳" },
{ id: "IRR", name: "이란", emoji: "🇮🇷" },
{ id: "EUR", name: "유럽 연합", emoji: "🇪🇺" },
{ id: "UYU", name: "우루과이", emoji: "🇺🇾" },
{ id: "JOD", name: "요르단", emoji: "🇯🇴" },
{ id: "AMD", name: "아르메니아", emoji: "🇦🇲" },
{ id: "AWG", name: "아루바", emoji: "🇦🇼" },
{ id: "AED", name: "아랍에미리트", emoji: "🇦🇪" },
{ id: "IQD", name: "이라크", emoji: "🇮🇶" },
{ id: "ERN", name: "에리트레아", emoji: "🇪🇷" },
{ id: "ARS", name: "아르헨티나", emoji: "🇦🇷" },
{ id: "OMR", name: "오만", emoji: "🇴🇲" },
{ id: "YER", name: "예멘", emoji: "🇾🇪" },
{ id: "JPY", name: "일본", emoji: "🇯🇵" },
{ id: "ALL", name: "알바니아", emoji: "🇦🇱" },
{ id: "ILS", name: "이스라엘", emoji: "🇮🇱" },
{ id: "AUD", name: "오스트레일리아", emoji: "🇦🇺" },
{ id: "ISK", name: "아이슬란드", emoji: "🇮🇸" },
{ id: "HTG", name: "아이티", emoji: "🇭🇹" },
{ id: "DZD", name: "알제리", emoji: "🇩🇿" },
{ id: "AZN", name: "아제르바이잔", emoji: "🇦🇿" },
{ id: "UZS", name: "우즈베키스탄", emoji: "🇺🇿" },
{ id: "EGP", name: "이집트", emoji: "🇪🇬" },
{ id: "UAH", name: "우크라이나", emoji: "🇺🇦" },
{ id: "ETB", name: "에티오피아", emoji: "🇪🇹" },
{ id: "AFN", name: "아프가니스탄", emoji: "🇦🇫" },
{ id: "CNY", name: "중국", emoji: "🇨🇳" },
{ id: "JMD", name: "자메이카", emoji: "🇯🇲" },
{ id: "GIP", name: "지브롤터", emoji: "🇬🇮" },
{ id: "ZWL", name: "짐바브웨", emoji: "🇿🇼" },
{ id: "ZMW", name: "잠비아", emoji: "🇿🇲" },
{ id: "DJF", name: "지부티", emoji: "🇩🇯" },
{ id: "XAF", name: "중앙 아프리카", emoji: "🇨🇫" },
{ id: "JEP", name: "저지 섬", emoji: "🇯🇪" },
{ id: "GEL", name: "조지아", emoji: "🇬🇪" },
{ id: "CLP", name: "칠레", emoji: "🇨🇱" },
{ id: "CZK", name: "체코", emoji: "🇨🇿" },
{ id: "CDF", name: "콩고 민주 공화국", emoji: "🇨🇩" },
{ id: "KES", name: "케냐", emoji: "🇰🇪" },
{ id: "CAD", name: "캐나다", emoji: "🇨🇦" },
{ id: "KGS", name: "키르기스스탄", emoji: "🇰🇬" },
{ id: "KID", name: "키리바시", emoji: "🇰🇮" },
{ id: "COP", name: "콜롬비아", emoji: "🇨🇴" },
{ id: "HRK", name: "크로아티아", emoji: "🇭🇷" },
{ id: "KMF", name: "코모로스", emoji: "🇰🇲" },
{ id: "CUP", name: "쿠바", emoji: "🇨🇺" },
{ id: "KHR", name: "캄보디아", emoji: "🇰🇭" },
{ id: "CVE", name: "카보베르데", emoji: "🇨🇻" },
{ id: "CRC", name: "코스타리카", emoji: "🇨🇷" },
{ id: "KYD", name: "케이맨 제도", emoji: "🇰🇾" },
{ id: "KWD", name: "쿠웨이트", emoji: "🇰🇼" },
{ id: "KZT", name: "카자흐스탄", emoji: "🇰🇿" },
{ id: "QAR", name: "카타르", emoji: "🇶🇦" },
{ id: "THB", name: "태국", emoji: "🇹🇭" },
{ id: "TOP", name: "통가", emoji: "🇹🇴" },
{ id: "TND", name: "튀니지", emoji: "🇹🇳" },
{ id: "TTD", name: "트리니다드 토바고", emoji: "🇹🇹" },
{ id: "TMT", name: "투르크메니스탄", emoji: "🇹🇲" },
{ id: "TZS", name: "탄자니아", emoji: "🇹🇿" },
{ id: "TRY", name: "터키", emoji: "🇹🇷" },
{ id: "PAB", name: "파나마", emoji: "🇵🇦" },
{ id: "PEN", name: "페루", emoji: "🇵🇪" },
{ id: "PYG", name: "파라과이", emoji: "🇵🇾" },
{ id: "PLN", name: "폴란드", emoji: "🇵🇱" },
{ id: "XPF", name: "프랑스령 폴리네시아", emoji: "🇵🇫" },
{ id: "PHP", name: "필리핀", emoji: "🇵🇭" },
{ id: "FJD", name: "피지", emoji: "🇫🇯" },
{ id: "FKP", name: "포클랜드 제도", emoji: "🇫🇰" },
{ id: "PKR", name: "파키스탄", emoji: "🇵🇰" },
{ id: "PGK", name: "파푸아뉴기니", emoji: "🇵🇬" },
{ id: "HUF", name: "헝가리", emoji: "🇭🇺" },
{ id: "HKD", name: "홍콩", emoji: "🇭🇰" }



  ];

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
    <>
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
    </>
  );
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
      />
    </View>
  );
};

export default NationListView;
