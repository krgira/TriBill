# TriBill
여행 가계부의 새로운 지평을 여는 트리빌에 어서오세요! 이 어플리케이션을 소개하게 되어서 기쁩니다.

사용된 주요 라이브러리
---------
    "@react-native-async-storage/async-storage": "1.17.11" => [https://reactnative.dev/docs/asyncstorage]
    "@react-navigation": "^6.1.6" => [https://reactnavigation.org/]
    "axios": "^1.4.0" => [https://axios-http.com/kr/]
    "expo-google-sign-in": "^11.0.0" => [https://docs.expo.dev/guides/authentication/]
    "react": "18.2.0" => [https://ko.legacy.reactjs.org/]
    "react-native": "0.71.8" => [https://reactnative.dev/]
    "react-native-calendars": "^1.1297.0" => [https://github.com/wix/react-native-calendars]
    "react-native-chart-kit": "^6.12.0", => [https://github.com/indiespirit/react-native-chart-kit]
    "react-native-maps": "1.3.2" => [https://github.com/react-native-maps/react-native-maps]
    "react-native-paper": "^5.8.0" => [https://callstack.github.io/react-native-paper/]

실행 환경
-----------
Android 8.0 Oreo 
IOS 16.4 

실행 방법
----------
1. 계정 생성
    "expo-google-sign-in" 라이브러리 사용
    구글 소셜 로그인 후 어플리케이션으로 redirect


2. 여행 생성
    [국가 선택]
    - 국가의 즐겨찾기 추가가 가능합니다.
    - 여러 국가를 선택할 수 있습니다.
    - 원하는 국가가 있을 경우, 검색 기능을 통해 찾을 수 있습니다.

    [일정 선택]
    - 달력에서 시작일과 종료일을 선택합니다.
    
    [예산 선택]
    - 숫자 패드를 통해 예산을 설정합니다.

3. 여행 생성 이후
    여행 생성 이후 하단의 네가지 페이지에 접근이 가능합니다.

    [여행 목록 페이지]
    [환율 페이지]
    [지도 페이지]
    [설정 페이지]

    ...

    (1) 여행 목록 페이지
        생성한 여행을 목록으로 보여줍니다. 여행 목록을 클릭하면 해당 여행의 가계부 페이지를 볼 수 있습니다.
        
        [해당 여행 가계부]
        해당 페이지에서 가능한 기능입니다.
        - 초대 코드 발급
        - 가계부 기록

    (2) 환율 페이지
        