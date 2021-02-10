[TOC]

# CCD3 Option Reference

ccd3 has **Four** kind of chart configuration.

[Common Configuration](#Common Configuration)

The `Common Configuration` is valid for each chart.

1. [name](#option.name)
2. [layout](#option.layout)
3. [title](#option.title)
4. [tooltip](#option.tooltip)
5. [axisBottom](#option.axisBottom)
6. [axisLeft](#option.axisLeft)

[Scale Configuration](#Scale Configuration)

In addition, `Scale Configuration`  are listed independently.For each scale, there are some additional configuration items.

1. [scaleBand](#scaleBand)
2. [scaleLinear](#scaleLinear)

[Independent Configuration](#Independent Configuration)

The `Independent Configuration` is valid for single chart.

1. [algorithmBar](#algorithmBar)

[Theme configuration](#Theme configuration)

The `Theme configuration` is valid for each chart.

1. [lightBlue](#lightBlue)

## Common Configuration

The `Common Configuration` is valid for each chart.

1. [name](#option.name)
2. [layout](#option.layout)
3. [title](#option.title)
4. [tooltip](#option.tooltip)
5. [axisBottom](#option.axisBottom)
6. [axisLeft](#option.axisLeft)

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
        },
        transition: {
            duration: 300,
            ease: d3.easeBackOut
        }
    }
}
```

**detail**

| name                | type     | sample value                   | description                                                  |
| ------------------- | -------- | ------------------------------ | ------------------------------------------------------------ |
| tooltip.format      | function | ()=>"tooltip"                  | Passing event object and clicking object‘s value, to format tooltip. |
| transition.duration | number   | custom number,like `1000`      | Animation duration time                                      |
| transition.ease     | d3's api | d3.ease\*,like `d3.easeLinear` | Animation ease effect                                        |

### option.axisBottom

**demo**

```js
const option = {
    axisBottom: {
        key: 'name',
        grid: false,
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
| key                 | string   | custom string,like `name`      | Corresponding to data.                                       |
| grid                | boolean  | `true` or `false`              | Turn on or off the axis grid.                                |
| scale.name          | string   | `scaleBand` ,`scaleLinear`     | Built in scales that match the properties of the corresponding data |
| transition.duration | number   | custom number,like `1000`      | Animation duration time                                      |
| transition.ease     | d3's api | d3.ease\*,like `d3.easeLinear` | Animation ease effect                                        |

**optional scale name**

1. scaleBand
2. scaleLinear

### option.axisLeft

**demo**

```js
const option = {
    axisLeft: {
        key: 'value',
        grid: false,
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
| key                 | string   | custom string,like `name`      | Corresponding to data.                                       |
| grid                | boolean  | `true` or `false`              | Turn on or off the axis grid.                                |
| scale.name          | string   | `scaleBand` ,`scaleLinear`     | Built in scales that match the properties of the corresponding data |
| transition.duration | number   | custom number,like `1000`      | Animation duration time                                      |
| transition.duration | d3's api | d3.ease\*,like `d3.easeLinear` | Animation ease effect                                        |

**optional scale name**

1. scaleBand
2. scaleLinear

## Scale Configuration

`Scale Configuration`  are listed independently.For each scale, there are some additional configuration items.

1. [scaleBand](#scaleBand)
2. [scaleLinear](#scaleLinear)

### scaleBand

When name is `scaleBand`,like this demo.

There are 3 optional options:

1. `round ` which default to false
2. `paddingInner ` which default to 0.5
3. `paddingOuter ` which default to 0.5

```js
const option = {
    axisBottom:{
        key: 'name',
        grid: true,
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

There are 3 optional options:

1. `extent ` which default to false
2. `reverse ` which default to false
3. `nice ` which default to true

```js
const option = {
    leftAxis: {
        key: 'value',
        grid: true,
        scale: {
            name: 'scaleLinear',
            extent: false,
            reverse: false,
            nice: true
        }
    }
}
```

## Independent Configuration

The `Independent Configuration` is valid for single chart.

### ccd3-algorithem

1. algorithmBar

2. algorithmTree


### ccd3-bar

1. horizontalBar

2. verticalBar


### ccd3-hierarchy

1. horizontalTree

2. verticalTree


## Theme Configuration

ccd3 maintains a global topic object internally.

The `Theme configuration` is valid for each chart.

1. [lightBlue](#lightBlue)

   ```js
   const lightBlue = {
     name: 'lightBlue',
     primary1: '#93b7e3',
     primary2: '#59c4e6',
     primary3: '#edafda',
     primary4: '#516b91',
     primary5: '#a5e7f0',
     primary6: '#cbb0e3',
     colorSets: ['#93b7e3', ' #59c4e6', '#edafda', ' #516b91', '#a5e7f0', ' #cbb0e3', ' #3fb1e3', ' #6be6c1', ' #626c91', '#a0a7e6', '#c4ebad', '#96dee8'],
     layout: {
       backgroundColor: '#fff',
       textColor: '#212121',
       labelColor: '#eee',
     },
     title: {
       textStyle: {
         x: '0',
         y: '0',
         color: '#516b91',
         fontSize: '1.5em',
         fontWeight: '700'
       },
       subTextStyle: {
         x: '0',
         y: '0',
         color: '#93b7e3',
         fontSize: '1em',
         fontWeight: '400'
       },
     },
     axisBottom: {
       tickColor: '#eee',
       lineColor: '#ccc',
       textColor: '#999',
     },
     axisLeft: {
       lineColor: '#ccc',
       textColor: '#999',
     },
     tooltip: {
       pointerEvents: 'none',
       textColor: '#212121',
       backgroundColor: '#ffffffcc',
       boxShadow: '0 3px 14px rgba(0,0,0,0.4)',
       border: ' 1px solid #eee',
       borderRadius: '5px',
       padding: '0.75rem 1rem',
       whiteSpace: 'no-warp',
       zIndex: '3080',
       position: 'absolute',
     }
   }
   ```

   

