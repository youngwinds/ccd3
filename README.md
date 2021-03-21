[TOC]

# ccd3

## Introduction

A data visualization chart library for dynamic interaction.

ccd3 does not pay attention to the combination of each part of the chart, but pays more attention to the state change of the chart.

Because it's state driven, diagrams are easy to use and interact with.

But the configurability is weak. 

> If charts don't meet your needs, you can use othe chart libraries. Of course, you can use d3.js for all kinds of customization like me, but it takes a lot of effort.

## DownLoad

### Use npm:

```
npm install ccd3
```

### Download the compiled resources:

[ccd3.js](./dist/ccd3.js) 

[ccd3.min.js](./dist/ccd3.min.js)



## Docs

### config reference

Detailed description of each option item

[ccd3-config-reference](./ccd3-config-reference.md)

### All the option and data structure

[ccd3-bar-reference](./ccd3-config-bar.md)

[ccd3-pie-reference](./ccd3-pie-reference.md)

[ccd3-hierarchy-reference](./ccd3-hierarchy-reference.md)

[ccd3-network-reference](./ccd3-network-reference.md)

[ccd3-algorithem-reference](./ccd3-algorithem-reference.md)

## Getting Start

### Prepare the Dom

step1: Set a div with width and height.

```html
<body>
    <div id="dom" style="width: 970px;height: 600px;"></div>
</body>
```

step2: Beacase ccd3 is based on d3.js. So you should do this: 

```html
<body>
    <div id="dom" style="width: 970px;height: 600px;"></div>
    <script src="../../node_modules/d3/dist/d3.js"></script>
    <script src="../../dist/ccd3.js"></script>
</body>
```

Then you got two global object : 

- `d3` 
- `ccd3`

### Initialization chart

ccd3 has a `init` method.

**ccd3.init(id,option,[theme])**

- `id`: dom's id
- `option`: Each option is used to describe the various parts of the diagram
- `theme`: An global color scheme

You can call it, and then it will return an array.The first element is the chart, and the second is the method which can change the state of the chart.

```html
<body>
    <div id="dom" style="width: 970px;height: 600px;"></div>
    <script src="../../node_modules/d3/dist/d3.js"></script>
    <script src="../../dist/ccd3.js"></script>

    <script>
        const option = {}
        const theme = {}
        const [bar, setBar] = ccd3.init('dom', option, theme);
    </script>
</body>
```

### Config

Each chart is made up of `option`, `theme`and `data`.

- `option`: Each option is used to describe the various parts of the diagram.

- `theme`: An global color scheme.
- `data`: A data structure for each chart.

[Detail config reference](./ccd3-config-reference)

#### set option

1. The configuration item must be complete and cannot be defaulted.
2. Configuration items are completely semantic based. You can easily understand them.
3. The `name ` property is used to identify the chart. So each chart has a unique `name`.

```js
const option = {
    name: 'verticalBar',
    verticalBar: {
        uniqueKey: 'name',
        on: {
            click: (event, value, data) => { console.log(event, value, data) }
        },
        animation: {
            duration: 1000,
            ease: d3.easeBounce
        }
    },
    layout: {
        margin: {
            top: 75,
            right: 50,
            bottom: 50,
            left: 50
        },
        zoom: false,
    },
    title: {
        text: 'Bar',
        subText: 'vertical',
        transition: {
            duration: 2000,
            ease: d3.easeBackOut
        }
    },
    tooltip: {
        format: (event, data) => {
            let str = "";
            for (let key in data) {
                str += `${key} : ${data[key]} <br/>`;
            }
            return str;
        },
        transition: {
            duration: 300,
            ease: d3.easeBackOut
        }
    },
    axisBottom: {
        key: 'name',
        grid: true,
        scale: {
            name: 'scaleBand',
            reverse: false,
            paddingInner: 0.5,
            paddingOuter: 0.5,
        },
        transition: {
            duration: 1000,
            ease: d3.easeBounce
        }
    },
    axisLeft: {
        key: 'value',
        grid: true,
        scale: {
            name: 'scaleLinear',
            extent: false,
            reverse: false,
            nice: true,
        },
        transition: {
            duration: 1000,
            ease: d3.easeBounce
        }
    }
}
```

#### set theme

1. An global color scheme for all charts

```js
const theme = {
    name: 'default',
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

#### set data

1. A chart has a data structure, which is not universal.

```js
const data = [
    { name: 'apple', value: 150 },
    { name: 'banana', value: 200 },
    { name: 'orange', value: 120 },
    { name: 'mango', value: 100 },
    { name: 'pineapple', value: 210 },
    { name: 'watermelon', value: 160 },
    { name: 'pitaya', value: 331 },
    { name: 'strawberry', value: 105 }
];
```

## Render chart

When you prepared the `option` and `theme`,you can init the chart, and get **a chart object** and **a method to set chart's state**. 

After you prepared the `data`,you can render the chart, by `setState`. 

Like this :

```js
//init chart
const [bar, setBar] = ccd3.init('dom', option, theme);
//initial data
const data = [
    { name: 'apple', value: 150 },
    { name: 'banana', value: 200 },
    { name: 'orange', value: 120 },
    { name: 'mango', value: 100 },
    { name: 'pineapple', value: 210 },
    { name: 'watermelon', value: 160 },
    { name: 'pitaya', value: 331 },
    { name: 'strawberry', value: 105 }
];
// set state
setBar(data);

// Asynchronous operation
setTimeout(() => {
    // change the state
    data.sort((a, b) => a.value - b.value);
    // change the theme
    theme.title.textStyle.x = "100";
    // set the state again
    bar.render(data,theme);
}, 1500)
```

## All codes

```html
<body>
    <div id="dom" style="width: 970px;height: 600px;"></div>
    <script src="../../node_modules/d3/dist/d3.js"></script>
    <script src="../../dist/ccd3.js"></script>

    <script>
        const option = {
            name: 'verticalBar',
            verticalBar: {
                uniqueKey: 'name',
                on: {
                    click: (event, value, data) => { console.log(event, value, data) }
                },
                animation: {
                    duration: 1000,
                    ease: d3.easeBounce
                }
            },
            layout: {
                margin: {
                    top: 75,
                    right: 50,
                    bottom: 50,
                    left: 50
                },
                zoom: false,
            },
            title: {
                text: 'Bar',
                subText: 'vertical',
                transition: {
                    duration: 2000,
                    ease: d3.easeBackOut
                }
            },
            tooltip: {
                format: (event, data) => {
                    let str = "";
                    for (let key in data) {
                        str += `${key} : ${data[key]} <br/>`;
                    }
                    return str;
                },
                transition: {
                    duration: 300,
                    ease: d3.easeBackOut
                }
            },
            axisBottom: {
                key: 'name',
                grid: true,
                scale: {
                    name: 'scaleBand',
                    reverse: false,
                    paddingInner: 0.5,
                    paddingOuter: 0.5,
                },
                transition: {
                    duration: 1000,
                    ease: d3.easeBounce
                }
            },
            axisLeft: {
                key: 'value',
                grid: true,
                scale: {
                    name: 'scaleLinear',
                    extent: false,
                    reverse: false,
                    nice: true,
                },
                transition: {
                    duration: 1000,
                    ease: d3.easeBounce
                }
            }
        }

        const theme = {
            name: 'default',
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

        const [bar, setBar] = ccd3.init('dom', option, theme);

        const data = [
            { name: 'apple', value: 150 },
            { name: 'banana', value: 200 },
            { name: 'orange', value: 120 },
            { name: 'mango', value: 100 },
            { name: 'pineapple', value: 210 },
            { name: 'watermelon', value: 160 },
            { name: 'pitaya', value: 331 },
            { name: 'strawberry', value: 105 }
        ];

        setBar(data);

        setTimeout(() => {
            data.sort((a, b) => a.value - b.value);
            theme.title.textStyle.x = "100"
            bar.render()
        }, 1500)

    </script>
</body>
```

