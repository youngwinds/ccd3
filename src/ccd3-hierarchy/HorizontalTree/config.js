const option = {
  name: 'horizontalTree',
  horizontalTree: {
    uniqueKey: 'name',
    nodeKey: 'name',
    valueKey: 'value',
    childrenKey: 'children',
    node: {
      radiusExtent: [10, 10]
    },
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
      top: 25,
      right: 125,
      bottom: 25,
      left: 75
    },
    zoom: true,
  },
  title: {
    text: 'Horizontal Tree',
    subText: 'Hierarchie',
    transition: {
      duration: 1000,
      ease: d3.easeBounce
    }
  },
  tooltip: {
    transition: {
      duration: 300,
      ease: d3.easeBackOut
    }
  }
}

const data = {
  name: '算法',
  value: 1,
  children: [
    {
      name: '排序算法',
      value: 2,
      children: [
        { name: '冒泡排序', value: 3 },
        { name: '选择排序', value: 3 },
        { name: '插入排序', value: 3 },
        { name: '堆排序', value: 3 },
        { name: '快速排序', value: 3 },
        { name: '希尔排序', value: 3 },
        { name: '归并排序', value: 3 },
        { name: '桶排序', value: 3 },
      ]
    },
    {
      name: '链表',
      value: 2,
      children: [
        { name: '单链表', value: 2 },
        { name: '双向链表', value: 2 },
      ]
    },
    {
      name: '图',
      value: 2,
      children: [
        { name: 'DFS', value: 3 },
        { name: 'BFS', value: 3 },
        { name: '最短路径', value: 3 },
      ]
    },
    {
      name: '树',
      value: 2,
      children: [
        { name: '先序遍历', value: 3 },
        { name: '后序遍历', value: 3 },
        { name: '中序遍历', value: 3 },
      ]
    }
  ]
}

export { option, data }