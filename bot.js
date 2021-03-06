/* prettier-ignore */
const { keyboard, Key, mouse, screen, straightTo, centerOf, Point } = require("@nut-tree/nut-js");

const MOUSE_SPEED = 3000
const RIGHT_POINT = new Point(430, 316)
const LEFT_POINT = new Point(370, 335)
const PLANET_POINT = new Point(117, 109)
mouse.config.mouseSpeed = MOUSE_SPEED

// LAUNCH THE GAME IF NEEDED
// const exec = require("child_process")
// const filePath = "C:\\Users\\Michael\\Downloads\\DarkSpaceExe"
// exec.exec(`${filePath}\\DarkSpace.exe`, { cwd: filePath })
// setTimeout(() => {
//   robot.typeString("aventus")
//   robot.keyTap("tab")
//   robot.typeString("idontcare")
//   robot.keyTap("enter")
// }, 2500)

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

const buyGoods = async (amount) => {
  const image = await screen.waitFor("./images/trade_center.png", 3000)
  await mouse.move(straightTo(centerOf(image)))
  await mouse.leftClick()

  try {
    const image1 = await screen.waitFor("./images/exit_news.jpg", 4000)
    await mouse.move(straightTo(centerOf(image1)))
    await mouse.leftClick()
    /* prettier-ignore */
    const image2 = await screen.waitFor(`./images/tradegoods/goods9.jpg`, 4000)
    await mouse.move(straightTo(centerOf(image2)))
    await mouse.leftClick()
    await keyboard.type(amount.toString())
    await keyboard.type(Key.Enter) 
  } catch (err) {
    /* prettier-ignore */
    const image2 = await screen.waitFor(`./images/tradegoods/goods9.jpg`, 4000)
    await mouse.move(straightTo(centerOf(image2)))
    await mouse.leftClick()
    await keyboard.type(amount.toString())
    await keyboard.type(Key.Enter)
    console.log("couldnt find exit news so continued on")
  } finally {
    clickLeave()
  }
}

const repairShip = async () => {
  try {
    /* prettier-ignore */
    await mouse.move(straightTo(centerOf(screen.waitFor("./images/repair.jpg", 2000))))
    await mouse.leftClick()
    /* prettier-ignore */
    const repairImage = await screen.waitFor("./images/repair_ship.jpg", 3000)
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
    const tradeCenterImage = await screen.waitFor("./images/trade_center.png", 5000)
    await mouse.move(straightTo(centerOf(tradeCenterImage)))
    await mouse.leftClick()
    const image = await screen.waitFor("./images/sell_all.jpg", 10000)
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

const fourTimes = async (point) => {
  for (let i = 0; i < 4; i++) {
    await jump()
    await dotClick(point)
  }
}

const clickOnPlanet = async () => {
  await mouse.move(straightTo(PLANET_POINT))
  await mouse.leftClick()
}
const trader = async () => {
  await dragWindow()
  await repairShip()
  await buyGoods(310)
  await launch()
  await fourTimes(LEFT_POINT)
  await clickOnPlanet()
  await repairShip()
  await sellGoods()
  await launch()
  await fourTimes(RIGHT_POINT)
  await clickOnPlanet()
}

const loop = async () => {
  let runCount = 0
  while (runCount < 10) {
    await trader()
    console.log(mouse.getPosition())
    console.log(`game has ran ${runCount} times`)
    runCount++
  }
}

setTimeout(loop, 1000)

// setTimeout(sellGoods, 1000)
