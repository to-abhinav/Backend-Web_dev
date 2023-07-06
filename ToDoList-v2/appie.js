const express = require("express");
const date = require(__dirname + "/date.js");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ =require("lodash");
// const userData = require("./user.model");

// connecting to mongodb using mongoose
const url = "mongodb://127.0.0.1:27017/toDoListDB";

connectToDb(url);

const dataSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

userData = mongoose.model("userData", dataSchema);

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
  const itemToInsert = new userData({
    name: item,
  });
  try {
    await Items.create({
      name: item,
    });
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

// app.get("/", async function (req, res) {
//   console.log("This is GET");
//   const day = date.getDate();
//   const data = await find(userData);

//   console.log(data.length);
//   if (data.length === 0) {
//     console.log("Here length is 0");
//     await insertAll(defaultItem, userData);
//   }

//   res.render("list", { listTitle: day, newListItems: data });
// });

app.get("/", async function (req, res) {
    console.log("This is GET");
    const day = date.getDate();
    try {
      const data = await find(userData);
  
      console.log(data.length);
      if (data.length === 0) {
        console.log("Here length is 0");
        await insertAll(defaultItem, userData);
      }
  
      if (data.length > 0) {
        res.render("list", { listTitle: day, newListItems: data });
      } else {
        // Handle case when data is not available
        res.render("loading");
      }
    } catch (error) {
      console.error(error);
      // Handle error case
      res.render("error");
    }
  });
  

//to handle custom list request from the client USING EXPRESS ROUTE Parameters

app.get("/:nextList", async function (req, res) {
  const nxtPg = _.capitalize( req.params.nextList);
  // await findIfExist(nxtPg,ListData)
  console.log(nxtPg);

  await checkListData(nxtPg);
  // ListData.findOne({name:nxtPg},function (err,foundList) {
  //     if(!err){
  //         if(!foundList){
  //             console.log("dosen't exist!");
  //         }else{
  //             console.log("exists!");
  //         }
  //     }
  //   })

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
        res.render("list", { listTitle: nxtPg, newListItems: foundList.items });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

app.post("/", async function (req, res) {
    console.log(res.body);
  const dataToInsert = req.body.newItem;
  const listName = req.body.list;

  if (listName === date.getDate()) {
    insertOne(dataToInsert, userData);
    res.redirect("/");
  } else {
    // await checkListData(listName);
 const dataArr=new userData({
    name:dataToInsert
 })
    // async function checkListData(nxtPg) {
      try {
        console.log(listName);
        const foundList = await ListData.findOne({ name: listName }).exec();
        console.log(foundList)
        foundList.items.push(dataArr);
        foundList.save();
        res.redirect("/"+listName);
      } catch (err) {
        console.log(err);
      }
    
  }
});

app.post("/delete", async function (req, res) {
  const delItem = req.body.checkbox;
  const listNamee=req.body.listName;
  console.log(delItem+" >"+listNamee);
  if(listNamee==date.getDate()){
    await deleteObj(delItem, userData);

  res.redirect("/");
  }else{
    try {
        await ListData.findOneAndUpdate(
          { name: listNamee },
          { $pull: { items: { _id: delItem } } }
        );
        res.redirect("/" + listNamee);
      } catch (err) {
        console.error(err);
      }
    }
}
);
  

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
