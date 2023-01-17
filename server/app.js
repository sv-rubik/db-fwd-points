//работающая версия, если в package.json стоит  "type":"module" сразу после открывающей {
import fs from 'fs'

export function histDataUpdate(){

    async function fetchData() {
        const url = 'https://www.db-markets.com/api/forward?tenors=ON&tenors=24M&ccyPairs=EUR_RUB&swapPoints=false'
        const response = await fetch(url)
        const body = await response.json()
        return body
    }

    fetchData().then(body => {
        const todaysRate = body.data[0].tenors[2].ask
        const todaysDate = body.data[0].tenors[2].valueDate
        // console.log(todaysRate)
        // console.log(todaysDate)
        let obj = {}
        obj.key = todaysDate
        obj.value = todaysRate
        //console.log(obj)

        //перезапись файла с добавлением нового объекта с текущей датой и курсом в json
        fs.readFile('./server/db/db.json', function (err, data) {
            if (err) throw err('Ошибка при чтении файла!')
            const json = JSON.parse(data)
            json.push(obj)
            console.log(json)

            if(json.length > 10) {
                json.shift()
            }

            fs.writeFile('./server/db/db.json', JSON.stringify(json), (err) => {
                if (err) throw err('Ошибка при записи файла!')
            })
        })
    })
}


// setInterval(histDataUpdate, 5000)

// fs.appendFile('db/db.json', `, ${JSON.stringify(todaysDate)}:${JSON.stringify(todaysRate)}`, (err) => {
//     if (err) {
//         console.log(err)
//     }
// })


