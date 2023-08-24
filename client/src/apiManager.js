export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};

export const getDogs = async () => {
  const res = await fetch("/api/dogs");
  return res.json();
}

export const getUniqueDog = async (id) => {
  const res = await fetch(`/api/dogs/${id}`);
  return res.json();
}

export const getCities = async () => {
  const res = await fetch("/api/cities")
  return res.json();
}

export const postDog = async(newDog) => {
  await fetch('/api/dogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newDog),
  });
}