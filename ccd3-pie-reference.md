[TOC]

# ccd3-pie

## pie

```js
const option = {
  name: 'pie',
  pie: {
    uniqueKey: 'name',
    categoryKey: 'name',
    valueKey: 'value',
    innerRadius: 100,
    on: {
      click: (event, value, data) => { console.log(event, value, data) }
    },
    animation: {
      duration: 2000,
      ease: d3.easeBack
    }
  },
  layout: {
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    zoom: false,
  },
  title: {
    text: 'Pie',
    subText: 'Pie',
    transition: {
      duration: 300,
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
  }
}

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

export { option, data }
```

