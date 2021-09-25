const option = {
  name: 'Radar',
  layout: {
    margin: {
      top: 50,
      right: 35,
      bottom: 50,
      left: 0
    },
    // zoom: true
  },
  title: {
    text: '雷达图',
  },
  radar: {
    categoryKey: "index",
    valueKey: ['accuracy', 'loss', 'val_accuracy', 'val_loss'],
    radius: 130,
    maxValue: 1.0,
    level: 5, // 需要将网轴分成几级，即网轴上从小到大有多少个正多边形
    rangeMin: 0,// 网轴的范围，类似坐标轴
    rangeMax: 1,
  },
  style: {
    textColor: 'black',
    axisTextColor: '#737373',
    colorSets: ['#93b7e3', '#516b91', '#59c4e6', '#edafda', '#a5e7f0', '#cbb0e3'],
    axisStrokeColor: 'gray',
    pointsColor: 'white',
    pointsSize: 3
  },
  title: {
    text: 'Radar',
    subText: 'Radar',
    transition: {
      duration: 300,
      ease: d3.easeBackOut
    }
  },
}
const data = [
  {
    "index": "0",
    "accuracy": "0.6769230961799622",
    "loss": "1.0545114278793335",
    "val_accuracy": "0.954954981803894",
    "val_loss": "0.2948176860809326"
  },
  {
    "index": "1",
    "accuracy": "0.7076923251152039",
    "loss": "0.4692104458808899",
    "val_accuracy": "0.954954981803894",
    "val_loss": "0.2865949869155884"
  },
  {
    "index": "2",
    "accuracy": "0.7076923251152039",
    "loss": "0.45262420177459717",
    "val_accuracy": "0.954954981803894",
    "val_loss": "0.2819310426712036"
  },
  {
    "index": "3",
    "accuracy": "0.7076923251152039",
    "loss": "0.44769638776779175",
    "val_accuracy": "0.954954981803894",
    "val_loss": "0.2938033938407898"
  },
  {
    "index": "4",
    "accuracy": "0.7076923251152039",
    "loss": "0.446171373128891",
    "val_accuracy": "0.954954981803894",
    "val_loss": "0.2871929109096527"
  },
  {
    "index": "5",
    "accuracy": "0.7076923251152039",
    "loss": "0.4420175552368164",
    "val_accuracy": "0.954954981803894",
    "val_loss": "0.2794401943683624"
  },
]
export { option, data };