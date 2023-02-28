const { Router } = require('express');
const dogsRouter = Router()
const {getDogsHandler, getDogsByIdHandler, postDogsHandler} = require("../handlers/dogsHandlers")

dogsRouter.get("/", getDogsHandler)
dogsRouter.get("/:id", getDogsByIdHandler)
dogsRouter.post("/", postDogsHandler)

module.exports = {
    dogsRouter,
}