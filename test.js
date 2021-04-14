const express = require('express')
const routes  = require('./routes')
const router  = express.Router()
const app = express()

app.use(express.json())
app.use(routes)

class FibonacciSeries {
    constructor() {
    }
    async calculateFibonacciValue(number) {
        var s = 0;
        var returnValue;
        if (number == 0) {
            return (s);
        }
        if (number == 1) {
            s += 1;
            return (s);
        }
        else {
            return await (this.calculateFibonacciValue(number - 1) + this.calculateFibonacciValue(number - 2));
        }
    }
}
fabObj = new FibonacciSeries()

app.post("/fibo",(req,res)=>{
    const number = fabObj.calculateFibonacciValue(Number.parseInt(req.body.number));
    res.send({number})
})
app.listen(3000)
