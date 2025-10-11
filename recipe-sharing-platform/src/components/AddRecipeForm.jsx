import { useState } from "react";

function AddRecipeForm() {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.ingredients.trim()) newErrors.ingredients = "Ingredients are required";
    else {
      const list = formData.ingredients
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (list.length < 2) newErrors.ingredients = "Please include at least two ingredients";
    }
    if (!formData.steps.trim()) newErrors.steps = "Preparation steps are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;

    // simulate save (you can replace with real save logic later)
    console.log("Submitted recipe:", {
      ...formData,
      ingredients: formData.ingredients.split(",").map((i) => i.trim()).filter(Boolean),
    });

    setSuccess("Recipe submitted successfully!");
    setFormData({ title: "", ingredients: "", steps: "" });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg w-full max-w-4xl md:max-w-2xl p-6 md:p-8"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Add a New Recipe</h2>

        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Recipe Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. Spaghetti Carbonara"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Ingredients</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows="6"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="List ingredients separated by commas"
            />
            {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Preparation Steps</label>
            <textarea
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              rows="6"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Describe preparation steps"
            />
            {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
          </div>
        </div>

        <div className="mt-6 md:flex md:justify-end">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecipeForm;
