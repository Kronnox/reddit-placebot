module.exports = {
  BOARD_URL: 'https://hot-potato.reddit.com/embed/',
  BOARD_FILE: __dirname + '/tmp/board.bmp',

  REMOTE_TARGET_URL: 'https://raw.githubusercontent.com/Zequez/reddit-placebot/master/images/target.png',
  REMOTE_TARGET_FILE: __dirname + '/tmp/remote_target',

  LOCAL_TARGET_FILE: __dirname + '/images/target.png',

  DRAW_URL: 'https://www.reddit.com/api/place/draw.json',

  // Use the REMOTE_TARGET_URL file as target, otherwise it's gonna just
  // try to read from target.bmp
  useRemoteTarget: false,

  // Wait until these amount of accounts are available
  // and paint pixels at the same time
  bundleAccounts: 4,

  // The PLACEBOT mark in the world <3
  targetStartX: 110,
  targetStartY: 870,

  drawMode: 'LEFTTOP', // LEFTTOP | RANDOM

  // Testing configuration things

  // This is used for testing
  useExistingBoardCache: false,

  // Do not send the painting to the server so you don't waste your pixels
  // while testing something else
  mockPainting: false
}
