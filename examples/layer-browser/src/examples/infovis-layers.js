import {COORDINATE_SYSTEM, PointCloudLayer} from 'deck.gl';
import PlotLayer from '../../../plot/plot-layer';
import dataSamples from '../immutable-data-samples';
// import {scaleLinear} from 'd3-scale';

const LIGHT_SETTINGS = {
  lightsPosition: [
    -122.45, 37.66, 8000,
    -122.0, 38.00, 8000
  ],
  ambientRatio: 0.3,
  diffuseRatio: 0.6,
  specularRatio: 0.4,
  lightsStrength: [1, 0.0, 0.8, 0.0],
  numberOfLights: 2
};

function getScale({min, max}) {
  return x => (x - min) / (max - min);
  // return scaleLinear().domain([min, max]).range([0, 1]);
}

// export default class DeckGLOverlay extends Component {
// const {viewport, resolution, showAxis, equation} = this.props;

const EQUATION = (x, y) => Math.sin(x * x + y * y) * x / Math.PI;

const PlotLayerInfovisExample = {
  layer: PlotLayer,
  props: {
    getPosition: (u, v) => {
      const x = (u - 1 / 2) * Math.PI * 2;
      const y = (v - 1 / 2) * Math.PI * 2;
      return [x, y, EQUATION(x, y)];
    },
    getColor: (x, y, z) => [40, z * 128 + 128, 160],
    getXScale: getScale,
    getYScale: getScale,
    getZScale: getScale,
    uCount: 200,
    vCount: 200,
    drawAxes: true,
    axesPadding: 0.25,
    axesColor: [0, 0, 0, 128],
    opacity: 1
    // pickable: true,
    // onHover: this.props.onHover,
    // updateTriggers: {
    //   getPosition: EQUATION
    // }
  }
};

// METER MODE EXAMPLES

const PointCloudLayerInfovisExample = {
  layer: PointCloudLayer,
  getData: dataSamples.getPointCloud,
  props: {
    id: 'pointCloudLayer',
    outline: true,
    coordinateSystem: COORDINATE_SYSTEM.IDENTITY,
    coordinateOrigin: dataSamples.positionOrigin,
    getPosition: d => d.position,
    getNormal: d => d.normal,
    getColor: d => d.color,
    opacity: 1,
    radiusPixels: 4,
    pickable: true,
    lightSettings: LIGHT_SETTINGS
  }
};

export default {
  'Infovis Layers': {
    PlotLayerInfovisExample,
    PointCloudLayerInfovisExample
  }
};
