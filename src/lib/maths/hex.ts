// code from https://www.redblobgames.com/grids/hexagons/a

export class Hex {
    q = 0
    r = 0
    s = 0

    constructor(q: number, r: number, s: number) {
        this.q = q;
        this.r = r;
        this.s = s;
        if (Math.round(q + r + s) !== 0)
            throw "q + r + s must be 0";
    }
    add(b: Hex) {
        return new Hex(this.q + b.q, this.r + b.r, this.s + b.s);
    }
    subtract(b: Hex) {
        return new Hex(this.q - b.q, this.r - b.r, this.s - b.s);
    }
    scale(k: number) {
        return new Hex(this.q * k, this.r * k, this.s * k);
    }
    rotateLeft() {
        return new Hex(-this.s, -this.q, -this.r);
    }
    rotateRight() {
        return new Hex(-this.r, -this.s, -this.q);
    }
    len() {
        return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
    }
    distance(b: Hex) {
        return this.subtract(b).len();
    }
    round() {
        let qi = Math.round(this.q);
        let ri = Math.round(this.r);
        let si = Math.round(this.s);
        const q_diff = Math.abs(qi - this.q);
        const r_diff = Math.abs(ri - this.r);
        const s_diff = Math.abs(si - this.s);
        if (q_diff > r_diff && q_diff > s_diff) {
            qi = -ri - si;
        }
        else if (r_diff > s_diff) {
            ri = -qi - si;
        }
        else {
            si = -qi - ri;
        }
        return new Hex(qi, ri, si);
    }
    lerp(b: Hex, t: number) {
        return new Hex(this.q * (1.0 - t) + b.q * t, this.r * (1.0 - t) + b.r * t, this.s * (1.0 - t) + b.s * t);
    }
    linedraw({ b, step }: { b: Hex, step?: number }) {
        const N = this.distance(b);
        const a_nudge = new Hex(this.q + 1e-06, this.r + 1e-06, this.s - 2e-06);
        const b_nudge = new Hex(b.q + 1e-06, b.r + 1e-06, b.s - 2e-06);
        let results = [];
        step = step || 1.0 / Math.max(N, 1);
        for (let i = 0; i <= N; i++) {
            results.push(a_nudge.lerp(b_nudge, step * i).round());
        }
        return results;
    }
}
// Hex.directions = [new Hex(1, 0, -1), new Hex(1, -1, 0), new Hex(0, -1, 1), new Hex(-1, 0, 1), new Hex(-1, 1, 0), new Hex(0, 1, -1)];
// Hex.diagonals = [new Hex(2, -1, -1), new Hex(1, -2, 1), new Hex(-1, -1, 2), new Hex(-2, 1, 1), new Hex(-1, 2, -1), new Hex(1, 1, -2)];
export const Hex0=new Hex(0,0,0)