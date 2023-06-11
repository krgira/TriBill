import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions, } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import axios from 'axios';

import AlarmCurrencyButton from '../components/AlarmCurrencyButton';
import ChangeCurrencyButton from '../components/ChangeCurrencyButton';


function CurrencyScreen() {
  const screenWidth = Dimensions.get("window").width;
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [graphData, setGraphData] = useState([]);
  const [graphLabels, setGraphLabels] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/currency/v1?Nation=${selectedCurrency}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log(response);
  
      if (response.status === 200) {
        const data = response.data;
        console.log(data); // Log the received data
  
        const graphData = data.data;
        const graphLabels = data.labels;
  
        // Update state variables with the retrieved data
        setGraphData(graphData);
        setGraphLabels(graphLabels);
      } else {
        // Handle error responses
        console.log('Error (response not okay):', response.data);
      }
    } catch (error) {
      // Handle network errors
      console.log('Error (fetchData error):', error);
    }
  };

  useEffect(() => {
    fetchData();
    // Divide each value in graphData by 1 and save it as krwData
  }, []);


    const data = {
        labels: graphLabels,
        datasets: [
          {
            data: graphData,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2
          }
        ],
        //legend: ["Rainy Days"]
    };

  return (
    <View style={styles.container}>
      <View>
        <AlarmCurrencyButton />
      </View>
      
      <View style={styles.graph}>
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '4',
              strokeWidth: "2",
              stroke: "pink"
            }
          }}
        />
      </View>

      <View style={styles.currencyButton}>
        <ChangeCurrencyButton />
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  graph: {
    flex: 1,
  },
  currencyButton: {
    flex: 1,
  },
});

export default CurrencyScreen;