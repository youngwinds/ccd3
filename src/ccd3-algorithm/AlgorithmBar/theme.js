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

export { theme }