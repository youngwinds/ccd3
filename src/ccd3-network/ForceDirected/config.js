const option = {
  name: 'forceDirected',
  forceSimulation: {
    forceCollide: {
      radius: 1,
      strength: 1
    },
    forceLink: {
      distance: 30
    },
    forceManyBody: {
      strength: -30,
      theta: 0.9,
      distanceMin: 10
    },
    forceX: {
      strength: 0,
      x: 0,
    },
    forceY: {
      strength: 0,
      y: 0,
    }
  },
  nodes: {
    key: 'nodes',
    nameKey: 'id',
    sizeKey: 'size',
    groupKey: 'group',
    nodeSizeExtent: [5, 15],
    nodeOpacityExtent: [.5, 1],
    on: {
      click: (event, d) => {
        console.log(event, d);
      },
      mouseover: (event, d) => {
        console.log(event, d);
      },
      mouseout: (event, d) => {
        console.log(event, d);
      },
    },
  },
  links: {
    key: 'links',
    sourceKey: 'source',
    targetKey: 'target',
    valueKey: 'value',
    lineWidthExtent: [1, 5],
    lineOpacityExtent: [0.2, 0.5]
  },
  tooltip: {
    format: (e, d) => {
      let keys = ['id', 'size', 'group'];
      return keys.map(k => `${k} : ${d[k]}`).join('<br/>');
    },
    transition: {
      duration: 300,
      ease: d3.easeBackOut
    }
  },
  title: {
    text: '力导向图标题',
    subText: '力导向图副标题',
    info: '力导向图提示',
    transition: {
      duration: 300,
      ease: d3.easeBackOut
    }
  },
  layout: {
    margin: {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    },
    zoom: true
  }
}

const data = {
  nodes: [
    {
      id: 'A',
      size: 100,
      group: 1,
    },
    {
      id: 'B',
      size: 80,
      group: 2,
    },
    {
      id: 'C',
      size: 50,
      group: 1,
    }
  ],
  links: [
    {
      source: "B",
      target: "A",
      value: 3
    },
    {
      source: "B",
      target: "C",
      value: 3
    },
  ]
}

export { option, data }