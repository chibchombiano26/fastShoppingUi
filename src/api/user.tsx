import config from "./config";

const adddUser = async (user: any) => {
  const request = await fetch(`${config.baseURL}/user`, {
    method: "post",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return await request.json();
};

const getExistentUsers = async (email: string) => {
  const request = await fetch(`${config.baseURL}/user?email?${email}`);
  return await request.json();
};

export { adddUser, getExistentUsers };
