let ctx: CanvasRenderingContext2D
let html: HTMLCanvasElement
const Screen = {
    init() {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        html = canvas
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.fillStyle = "rgba(55,55,55, 1)"
        console.log(ctx, html)
    },
    get ctx() {
        return ctx
    },
     get canvas() {
        return html
    },
     get width() {
        return ctx?.canvas.width
    },
     get height() {
        return ctx?.canvas.height
    }
}

export default Screen
