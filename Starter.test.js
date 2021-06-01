import React from 'react';
import renderer from 'react-test-renderer';
import CustomCard from './components/CustomCard';
import TravelSpots from './data/TravelSpots';

test("CustomCard will render", () => {
  const json = renderer.create(
    <CustomCard travelSpot={TravelSpots[0]} />
  ).toJSON();
  expect(json.props.style.marginTop).toBe(20);
  expect(json.props.style.width).toBe('95%');
});

test("CustomCard will contain custom information", () => {
  const customSpot = {
    id: "0",
		title: "Random title",
		country: "Somewhere",
		keyword: "Word",
		collection: "3446667",
		tags: ["A", "B", "C"],
    description: "Some description",
  }
  const json = renderer.create(
    <CustomCard travelSpot={customSpot} />
  ).toJSON();
  expect(json.children.includes("Random title"));
  expect(json.children.includes("Somewhere"));
  expect(json.children.includes("Some description"));
});

// Snapshot tests
test("CustomCard renders correctly when it is not editable", () => {
  const json = renderer.create(
    <CustomCard travelSpot={TravelSpots[0]} />
  ).toJSON();
  expect(json).toMatchSnapshot();
});

test("CustomCard renders correctly when it is editable", () => {
  const customSpot = {
    id: "0",
		title: "Random title",
		country: "Somewhere",
		keyword: "Word",
		collection: "3446667",
		tags: ["A", "B", "C"],
    description: "Some description",
    custom: true
  }
  const json = renderer.create(
    <CustomCard travelSpot={customSpot} />
  ).toJSON();
  expect(json).toMatchSnapshot();
});

