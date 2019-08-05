//    { name: '', depth: -1, distances: { base: -1, north: -1, west: -1, south: -1, east: -1 } },
var marks = [
    { name: 'Shrooms Copper 3x', depth: 180, distances: { base: 900, north: 1268, west: -1, south: -1, east: 243 } },
    { name: 'Alien cave', depth: 220, distances: { base: 762, north: 935, west: 516, south: 1496, east: -1 } },
    { name: 'Gold', depth: 155, distances: { base: 604, north: 487, west: -1, south: -1, east: 1056 } },
    { name: 'Alien building', depth: 160, distances: { base: 1400, north: 727, west: -1, south: -1, east: 1360 } },
    { name: 'Glow Shrooms Magnetite Gold', depth: 220, distances: { base: 455, north: -1, west: 879, south: 739, east: -1 } },
    { name: 'Floating Balls', depth: 200, distances: { base: 880, north: -1, west: 1200, south: 300, east: -1 } },
    { name: 'Mountain Island', depth: 0, distances: { base: 1100, north: 624, west: -1, south: -1, east: 1066 } },
    { name: 'Amphitheater Cave Salt Quartz', depth: 100, distances: { base: 1162, north: 2137, west: -1, south: -1, east: 1294} },
    { name: 'Lifepod 2', depth: 500, distances: { base: 1300, north: -1, west: -1, south: 2300, east: 1300 } },
    { name: 'Red Forest', depth: 100, distances: { base: 450, north: -1, west: 950, south: 1445, east: -1 } },
    { name: 'Quartz', depth: 300, distances: { base: 994, north: 1947, west: 1242, south: -1, east: -1 } },
    { name: 'Floating Balls Cave', depth: 200, distances: { base: 1229, north: 2177, west: 1300, south: -1, east: -1 } },
    { name: 'Big Wreck', depth: 90, distances: { base: -1, north: 797, west: 1489, south: 1437, east: -1 } },
    { name: 'Shroom Forest', depth: 160, distances: { base: 753, north: 710, west: -1, south: -1, east: 1628 } },
    { name: 'LSD Forest', depth: 230, distances: { base: 1115, north: -1, west: 995, south: 2013, east: -1 } },
    { name: 'Lead', depth: 240, distances: { base: 1332, north: -1, west: 1154, south: -1, east: 2054 } },
    { name: 'Big drop', depth: 529, distances: { base: 1700, north: -1, west: 1395, south: 2592, east: -1 } },
    { name: 'Gold', depth: 160, distances: { base: 1065, north: -1, west: -1, south: 1991, east: 1794 } },
    { name: 'Two big geysers', depth: 500, distances: { base: 1047, north: -1, west: 1546, south: 1970, east: -1 } },
    { name: 'Wreck', depth: 21, distances: { base: 576, north: -1, west: -1, south: 878, east: 554 } },
    { name: 'Aurora', depth: 3, distances: { base: 717, north: -1, west: 1639, south: 814, east: -1 } },
    { name: 'LSD Forest drop', depth: 448, distances: { base: 1337, north: 1868, west: -1, south: -1, east: 2270 } },
    { name: 'Copper 2x', depth: 614, distances: { base: 1467, north: 1954, west: -1, south: -1, east: 2381 } },
    { name: 'Ruby Lithium Carving', depth: 330, distances: { base: 1371, north: 1652, west: -1, south: -1, east: 2354 } },
    { name: 'Wreck', depth: 217, distances: { base: 1096, north: 1499, west: -1, south: -1, east: 2084 } },
    { name: 'Ruby Lithium Carving', depth: 341, distances: { base: 1361, north: 1514, west: -1, south: -1, east: 2336 } },
]

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
}
// thanks to jupdike https://gist.github.com/jupdike/bfe5eb23d1c395d8a0a1a4ddd94882ac
// based on the math here:
// http://math.stackexchange.com/a/1367732

// x1,y1 is the center of the first circle, with radius r1
// x2,y2 is the center of the second ricle, with radius r2
function intersectTwoCircles(x1,y1,r1, x2,y2,r2) {
  var centerdx = x1 - x2;
  var centerdy = y1 - y2;
  var R = Math.sqrt(centerdx * centerdx + centerdy * centerdy);
  if (!(Math.abs(r1 - r2) <= R && R <= r1 + r2)) { // no intersection
    return []; // empty list of results
  }
  // intersection(s) should exist

  var R2 = R*R;
  var R4 = R2*R2;
  var a = (r1*r1 - r2*r2) / (2 * R2);
  var r2r2 = (r1*r1 - r2*r2);
  var c = Math.sqrt(2 * (r1*r1 + r2*r2) / R2 - (r2r2 * r2r2) / R4 - 1);

  var fx = (x1+x2) / 2 + a * (x2 - x1);
  var gx = c * (y2 - y1) / 2;
  var ix1 = fx + gx;
  var ix2 = fx - gx;

  var fy = (y1+y2) / 2 + a * (y2 - y1);
  var gy = c * (x1 - x2) / 2;
  var iy1 = fy + gy;
  var iy2 = fy - gy;

  // note if gy == 0 and gx == 0 then the circles are tangent and there is only one solution
  // but that one solution will just be duplicated as the code is currently written
  return [{x: ix1, y: iy1}, {x: ix2, y: iy2}];
}


var beacons = [
  { name: 'Base', coordinates: { x: 0, y: 0 } },
  { name: '1000N', coordinates: { x: 0, y: 1000 } },
  { name: '1000W', coordinates: { x: -1000, y: 0 } },
  { name: '1000S', coordinates: { x: 0, y: -1000 } },
  { name: '1000E', coordinates: { x: 1000, y: 0 } }
]

function getValidBeacons (distances) {
  let b = []
  let i
  for (var key in distances) {
    if (distances.hasOwnProperty(key)) {
      if (distances[key] !== -1) {
        switch (key) {
          case 'base': i = 0
          break
          case 'north': i = 1
          break
          case 'west': i = 2
          break
          case 'south': i = 3
          break
          case 'east': i = 4
          break
        }
        b.push({
          x: beacons[i].coordinates.x,
          y: beacons[i].coordinates.y,
          r: distances[key]
        })
      }
    }
  }
  return b
}

function computeCoords (distances) {
  var b = getValidBeacons(distances)
  let a = intersectTwoCircles(b[0].x, b[0].y, b[0].r, b[1].x, b[1].y, b[1].r)

  // compute difference in measured and computed distance to third beacon
  let dist = []
  for (let i = 0; i < 2; i++) {
    dist.push(Math.abs(distance(a[i].x, a[i].y, b[2].x, b[2].y) - b[2].r))
  }
  let i = 0
  if (dist[0] > dist[1]) {
    i = 1
  }
  return {
    x: a[i].x,
    y: a[i].y
  }
}

  // { name: '', icon: '' },
var icons = [
  { name: 'Copper', icon: 'https://vignette.wikia.nocookie.net/subnautica/images/7/78/Copper_Ore.png' },
  { name: 'Base', icon: 'https://vignette.wikia.nocookie.net/subnautica/images/f/fd/Lifepod_5_Ping.png' },
  { name: '1000', icon: 'https://vignette.wikia.nocookie.net/subnautica/images/a/ab/Beacon_Ping.png' },
  { name: 'Gold', icon: 'https://vignette.wikia.nocookie.net/subnautica/images/1/10/Gold.png' },
  { name: 'Silver', icon: 'https://vignette.wikia.nocookie.net/subnautica/images/1/1f/Silbererz.png' },
  { name: 'Titanium', icon: 'https://vignette.wikia.nocookie.net/subnautica/images/8/88/Titan.png' },
  { name: 'Alien', icon: 'https://vignette.wikia.nocookie.net/subnautica/images/6/67/Pecursor_Symbol_05.png' },
  { name: 'Island', icon: 'http://www.pngall.com/wp-content/uploads/2016/06/Island-Free-PNG-Image.png' },
  { name: 'Floating', icon: 'https://vignette.wikia.nocookie.net/subnautica/images/0/0e/Floating_Stones_Flora.png' },
  { name: 'Lifepod', icon: 'https://steamuserimages-a.akamaihd.net/ugc/955223229305689817/18447AEB99BBA1A75B86C20E620B4589BE618BCD/?imw=128&imh=128&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true' },
  { name: 'Rubin', icon: 'https://vignette.wikia.nocookie.net/subnautica/images/b/b8/Aluminum_Oxide_Crystal.png' },
  { name: 'Salt', icon: 'https://vignette.wikia.nocookie.net/subnautica/images/4/4c/Salt_Deposit.png' },
  { name: 'Quartz', icon: 'https://vignette.wikia.nocookie.net/subnautica/images/c/cf/Quartz.png' },
  { name: 'Red', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLTJmwpEAmcVpQwAATN51ICzZYA9tUWK-_QGT9NdOL2LD6Gpca' },
  { name: 'Wreck', icon: 'https://vision.princeton.edu/projects/2010/SUN/explore/SUN_128x128/u/underwater/wreck/sun_blpkmixfmsotarcm.jpg' },
  { name: 'Ruby', icon: 'https://vignette.wikia.nocookie.net/subnautica/images/b/b8/Aluminum_Oxide_Crystal.png' },
  { name: 'Lead', icon: 'https://vignette.wikia.nocookie.net/subnautica/images/e/e8/Lead.png' },
  { name: 'Lithium', icon: 'https://vignette.wikia.nocookie.net/subnautica/images/c/cf/Lithium.png' },
]


function getIcon (name) {
  for (let i = 0; i < icons.length; i++) {
    if (name.indexOf(icons[i].name) !== -1) {
      return icons[i].icon
    }
  }
  return ''
}

// get icons for beacons
var beacons = beacons.map(el => {
  return {
    name: el.name,
    icon: getIcon(el.name),
    coordinates: el.coordinates
  }
})

// compute coordinates for marks
marks = marks.map(el => {
  return {
    name: el.name,
    depth: el.depth,
    icon: getIcon(el.name),
    coordinates: computeCoords(el.distances)
  }
})

var landmark = Vue.component('landmark', {
  props: ['data', 'window-size'],
  template: '<div :style="getStyle(data.coordinates)"><div v-if="data.icon" :aria-label="getLabel" data-balloon-blunt data-balloon-pos="up"><img :src="data.icon" class="icon" /></div><span v-else>{{ data.name }}</span></div>',
  computed: {
    getLabel () {
        return this.data.depth ? this.data.name + ' (' + this.data.depth + 'm)' : this.data.name
    }
  },
  methods: {
    getStyle (coords) {
      return {
        position: 'absolute',
        top: this.windowSize/2 - coords.y*(this.windowSize/3500) - 24,
        left: this.windowSize/2 + coords.x*(this.windowSize/3500) -24
      }
    },
  }
})

var app = new Vue({
    el: '#app',
    data: {
      marks,
      beacons,
      windowSize: 0
    },
    components: {
      'landmark': landmark
    },
    created() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize();
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize() {
        this.windowSize = Math.min(window.innerWidth, window.innerHeight) - 32
      }
    }
});

