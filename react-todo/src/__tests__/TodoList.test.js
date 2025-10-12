import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

test("renders the TodoList component", () => {
  render(<TodoList />);
  const title = screen.getByText("Todo List");
  expect(title).toBeInTheDocument();
});

test("adds a new todo when submitted", () => {
  render(<TodoList />);

  const input = screen.getByPlaceholderText("Add a new todo");
  const button = screen.getByRole("button", { name: /add/i });

  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(button);

  const newTodo = screen.getByText("New Todo");
  expect(newTodo).toBeInTheDocument();
});

test("toggles a todo's completion state", () => {
  render(<TodoList />);
  const todoItem = screen.getByText("Learn React");

  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle("text-decoration: line-through");
});
