const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fmz6hpp.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const database = client.db("WatchAura");
    const productList = database.collection("watchList");

    // post or save product data
    app.post("/add-watch", async (req, res) => {
      const data = req.body;
      const date = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
      data.createdAt = date;
      console.log(data);
      const result = await productList.insertOne(data);
      res.send(result);
    });

    // get product data
    app.get("/watch-collection", async (req, res) => {
      const result = await productList.find().toArray();
      res.send(result);
    });

    // get single data from collection
    // app.get("/product-details/:id", async (req, res) => {
    //   const id = req.params.id;
    //   console.log(id);

    //   const query = { _id: new ObjectId(id) };
    //   const result = await productList.findOne(query);
    //   res.send(result);
    // });

    // update data
    // app.put("/update/:id", async (req, res) => {
    //   const data = req.body;
    //   const id = req.params;
    //   const query = { _id: new ObjectId(id) };

    //   const updateServices = {
    //     $set: data,
    //   };

    //   const result = await productList.updateOne(query, updateServices);
    //   res.send(result);
    // });

    // delete data
    // app.delete("/delete/:id", async (req, res) => {
    //   const id = req.params;
    //   const query = { _id: new ObjectId(id) };
    //   const result = await productList.deleteOne(query);
    //   res.send(result);
    // });

    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello User!");
});

app.listen(port, () => {
  console.log(`Sever is running on the port: ${port}`);
});
