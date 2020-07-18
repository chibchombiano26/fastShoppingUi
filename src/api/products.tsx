import config from "./config";

const getProducts = async () => {
  const _fetch = await fetch(`${config.baseURL}/product`);
  const data = await _fetch.json();
  console.log(data);
  return data;
};

export { getProducts };
