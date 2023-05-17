import { 
  StyleSheet, 
  View, 
  Dimensions,
} from 'react-native';
import { LineChart, } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

function CurrencyView() {
  const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Rainy Days"] // optional
};

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "white",
          backgroundGradientTo: "white",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "pink"
          }
        }}
      />
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default CurrencyView;