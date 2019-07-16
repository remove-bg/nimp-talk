import NodeNumber from '../NodeNumber.js';
import FloorProperties from './FloorProperties.jsx';
import FloorInputNumberA from './FloorInputNumberA.js';
import OutputNumber from '../OutputNumber.js';

export default class Floor extends NodeNumber {
  constructor(className, graph, x, y, settings) {
    super(className, graph, x, y, 'Floor', FloorProperties);

    this.inputs = [
      new FloorInputNumberA(this, 0, 'a'),
    ];
    this.outputs = [
      new OutputNumber(this, 0, 'Result')
    ];

    this.a = typeof settings.a !== 'undefined' ? settings.a : null;
  }


  toJson() {
    let json = super.toJson();

    json.settings.a = this.a;

    return json;
  }


  run(inputThatTriggered) {
    if (this.inputs[0].number == null) {
      this.a = null;
    } else {
      this.a = this.inputs[0].number;
    }

    if (this.a != null && !isNaN(this.a)) {
      this.bg.classList.add('running');
      this.runTimer = Date.now();
      this.number = Math.floor(this.a);
      super.run(inputThatTriggered);
    } else {
      this.runTimer = Date.now();
      this.number = null;
      super.run(inputThatTriggered);
    }
  }
}