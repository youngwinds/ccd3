[TOC]

# ccd3-algorithem

## algorithmBar

```js
const option = {
    name: 'algorithmBar',
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
        text: 'Algorithm Bar',
        subText: 'Bubble sort'
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

const data = [
    { name: 'apple', value: 150, state: 'start' },
    { name: 'banana', value: 200, state: 'start' },
    { name: 'orange', value: 120, state: 'start' },
    { name: 'mango', value: 100, state: 'start' },
    { name: 'pineapple', value: 210, state: 'start' },
    { name: 'watermelon', value: 160, state: 'start' },
    { name: 'pitaya', value: 331, state: 'start' },
    { name: 'strawberry', value: 105, state: 'start' }
];

export { option, data }
```

## algorithmTree

```js
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
        subText: 'Tree'
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
```

