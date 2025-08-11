import { formatTime } from "./helpers"

describe('formatTime', () => {
    it("добавление 0 если секунд < 10", ()=>{
        expect(formatTime(62)).toBe("1:02")
    })
    it("добавление 0 если меньше минуты", ()=>{
        expect(formatTime(23)).toBe("0:23")
    })
    it("обрабатывает 0", ()=>{
        expect(formatTime(0)).toBe("0:00")
    })
})