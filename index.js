const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
app.use(cors());
require("dotenv").config();
app.use(express.json());

const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.tsmlaiu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const productsCollection = client.db("mengary").collection("products");

    app.get("/products", async (req, res) => {
      const search = req.query.search;
      console.log(search);
      let query = {};
      if (search) {
        query = {
          $text: {
            $search: search,
          },
        };
      }

      const cursor = productsCollection.find(query);

      const products = await cursor.toArray();
      res.send(products);
    });

    app.get("/products/:item", async (req, res) => {
      const item = req.params.item;
      const query = { category_id: item };
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}

run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Mengary server running");
});

app.listen(port, () => {
  console.log("mengary server running");
});
