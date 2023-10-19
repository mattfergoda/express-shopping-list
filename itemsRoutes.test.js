const request = require("supertest");

const app = require("./app");
let { items } = require("./fakeDb");

let pickles = { name: "Pickles", price: "1000.00" };

beforeEach(function() {
  items.push(pickles);
});

afterEach(function() {
  items.length = 0;
});


/** GET /items - returns `{items: [item, ...]}` */

describe("GET /items", function() {
  it("Gets list of all items", async function() {
    const resp = await request(app).get(`/items`);

    expect(resp.statusCode).toEqual(200);
    console.log("Body", resp.body)
    expect(resp.body).toEqual({ items: [pickles] });
  });
});

/** POST /items - create item from {name, price}; return `{added: item}` */

describe("POST /items", function() {
  it("Creates a new item", async function() {

    const newItem = {
      name: "cheese",
      price: 50
    };

    const resp = await request(app)
      .post(`/items`)
      .send(newItem);

    expect(resp.statusCode).toEqual(201);
    debugger;
    expect(resp.body).toEqual({added: newItem});
    console.log("ITEMS", items)
    expect(items.length).toEqual(2);
  });

  it("Return 400 status code for bad inputs", async function() {

    const newItem = {
      name: "cheese"
    };

    const resp = await request(app)
      .post(`/items`)
      .send(newItem);

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toEqual({
      "error": {
        "message": "price required.",
        "status": 400
      }
    });
  });
});


/** POST /items - create item from {name, price}; return `{added: item}` */

// describe("POST /items", function() {
//   it("Creates a new item", async function() {

//     const newItem = {
//       name: "cheese",
//       price: 50
//     };

//     const resp = await request(app)
//       .post(`/items`)
//       .send(newItem);

//     expect(resp.statusCode).toEqual(201);
//     expect(resp.body).toEqual({added: newItem});
//   });

//   it("Return 400 status code for bad inputs", async function() {

//     const newItem = {
//       name: "cheese"
//     };

//     const resp = await request(app)
//       .post(`/items`)
//       .send(newItem);

//     expect(resp.statusCode).toEqual(400);
//     expect(resp.body).toEqual({
//       "error": {
//         "message": "price required.",
//         "status": 400
//       }
//     });
//   });
// });

/** GET /items/:name - returns `{items: [item, ...]}` */


describe("GET /items", function() {
  it("Gets list of all items", async function() {
    const resp = await request(app).get(`/items`);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ items: [pickles] });
  });
});

// end

/** PATCH /cats/[name] - update cat; return `{cat: cat}` */

// describe("PATCH /cats/:name", function() {
//   it("Updates a single cat", async function() {
//     const resp = await request(app)
//       .patch(`/cats/${pickles.name}`)
//       .send({
//         name: "Troll"
//       });
//     expect(resp.body).toEqual({
//       cat: { name: "Troll" }
//     });
//   });

//   it("Responds with 404 if name invalid", async function() {
//     const resp = await request(app).patch(`/cats/not-here`);
//     expect(resp.statusCode).toEqual(404);
//   });
// });
// // end

/** DELETE /cats/[name] - delete cat,
 *  return `{message: "Cat deleted"}` */

// describe("DELETE /cats/:name", function() {
//   it("Deletes a single a cat", async function() {
//     const resp = await request(app)
//       .delete(`/cats/${pickles.name}`);
//     expect(resp.body).toEqual({ message: "Deleted" });
//     expect(db.Cat.all().length).toEqual(0);
//   });
// });

