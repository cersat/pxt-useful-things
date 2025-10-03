

enum LedChoice {
    a=0,
    b=1,
    c=2,
    d=3,
    e=4
}

/**
 * Custom blocks
 */
//% weight=100 color=#a64d79 icon="" block="Полезные блоки"
namespace UsefulBlocks {;
    /**
     * Заставляет указанный светодиод мерцать с указанной задержкой
    */
    //% block="Мерцать %times раз с задержкой %delay координаты: Х:%pixelX Y:%pixelY"
    export function blink(times: number, delay: number, pixelX: LedChoice, pixelY: LedChoice): void {
        for (let i = 0; i < times; i++) {
            led.toggle(pixelX, pixelY)
            basic.pause(300)
            basic.clearScreen()
            basic.pause(300)
        }
    }
    
    /**
     * Ждёт, пока условие не станет истинным
    */
       //% block="ждать до %cond"
    //% cond.shadow=logic_boolean
    export function waitUntil(cond: boolean): void {
           while (!cond) {
               basic.pause(100)
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
    //% block="Читать число с i2c по адресу %adress , формат - %format , повторялся ли - %repeated?"
    export function i2cReadNum(adress: number, format: NumberFormat, repeated?: boolean): number {
        let buf = pins.i2cReadBuffer(adress, pins.sizeOf(format), repeated)
        return buf.getNumber(format, 0)
    }
    /**
    * Выполнить один блок, если v2, иначе другой
    */
    //% block="если v2 %v2Body иначе %v1Body"
    //% v2Body.shadow=statement
    //% v1Body.shadow=statement
    export function v2CheckContainer(v2Body: () => void, v1Body: () => void): void {
        let v2 = false
        try {
            v2 = input.logoIsPressed() !== undefined
        } catch (e) {
            v2 = false
        }
        if (v2) v2Body()
        else v1Body()
    }
}