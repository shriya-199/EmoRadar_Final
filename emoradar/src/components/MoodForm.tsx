import { useState, FormEvent } from "react";

const MoodForm = () => {
  const [mood, setMood] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/moods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mood,
        note,
        timestamp: new Date(),
      }),
    });

    if (response.ok) {
      alert("✅ Mood submitted!");
      setMood("");
      setNote("");
    } else {
      alert("❌ Submission failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded w-80">
      <input
        type="text"
        placeholder="Mood"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default MoodForm;
