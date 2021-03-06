const {
  keyboard,
  Key,
  mouse,
  screen,
  straightTo,
  centerOf,
  Point,
  up,
  down,
  left,
  right,
} = require("@nut-tree/nut-js")

const DOWN_LEFT_EUREKA = new Point(436, 370)
const DOWN_LEFT_BACK_EUREKA = new Point(355, 362)
const UP_RIGHT_EUREKA = new Point(445, 291)
const UP_LEFT_BACK_EUREKA = new Point(366, 284)
const RIGHT_CRONTAS = new Point(438, 325)
const LEFT_CRONTAS = new Point(360, 325)
const UP_POINT_CRONTAS = new Point(400, 300)
const DOWN_POINT_CRONTAS = new Point(400, 355)
const UP_RIGHT_POINT_HY_SYNG = new Point(430, 299)
const DOWN_RIGHT_POINT_HY_SYNG = new Point(430, 336)
const UP_LEFT_POINT_HY_SYNG = new Point(367, 317)
const DOWN_LEFT_POINT_HY_SYNG = new Point(371, 355)
const MOUSE_SPEED = 3000
const RIGHT_POINT = new Point(430, 316)
const LEFT_POINT = new Point(370, 335)
const PLANET_POINT = new Point(117, 109)
mouse.config.mouseSpeed = MOUSE_SPEED

const clickOnPlanet = async () => {
  await mouse.move(straightTo(PLANET_POINT))
  await mouse.leftClick()
}

const dragWindow = async () => {
  const point = new Point(64, 10)
  const image = await screen.waitFor("./images/draggable.jpg", 2000)
  await mouse.move(straightTo(centerOf(image)))
  await mouse.drag(straightTo(point))
}
const clickLeave = async () => {
  screen.config.confidence = 0.8
  await mouse.move(straightTo(centerOf(screen.find("./images/leave.jpg"))))
  await mouse.leftClick()
}
const launch = async () => {
  try {
    const image = await screen.waitFor("./images/launch.png", 10000)
    await mouse.move(straightTo(centerOf(image)))
    await mouse.leftClick()
  } catch (err) {
    console.log(err)
  }
}
const repairShip = async () => {
  try {
    /* prettier-ignore */
    await mouse.move(straightTo(centerOf(screen.waitFor("./images/repair.jpg", 500))))
    await mouse.leftClick()
    /* prettier-ignore */
    const repairImage = await screen.waitFor("./images/repair_ship.jpg", 1000)
    await mouse.move(straightTo(centerOf(repairImage)))
    await mouse.leftClick()
    clickLeave()
  } catch (err) {
    console.log("repair error: ", err)
    clickLeave()
  }
}

const jump = async () => {
  screen.config.confidence = 0.8
  try {
    const image = await screen.waitFor("./images/jump.jpg", 30000)
    await mouse.move(straightTo(centerOf(image)))
    await mouse.leftClick()
  } catch (err) {
    console.log("couldnt find ", err)
  }
}

const sellGoods = async () => {
  screen.config.confidence = 0.8
  try {
    /* prettier-ignore */
    const tradeCenterImage = await screen.waitFor("./images/trade_center.png", 1000)
    await mouse.move(straightTo(centerOf(tradeCenterImage)))
    await mouse.leftClick()
    const image = await screen.waitFor("./images/sell_all.jpg", 2000)
    await mouse.move(straightTo(centerOf(image)))
    await mouse.leftClick()
  } catch (err) {
    console.log("couldnt find ", err)
  } finally {
    clickLeave()
  }
}

const dotClick = async (point) => {
  screen.config.confidence = 0.9
  // const image = await screen.waitFor("./images/dot.jpeg", 2000)
  await mouse.move(straightTo(point))
  await mouse.leftClick()
  // console.log(image)
}
const collectGoods = async () => {
  try {
    const view_ship = await screen.waitFor("./images/view_ship.jpg", 1000)
    await mouse.move(straightTo(centerOf(view_ship)))
    await mouse.leftClick()
    const trade_goods = await screen.waitFor("./images/tradegoods.jpg", 1000)
    await mouse.move(straightTo(centerOf(trade_goods)))
    await mouse.leftClick()
  } catch (err) {
    screen.config.confidence = 0.5
    console.log("could not find the image so continuing with the plan")
    const trade_goods = await screen.waitFor("./images/tradegoods.jpg", 1000)
    await mouse.move(straightTo(centerOf(trade_goods)))
    await mouse.leftClick()
  } finally {
    const goodsPoint = new Point(227, 334)
    await mouse.move(straightTo(goodsPoint))
    await mouse.rightClick()
    await mouse.move(down(15))
    await mouse.rightClick()
    await mouse.move(down(15))
    await mouse.rightClick()
    await mouse.move(down(15))
    await mouse.rightClick()
    await mouse.move(down(15))
    await mouse.rightClick()
    await mouse.move(down(15))
    await mouse.rightClick()
    await mouse.move(right(80))
    await mouse.rightClick()
    await mouse.move(up(15))
    await mouse.rightClick()
    await mouse.move(up(15))
    await mouse.rightClick()
    await mouse.move(up(15))
    await mouse.rightClick()
    await mouse.move(up(15))
    await mouse.rightClick()
    await mouse.move(up(15))
    await mouse.rightClick()
  }
}

const trader = async () => {
  await dragWindow()
  await repairShip()
  await sellGoods()
  await launch()
  await jump()
  await dotClick(RIGHT_CRONTAS)
  await collectGoods()
  await jump()
  await dotClick(LEFT_CRONTAS)
  // await collectGoods()
  await clickOnPlanet()
}

const trader1 = async () => {
  await dragWindow()
  await repairShip()
  await sellGoods()
  await launch()
  await jump()
  await dotClick(DOWN_RIGHT_EUREKA)
  // await collectGoods()
  await jump()
  await dotClick(UP_RIGHT_EUREKA)
  await collectGoods()
  await jump()
  await dotClick(DOWN_LEFT_BACK_EUREKA)
  await jump()
  await dotClick(UP_LEFT_BACK_EUREKA)
  // await collectGoods()
  await clickOnPlanet()
}

const loop = async () => {
  let runCount = 1
  // while (runCount < 5) {
  //   await trader()
  //   console.log(mouse.getPosition())
  //   console.log(`game has ran ${runCount} times`)
  //   runCount++
  // }
  while (runCount <= 20) {
    await trader1()
    console.log(mouse.getPosition())
    console.log(`game has ran ${runCount} times`)
    runCount++
  }
}

setTimeout(loop, 1000)

console.log(mouse.getPosition())
