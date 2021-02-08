[TOC]

# CCD3 Option Reference

## Common Configuration

### option.name

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

### option.layout

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

### option.title

**demo**

```js
const option = {
    title: {
        text: 'Main Title',
        subText: 'Sub title'
    }
}
```

**detail**

| name          | type   | sample value | description |
| ------------- | ------ | ------------ | ----------- |
| title.text    | string | `main Title` | main title  |
| title.subText | string | `sub title`  | sub title   |

### option.tooltip

**demo**

```js
const option = {
    tooltip: {
        format: (event,data) => {
            let str = "";
            for (let key in data) {
                str += `${key} : ${data[key]} <br/>`
            }
            return str;
        }
    }
}
```

**detail**

| name           | type     | sample value  | description                                                  |
| -------------- | -------- | ------------- | ------------------------------------------------------------ |
| tooltip.format | function | ()=>"tooltip" | Passing event object and clicking object‘s value, to format tooltip. |

### option.axisBottom

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

### option.axisLeft

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

## scale configuration

For each scale, there are some additional configuration items.

### scaleBand

When name is `scaleBand`,like this demo.

There are three optional options:

1. `round ` which default to false
2. `paddingInner ` which default to 0.5
3. `paddingOuter ` which default to 0.5

```js
const option = {
    axisBottom:{
        key: 'name',
        scale: {
            name: 'scaleBand',
            reverse: false,
            paddingInner: 0.5,
            paddingOuter: 0.5,
        }
    }
}
```

### scaleLinear

When name is `scaleLinear`,like this demo.

There are three optional options:

1. `extent ` which default to false
2. `reverse ` which default to false
3. `nice ` which default to true

```js
const option = {
    leftAxis: {
        key: 'value',
        scale: {
            name: 'scaleLinear',
            extent: false,
            reverse: false,
            nice: true,
        }
    }
}
```

## Independent configuration

### algorithmBar

**demo**

```js
const option = {
    algorithmBar: {
        uniqueKey: 'name',
        stateKey: 'state',
        state: {
            active: '#c4ebad',
            start: '#93b7e3',
            exchange: '#edafda',
            end: '#6be6c1',
        },
        on: {
            click: (event, value, data) => { console.log(event, value, data) }
        },
        animation: {
            duration: 1000,
            ease: d3.easeLinear
        }
    },
}
```

