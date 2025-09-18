// src/App.jsx
import React from "react";
import Search from "./components/Search";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        GitHub User Search
      </h1>
      <Search />
    </div>
  );
}

export default App;
