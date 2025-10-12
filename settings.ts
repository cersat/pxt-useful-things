

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

    // Адрес LCD (пример: PCF8574 модуль)
    const LCD_ADDR = 0x27
    const LCD_CMD = 0
    const LCD_DATA = 1

    // Таблица шрифта
    const font: { [key: string]: number[] } = {}

    /**
     * Вспомогательная функция: отправка байта (заглушка, чтобы не мешала компиляции)
     */
    function i2cSend(value: number, mode: number) {
        pins.i2cWriteNumber(LCD_ADDR, value, NumberFormat.UInt8BE)
    }

    /**
     * Добавить символ (сохранить в UsefFont)
     */
    //% block="добавить символ %char как рисунок %pattern"
    export function addSymbol(char: string, pattern: number[][]) {
        let bytes: number[] = []
        for (let row of pattern) {
            let b = 0
            for (let x = 0; x < 5; x++) {
                if (row[x]) b |= (1 << (4 - x))
            }
            bytes.push(b)
        }
        font[char] = bytes
    }

    /**
     * Показать символ на LCD, если он уже есть в памяти
     */
    //% block="показать символ %char на LCD"
    //% subcategory="LCD"
    export function showSymbol(char: string) {
        const data = font[char]
        if (!data) return  // если символ не добавлен — ничего не делаем

        // Начинаем запись в CGRAM (ячейка 0)
        i2cSend(0x40, LCD_CMD)

        // Отправляем 8 строк рисунка
        for (let i = 0; i < 8; i++) {
            const val = (i < data.length) ? data[i] : 0
            i2cSend(val, LCD_DATA)
        }

        // Показываем символ (ячейка 0)
        i2cSend(0x00, LCD_DATA)
    }

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