# CCD3 Option Reference

## option.name

**demo**

```js
const option = {
    name:'chartName'
}
```

**detail**

| name | type   | sample value   | description                   |
| ---- | ------ | -------------- | ----------------------------- |
| name | string | `algorithmBar` | Each chart has a unique name. |

**optional chart name**

1. algorithmBar
2. algorithmTree
3. basicBar

## option.layout

**demo**

```js
const option = {
    layout:{
        margin:{
            top:100,
            right:100,
            bottom:100,
            left:100
        },
        zoom:true
    }
}
```

**detail**

| name          | type    | sample value                          | description                                                  |
| ------------- | ------- | ------------------------------------- | ------------------------------------------------------------ |
| layout.margin | object  | `{top:10,right:10,bottom:10,left:10}` | The distance between the main chart view and the border of the dom container. |
| layout.zoom   | boolean | `true`                                | Turn on（off） the zoom function of the whole chart.         |

## option.axisBottom

**demo**

```js
const option = {
    axisBottom: {
        key: 'name',
        scale: {
            name: 'scaleBand'
        },
        transition: {
            duration: 300,
            ease: d3.easeLinear
        }
    }
}
```

**detail**

| name                | type     | sample value                   | description                                                  |
| ------------------- | -------- | ------------------------------ | ------------------------------------------------------------ |
| key                 | string   | custom string,like `name`      | corresponding to data.                                       |
| scale.name          | string   | `scaleBand` ,`scaleLinear`     | Built in scales that match the properties of the corresponding data |
| transition.duration | number   | custom number,like `1000`      | Animation duration time                                      |
| transition.duration | d3's api | d3.ease\*,like `d3.easeLinear` | Animation ease effect                                        |

**optional scale name**

1. scaleBand
2. scaleLinear

## option.axisLeft

**demo**

```js
const option = {
    axisLeft: {
        key: 'value',
        scale: {
            name: 'scaleLinear'
        },
        transition: {
            duration: 300,
            ease: d3.easeLinear
        }
    }
}
```

**detail**

| name                | type     | sample value                   | description                                                  |
| ------------------- | -------- | ------------------------------ | ------------------------------------------------------------ |
| key                 | string   | custom string,like `name`      | corresponding to data.                                       |
| scale.name          | string   | `scaleBand` ,`scaleLinear`     | Built in scales that match the properties of the corresponding data |
| transition.duration | number   | custom number,like `1000`      | Animation duration time                                      |
| transition.duration | d3's api | d3.ease\*,like `d3.easeLinear` | Animation ease effect                                        |

**optional scale name**

1. scaleBand
2. scaleLinear