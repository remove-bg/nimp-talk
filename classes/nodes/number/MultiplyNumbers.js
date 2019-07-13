import NodeNumber from '../NodeNumber.js';
import MultiplyNumbersProperties from './MultiplyNumbersProperties.jsx';
import MultiplyNumbersInputNumberA from './MultiplyNumbersInputNumberA.js';
import MultiplyNumbersInputNumberB from './MultiplyNumbersInputNumberB.js';
import OutputNumber from '../OutputNumber.js';

export default class MultiplyNumbers extends NodeNumber {
  constructor(className, graph, x, y) {
    super(className, graph, x, y, 'Multiply', MultiplyNumbersProperties);

    this.inputs = [
      new MultiplyNumbersInputNumberA(this, 0, 'a'),
      new MultiplyNumbersInputNumberB(this, 1, 'b'),
    ];
    this.outputs = [
      new OutputNumber(this, 0, 'Result')
    ];

    this.a = null;
    this.b = null;
  }


  toJson() {
    let json = super.toJson();

    json.a = this.a;
    json.b = this.b;

    return json;
  }


  run(inputThatTriggered) {
    if (this.inputs[0].number == null) {
      this.a = null;
    } else {
      this.a = this.inputs[0].number;
    }

    if (this.inputs[1].number == null) {
      this.b = null;
    } else {
      this.b = this.inputs[1].number;
    }

    if (this.a != null && this.b != null && !isNaN(this.a) && !isNaN(this.b)) {
      this.bg.classList.add('running');
      this.runTimer = Date.now();
      this.number = this.a * this.b;
      super.run(inputThatTriggered);
    } else {
      this.runTimer = Date.now();
      this.number = null;
      super.run(inputThatTriggered);
    }
  }
}
