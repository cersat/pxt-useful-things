

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

/**
 * Custom blocks
 */
//% weight=100 color=#0b5394 icon="" block="Полезные блоки"
namespace UsefulBlocks {;
    /**
     * Заставляет указанный светодиод мерцать с указанной задержкой
    */
    //% block="Мерцать %times раз с задержкой %delay координаты: Х:%pixelX Y:%pixelY"
    export function blink(times: number, delay: number, pixelX: LedChX, pixelY: LedChY): void {
        for (let i = 0; i < times; i++) {
            led.toggle(pixelX, pixelY)
            basic.pause(300)
            basic.clearScreen()
            basic.pause(300)
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
}