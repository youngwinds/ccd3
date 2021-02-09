const option = {
  name: 'horizontalBar',
  horizontalBar: {
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
      left: 100
    },
    zoom: false,
  },
  title: {
    text: 'Bar',
    subText: 'horizontal'
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
  },
  axisLeft: {
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
  }
}

export { option }