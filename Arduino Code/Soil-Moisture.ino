#include <WiFi.h>
#include <WiFiClient.h>
#include <ThingSpeak.h>
#include <DHT.h>

const char* ssid = "MANU-ZENBOOK 4035";
const char* password = "password";  
const char* server = "api.thingspeak.com"; // ThingSpeak server address

WiFiClient client; // create a WiFiClient object to communicate with the internet
const int smPin = 34; // pin number for soil moisture sensor
const int dhtPin = 27; // pin number for DHT sensor
const int DHTType = DHT11; // Choose DHT11 or DHT22 based on sensor type, We are using DHT11
DHT dht(dhtPin, DHTType); // create a DHT object to read temperature and humidity

// variables for storing sensor values
int smValue; 
float temperature, humidity;

unsigned long lastConnectionTime = 0; // variable to store the time of the last data upload
const unsigned long postingInterval = 20L * 1000L; // interval between data uploads (in milliseconds)

void setup() {
  Serial.begin(115200); // start serial communication with the computer
  WiFi.begin(ssid, password); // connect to the WiFi network
  while (WiFi.status() != WL_CONNECTED) { // wait until the connection is established
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  ThingSpeak.begin(client); // initialize ThingSpeak library
  dht.begin(); // initialize DHT library
  delay(1000); // wait for the sensors to stabilize
}

void loop() {
  // Reading soil moisture value and sending data to ThingSpeak
  if (WiFi.status() == WL_CONNECTED) { // check if WiFi is connected
    if ((millis() - lastConnectionTime) > postingInterval) { // check if it's time to send data
      lastConnectionTime = millis(); // update last connection time
      pinMode(smPin, INPUT); // set the soil moisture pin as input
      smValue = analogRead(smPin); // read the soil moisture value
      // Reading temperature and humidity values
      temperature = dht.readTemperature(); // read the temperature value
      humidity = dht.readHumidity(); // read the humidity value
      Serial.print("Temperature = ");
      Serial.print(temperature);
      Serial.print(" *C ");
      Serial.print("\nHumidity = ");
      Serial.print(humidity);
      Serial.print(" % ");
      Serial.print("\nSoil Moisture reading = ");
      Serial.print(smValue);
      Serial.print("\n");
      // Sending values to ThingSpeak
      ThingSpeak.setField(1, smValue); // set the first field of the ThingSpeak channel to the soil moisture value
      ThingSpeak.setField(2, temperature); // set the second field of the ThingSpeak channel to the temperature value
      ThingSpeak.setField(3, humidity); // set the third field of the ThingSpeak channel to the humidity value
      
      int status = ThingSpeak.writeFields(2076000, "GQ67HW8X6OSY2Z6O"); // send the data to ThingSpeak
      if (status == 200) { // check if the data was sent successfully
        Serial.println("Data sent to ThingSpeak successfully.");
      } else {
        Serial.println("Failed to send data to ThingSpeak.");
      }
    }
  }
}
