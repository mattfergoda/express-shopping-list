const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

let pickles = { name: "Pickles", price: "1000.00" };

beforeEach(function() {
  db.Cat.add(pickles);
});

afterEach(function() {
  db.Cat.deleteAll();
});


/** GET /items - returns `{items: [item, ...]}` */

describe("GET /items", function() {
  it("Gets list of all items", async function() {
    const resp = await request(app).get(`/items`);

    expect(resp.statusCode).toEqual(200);
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
      .post(`/item`)
      .send(newItem);

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({added: newItem});
  });
});

/** GET /cats/[name] - return data about one cat: `{cat: cat}` */

describe("GET /cats/:name", function() {
  it("Gets a single cat", async function() {
    const resp = await request(app).get(`/cats/${pickles.name}`);

    expect(resp.body).toEqual({ cat: pickles });
  });

  it("Responds with 404 if can't find cat", async function() {
    const resp = await request(app).get(`/cats/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});
// end


// end

/** PATCH /cats/[name] - update cat; return `{cat: cat}` */

describe("PATCH /cats/:name", function() {
  it("Updates a single cat", async function() {
    const resp = await request(app)
      .patch(`/cats/${pickles.name}`)
      .send({
        name: "Troll"
      });
    expect(resp.body).toEqual({
      cat: { name: "Troll" }
    });
  });

  it("Responds with 404 if name invalid", async function() {
    const resp = await request(app).patch(`/cats/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});
// end

/** DELETE /cats/[name] - delete cat,
 *  return `{message: "Cat deleted"}` */

describe("DELETE /cats/:name", function() {
  it("Deletes a single a cat", async function() {
    const resp = await request(app)
      .delete(`/cats/${pickles.name}`);
    expect(resp.body).toEqual({ message: "Deleted" });
    expect(db.Cat.all().length).toEqual(0);
  });
});
// end
