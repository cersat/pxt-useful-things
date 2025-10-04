

enum LedChX {
    X0=0,
    X1=1,
    X2=2,
    X3=3,
    X4=4
}

enum LedChY {
    Y0 = 0,
    Y1 = 1,
    Y2 = 2,
    Y3 = 3,
    Y4 = 4
}

enum Pictures {
    Hi = 1,
    Beach = 2,
    Robot = 3
}

/**
 * Custom blocks
 */
//% weight=100 color=#cdf305 icon="" block="Полезные блоки"
namespace UsefulThings {
    /**
     * Заставляет указанный светодиод мерцать с указанной задержкой
    */
    //% block="Мерцать %times раз с задержкой %delay координаты: Х:%pixelX Y:%pixelY"
    //% subcategory="Экран"
    export function blink(times: number, delay: number, pixelX: LedChX, pixelY: LedChY): void {
        for (let i = 0; i < times; i++) {
            led.toggle(pixelX, pixelY)
            basic.pause(delay)
            basic.clearScreen()
            basic.pause(delay)
        }
    }
    
    /**
     * Выводит первое значение, если условие истинно, и второе - если ложно
     */
    //% block="Если %check то %yes иначе %no"
    export function container(check: boolean, yes: string, no: string): string {
        if (check) {
            return yes
        } else {
            return no
        }
    }

    /**
     * Проверка версии micro:bit
     */
    //% block="это micro:bit v2?"
    export function isV2(): boolean {
        let v2 = false;
        try {
            v2 = input.logoIsPressed() == undefined;
        } catch (e) {
            v2 = false;
        }
        return v2;
    }
    /**
     * Проверка версии micro:bit
     */
    //% block="Задать скрытую переменную значение %content"
    export function AssignVar(content: string): void{
        const var1 = content; 
    }

    /**
    * Рисует картинку по выбору
    */
    //% block="Рисовать картинку %picture"
    //% subcategory="Экран"
    export function PictureDraw(picture: Pictures): void {
        switch (picture) {
            case Pictures.Hi:
                basic.showLeds(`
                # . # . #
                # . # . .
                # # # . #
                # . # . #
                # . # . #
            `)
                break
            case Pictures.Beach:
                basic.showLeds(`
                . . . # #
                . . . . #
                . . . . .
                # # # # #
                # # # # #
            `)
                break
            case Pictures.Robot:
                basic.showLeds(`
                . . . . .
                . . . . .
                . . # . .
                . . . . .
                . . . . .
            `)
                break
        }
    }
}