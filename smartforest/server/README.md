# Mockup API of a Smart Home
 
[![License: MIT][license-image]][license]

[https://smart-home-api-2j4i.onrender.com/](https://smart-home-api-2j4i.onrender.com/)

The API wants to provide a mockup of a smart house.

The House can be modified in the home.js file modifying the structure or adding new appliances.

## API calls

The calls can be done using the following routers:
- Home Router
- Appliance Router
- Battery Router
- Photovoltaic panels Router
- Meteo Router

### Home Router

Empty

### Appliances Router

The API returns all the information about the appliances in the house
```shell
https://smart-home-api-2j4i.onrender.com/appliances
```

### Appliances Router

The API returns all the information about the appliance passed as parameter
```shell
https://smart-home-api-2j4i.onrender.com/appliances/name=:name
```

The API turns on the appliance passed as parameter
```shell
https://smart-home-api-2j4i.onrender.com/appliances/turnOn/name=:name
```

The API turns off the appliance passed as parameter
```shell
https://smart-home-api-2j4i.onrender.com/appliances/turnOff/name=:name
```

The API returns the appliance which is consuming the most at the moment of the call
```shell
https://smart-home-api-2j4i.onrender.com/appliances/mostConsuming
```



### Battery Router

The API returns the state of the batteries

```shell
https://smart-home-api-2j4i.onrender.com/batteries
```

The API returns a random increment or decrement of the capacity of the batteries
```shell
https://smart-home-api-2j4i.onrender.com/batteries/random
```
The API sets to zero the capacity of the batteries
```shell
https://smart-home-api-2j4i.onrender.com/batteries/reset
```

### Photovoltaic Panels Router

Empty


### Meteo Router

The API returns the meteo
```shell
https://smart-home-api-2j4i.onrender.com/meteo
```
The API simulate a change in the meteo using basic fuzzy logic
```shell
https://smart-home-api-2j4i.onrender.com/meteo/change
```
