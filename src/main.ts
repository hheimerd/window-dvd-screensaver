export {}

const win = window.open('#logo', 'mozillaWindow', 'popup');

if (location.hash == '#logo') {
    document.getElementById('app')!.innerHTML = `
        <img src="/DVD_logo.png" style="width: 100vw">
    `
    throw new Error('')
}

if (!win)
{
    alert("Разрешите показ всплывающего окна");
    throw new Error("Разрешите показ всплывающего окна")
}
const WINDOW_WIDTH = 700;
const WINDOW_HEIGHT = 400;
win.resizeTo(WINDOW_WIDTH, WINDOW_HEIGHT);

enum Dir {
    UP_RIGHT, UP_LEFT, DOWN_RIGHT, DOWN_LEFT
}

const bottomBound = window.screen.availHeight;
const rightBound = window.screen.availWidth;


const logo = {
    x: 0,
    y: 0,
    dir: Dir.DOWN_RIGHT,
};

setInterval(() => {
        if (logo.x == 0 && logo.y == 0) {
            logo.dir = Dir.DOWN_RIGHT;
        } else if (logo.x == 0 && logo.y + WINDOW_HEIGHT == bottomBound - 1) {
            logo.dir = Dir.UP_RIGHT;
        } else if (logo.x + WINDOW_WIDTH == rightBound - 3 && logo.y == 0) {
            logo.dir = Dir.DOWN_LEFT;
        } else if (logo.x + WINDOW_WIDTH == rightBound - 3 && logo.y + WINDOW_HEIGHT == bottomBound - 1) {
            logo.dir = Dir.UP_LEFT;
            // See if the logo bounces off the left edge:
        } else if (logo.x == 0 && logo.dir == Dir.UP_LEFT) {
            logo.dir = Dir.UP_RIGHT;
        } else if (logo.x == 0 && logo.dir == Dir.DOWN_LEFT) {
            logo.dir = Dir.DOWN_RIGHT;
            // See if the logo bounces off the right edge:
            // (WIDTH - 3 because 'DVD' has 3 letters.)
        } else if (Math.abs(logo.x + WINDOW_WIDTH - rightBound - 3) < 5 && logo.dir == Dir.UP_RIGHT) {
            logo.dir = Dir.UP_LEFT;
        } else if (Math.abs(logo.x + WINDOW_WIDTH - rightBound - 3) < 5 && logo.dir == Dir.DOWN_RIGHT) {
            logo.dir = Dir.DOWN_LEFT;
            // See if the logo bounces off the top edge:
        } else if (logo.y == 0 && logo.dir == Dir.UP_LEFT) {
            logo.dir = Dir.DOWN_LEFT;
        } else if (logo.y == 0 && logo.dir == Dir.UP_RIGHT) {
            logo.dir = Dir.DOWN_RIGHT;
            // See if the logo bounces off the bottom edge:
        } else if (logo.y + WINDOW_HEIGHT == bottomBound - 1 && logo.dir == Dir.DOWN_LEFT) {
            logo.dir = Dir.UP_LEFT;
        } else if (logo.y + WINDOW_HEIGHT == bottomBound - 1 && logo.dir == Dir.DOWN_RIGHT) {
            logo.dir = Dir.UP_RIGHT;
        }

        if (logo.dir == Dir.UP_RIGHT) {
            logo.x += 2;
            logo.y -= 1;
        } else if (logo.dir == Dir.UP_LEFT) {
            logo.x -= 2;
            logo.y -= 1;
        } else if (logo.dir == Dir.DOWN_RIGHT) {
            logo.x += 2;
            logo.y += 1;
        } else if (logo.dir == Dir.DOWN_LEFT) {
            logo.x -= 2;
            logo.y += 1;
        }

        win.moveTo(logo.x, logo.y);
    },
    5);
