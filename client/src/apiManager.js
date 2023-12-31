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

export const getWalkers = async () => {
  const res = await fetch("/api/walkers");
  return res.json();
}

export const getUniqueWalker = async (id) => {
  const res = await fetch(`/api/walkers/${id}`);
  return res.json();
};

export const getCities = async () => {
  const res = await fetch("/api/cities")
  return res.json();
}

export const getWalkerCities = async () => {
  const res = await fetch("/api/walkercities")
  return res.json();
}

export const postDog = async(newDog) => {
  const res = await fetch('/api/dogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newDog),
  });

  return res;
}

export const postAssignDog = async(assignedDog) => {
  const dogId = assignedDog.id;
  const res = await fetch(`/api/dogs/${dogId}/assign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(assignedDog),
  });

  return res;
}

export const postCity = async(newCity) => {
  const res = await fetch('/api/cities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCity),
  });

  return res;
}

export const putWalker = async (id, walkerObj) => {
  const res = await fetch(`/api/walkers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(walkerObj),
  });

  return res;
};

export const deleteDog = async(id) => {
  await fetch(`/api/dogs/${id}`, {
    method: 'DELETE',
  })
}

export const deleteWalker = async(id) => {
  await fetch(`/api/walkers/${id}`, {
    method: 'DELETE',
  })
}