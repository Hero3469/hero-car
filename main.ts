input.onButtonPressed(Button.A, function () {
    rekabit.setServoPosition(ServoChannel.S1, 45)
})
function turn_left () {
    rekabit.setServoPosition(ServoChannel.S1, 135)
    for (let index = 0; index < 4; index++) {
        rekabit.setRgbPixelColor(1, 0xff8000)
        basic.pause(100)
        rekabit.setRgbPixelColor(1, 0x000000)
        basic.pause(100)
    }
    zoombit.turn(TurnDirection.Left, 128)
    basic.pause(500)
    zoombit.brake()
    rekabit.setServoPosition(ServoChannel.S1, 90)
}
input.onButtonPressed(Button.AB, function () {
    rekabit.setServoPosition(ServoChannel.S1, 90)
    basic.showIcon(IconNames.Happy)
})
input.onButtonPressed(Button.B, function () {
    rekabit.setServoPosition(ServoChannel.S1, 135)
    basic.showLeds(`
        . . . . .
        . . # . #
        . . . . .
        # . . . #
        . # # # .
        `)
})
function turn_right () {
    rekabit.setServoPosition(ServoChannel.S1, 45)
    for (let index = 0; index < 4; index++) {
        rekabit.setRgbPixelColor(0, 0xff8000)
        basic.pause(100)
        rekabit.setRgbPixelColor(0, 0x000000)
        basic.pause(100)
    }
    zoombit.turn(TurnDirection.Right, 128)
    basic.pause(500)
    zoombit.brake()
    rekabit.setServoPosition(ServoChannel.S1, 90)
}
basic.showIcon(IconNames.Square)
let position = 0
while (!(input.buttonIsPressed(Button.A))) {
	
}
music.startMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once)
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.showIcon(IconNames.SmallHeart)
})
basic.forever(function () {
    if (zoombit.isLineDetectedOn(LinePosition.Center)) {
        zoombit.move(MotorDirection.Forward, 128)
    } else if (zoombit.isLineDetectedOn(LinePosition.Left1)) {
        zoombit.setMotorsSpeed(50, 100)
        position = 1
    } else if (zoombit.isLineDetectedOn(LinePosition.Right1)) {
        zoombit.setMotorsSpeed(100, 50)
        position = 2
    } else if (zoombit.isLineDetectedOn(LinePosition.Left2)) {
        zoombit.setMotorsSpeed(0, 100)
        position = 1
    } else if (zoombit.isLineDetectedOn(LinePosition.Right2)) {
        zoombit.setMotorsSpeed(100, 0)
        position = 2
    } else if (zoombit.isLineDetectedOn(LinePosition.None)) {
        if (position == 1) {
            zoombit.turn(TurnDirection.Left, 80)
        } else if (position == 1) {
            zoombit.turn(TurnDirection.Right, 80)
        }
    }
})
basic.forever(function () {
    if (zoombit.readUltrasonic() < 10) {
        zoombit.move(MotorDirection.Backward, 128)
    } else if (zoombit.readUltrasonic() < 20) {
        zoombit.brake()
        if (input.buttonIsPressed(Button.A)) {
            turn_right()
        } else if (input.buttonIsPressed(Button.B)) {
            turn_left()
        }
    } else {
        zoombit.move(MotorDirection.Forward, 128)
    }
})
