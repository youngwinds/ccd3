const option = {
  name: 'algorithmTree',
  algorithmTree: {
    uniqueKey: 'name',
    nodeKey: 'name',
    valueKey: 'value',
    childrenKey: 'children',
    stateKey: 'state',
    state: {
      start: '#93b7e3',
      end: '#edafda'
    },
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
      top: 75,
      right: 25,
      bottom: 75,
      left: 25
    },
    zoom: true,
  },
  title: {
    text: 'Algorithm Tree',
    subText: 'Tree',
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
  state: 'start',
  children: [
    {
      name: '排序算法',
      value: 2,
      state: 'start',
      children: [
        { name: '冒泡排序', state: 'start', value: 3 },
        { name: '选择排序', state: 'start', value: 3 },
        { name: '插入排序', state: 'start', value: 3 },
        { name: '堆排序', state: 'start', value: 3 },
        { name: '快速排序', state: 'start', value: 3 },
        { name: '希尔排序', state: 'start', value: 3 },
        { name: '归并排序', state: 'start', value: 3 },
        { name: '桶排序', state: 'start', value: 3 },
      ]
    },
    {
      name: '链表',
      value: 2,
      state: 'start',
      children: [
        { name: '单链表', state: 'start', value: 2 },
        { name: '双向链表', state: 'start', value: 2 },
      ]
    },
    {
      name: '图',
      value: 2,
      state: 'start',
      children: [
        { name: 'DFS', state: 'start', value: 3 },
        { name: 'BFS', state: 'start', value: 3 },
        { name: '最短路径', state: 'start', value: 3 },
      ]
    },
    {
      name: '树',
      value: 2,
      state: 'start',
      children: [
        { name: '先序遍历', state: 'start', value: 3 },
        { name: '中序遍历', state: 'start', value: 3 },
        { name: '后序遍历', state: 'start', value: 3 },
      ]
    }
  ]
}
export { option, data }