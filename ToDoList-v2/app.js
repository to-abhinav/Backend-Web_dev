const express = require("express");
const date = require(__dirname + "/date.js");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// connecting to mongodb using mongoose
const url = "mongodb://127.0.0.1:27017/toDoListDB";

connectToDb(url);

const dataSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const userData = mongoose.model("userData", dataSchema);

async function connectToDb(url) {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB successfully using mongoose");
  } catch (error) {
    console.error(error);
  }
}

const listSchema = {
  name: String,
  items: [dataSchema],
};

const ListData = mongoose.model("ListData", listSchema);

const item1 = new userData({
  name: "Welcome to your toDoList",
});

const item2 = new userData({
  name: "Hit + button to add a new item to the list",
});

const item3 = new userData({
  name: "Click here to delete an item from the list",
});

const defaultItem = [item1, item2, item3];

async function insertAll(arr, Items) {
  try {
    await Items.insertMany(arr);
    console.log("Successfully inserted");
  } catch (error) {
    console.error(error.message);
  }
}

async function insertOne(item, Items) {
  try {
    await Items.create({ name: item });
    console.log("Successfully inserted");
  } catch (error) {
    console.error(error.message);
  }
}

async function find(Items) {
  try {
    const db = await Items.find();
    console.log(db);
    return db;
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteObj(objId, Items) {
  try {
    await Items.deleteOne({ _id: objId });
  } catch (error) {
    console.error(error.message);
  }
}

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async function (req, res) {
  console.log("This is GET");
  const day = date.getDate();
  const data = await find(userData);

  console.log(data.length);
  if (data.length === 0) {
    console.log("Here length is 0");
    await insertAll(defaultItem, userData);
  }

  res.render("list", { listTitle: day, newListItems: data });
});

//to handle custom list request from the client USING EXPRESS ROUTE Parameters

app.get("/:nextList", async function (req, res) {
  const nxtPg = req.params.nextList;
  console.log(nxtPg);

  await checkListData(nxtPg);

  async function checkListData(nxtPg) {
    try {
      console.log(nxtPg);
      const foundList = await ListData.findOne({ name: nxtPg }).exec();
      if (!foundList) {
        //to create a new list
        const listItem = new ListData({
          name: nxtPg,
          items: defaultItem,
             });
      listItem.save();
      res.redirect("/" + nxtPg);
    } else {
      if (foundList.items === null) {
        foundList.items = [];
      }
      res.render("list", { listTitle: nxtPg, newListItems: foundList.items });
    }
  } catch (err) {
    console.log(err);
  }
}
})

app.post("/", async function (req, res) {
  const dataToInsert = req.body.newItem;
  const listName = req.body.list;

  if (listName === date.getDate()) {
    await insertOne(dataToInsert, userData);
    res.redirect("/");
  } else {
    await checkListData(listName);

    async function checkListData(nxtPg) {
      try {
        console.log(nxtPg);
        const foundList = await ListData.findOne({ name: nxtPg }).exec();
        console.log(foundList);
        if (foundList) {
          if (foundList.items === null) {
            foundList.items = [];
          }
          foundList.items.push({ name: dataToInsert });
          foundList.save();
          res.redirect("/" + listName);
        } else {
          console.log("List not found");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
});

app.post("/delete", async function (req, res) {
  const delItem = req.body.checkbox;

  await deleteObj(delItem, userData);

  res.redirect("/");
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: [] });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
