import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "./TodoList";

test("renders the TodoList component", () => {
  render(<TodoList />);
  expect(screen.getByText("Todo List")).toBeInTheDocument();
});

test("adds a new todo when submitted", () => {
  render(<TodoList />);

  const input = screen.getByPlaceholderText("Add a new todo"); // Make sure your AddTodoForm has this placeholder
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(button);

  expect(screen.getByText("New Todo")).toBeInTheDocument();
});

test("toggles a todo’s completion state", () => {
  render(<TodoList />);
  const todoItem = screen.getByText("Learn React");
  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle("text-decoration: line-through");
});
