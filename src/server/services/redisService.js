import Redis from "redis";

const redis = Redis.createClient({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  password: process.env.REDIS_SECRET,
});

redis.on("connect", () => {
  console.log("Connected to Redis server");
});

redis.on("ready", () => {
  console.log("Redis is Ready");
});

redis.on("error", (err) => {
  console.log(err);
  console.log("Error occurred while connecting to Redis");
  process.exit(0);
});

export const storeToken = (hash, token) => {
  return new Promise((resolve, reject) => {
    redis.set(hash, token, "EX", 3600, (err, reply) => {
      if (err) {
        reject(err);
      }
      resolve(reply);
    });
  });
};

export const findToken = async (hash) => {
  return new Promise((resolve, reject) => {
    redis.get(hash, (err, reply) => {
      if (err) {
        reject(err);
      }
      resolve(reply);
    });
  });
};
