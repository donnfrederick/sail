import Steps from 'components/molecules/CircleSteps'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

test('render <Steps />', () => {
  const currentStep = 1
  const totalStep = 4
  const tree = renderer.create(<Steps currentStep = {currentStep} stepCount = {totalStep} />).toJSON()
  expect(tree).toMatchSnapshot()
})

describe('test of data-current false value & true value', () => {
  let container:any = null;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test("data-current's false value is 3 & true value is 1", () => {
    const currentStep = 1
    const totalStep = 4
    act(() => {
      render(<Steps currentStep = {currentStep} stepCount = {totalStep}/>, container);
    });
    const false_step = document.querySelectorAll("[data-current=false]");
    const true_step = document.querySelectorAll("[data-current=true]");
    expect(false_step.length).toEqual(totalStep-1)
    expect(true_step.length).toEqual(totalStep-3)
  });
})
