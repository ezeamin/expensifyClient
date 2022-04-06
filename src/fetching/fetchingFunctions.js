const postLogin = async (user) => {
  const res = await fetch("/api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return res;
};

exports.postLogin = postLogin;
