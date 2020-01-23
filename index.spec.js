// test("a placeholder test", (done) => {
//     expect(2+2).toBe(4)
//     done()
// })

// could be also:
// test("a placeholder test", async () => {
//     expect(2+2).toBe(4)
// })
const db = require("./data/config")

const supertest = require("supertest")
// server won't start due to the if statement in index.js
const server = require("./index")

beforeEach(async () => {
    await db.seed.run()
})

test("welcome route", async () => {
    const res = await supertest(server).get("/")
    // does it return the expected status code?
    expect(res.status).toBe(200)

    // does it return the expected data format?
    expect(res.type).toBe("application/json")

    // does it return the expected data?
    expect(res.body.message).toBe("Welcome")

    // for not being lower/upper case sensitive
    expect(res.body.message).toMatch(/welcome/i)
})

test("get hobbit list", async () => {
    const res = await supertest(server).get("/hobbits")
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.length).toBeGreaterThan(0)
    expect(res.body[0].id).toBe(1)
    expect(res.body[0].name).toBe("sam")
})

test("create hobbit route", async () => {
    const res = await supertest(server)
        .post("/hobbits")
        .send({ name: "gaffer" })
    expect(res.status).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body).toEqual({ id: 5, name: "gaffer" })
})

