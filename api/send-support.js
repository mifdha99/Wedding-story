fetch("https://wedding-story-nine.vercel.app/api/send-support", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, message, amount }),
})
