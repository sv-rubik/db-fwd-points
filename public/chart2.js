
const ctx2 = document.getElementById('myChart2').getContext('2d');

const myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'FWD rates as of today',
            //data: [85, 115, 145, 130, 65],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            fill: false,
            borderWidth: 3,
            tension: 0.4
        },
            {
                label: 'FWD rates as of 10/01/2022',
                data: [
                    85.318, 85.3415, 85.4717, 85.6274, 85.9798, 86.5936, 87.3023, 87.9976, 88.8045, 89.4839, 91.7247, 93.9395, 98.8566, 102.1427, 109.6909, 116.9382, 124.1379
                ],
                backgroundColor: [
                    'rgb(238,144,144)',
                ],
                borderColor: [
                    'rgb(190,4,4)',
                ],
                fill: false,
                borderWidth: 3,
                tension: 0.4
            },
            //     ADD 'FWD rates as of 10/01/2022 with today's spot',
        ]
    },

    options: {
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin: 70,

            }
        }
    }
});

let hoistedValue2 = 0  // остановим update графика, если закончились значения

function updateChart2(){
    async function fetchData() {
        const url = 'https://www.db-markets.com/api/forward?tenors=ON&tenors=12M&tenors=24M&tenors=1W&tenors=2M&tenors=5M&tenors=2W&tenors=1M&tenors=3M&tenors=4M&tenors=6M&tenors=9M&tenors=18M&tenors=36M&tenors=48M&tenors=60M&ccyPairs=EUR_RUB&swapPoints=false'
        const response = await fetch(url)
        return await response.json()
    }

    //get the values or from fetch response (equals to ask value)
    fetchData().then(datapoints => {
        console.log(datapoints)
        const months = datapoints.data[0].tenors.map((month) => {
            return month.label
        })
        // console.log(months)

        const values = datapoints.data[0].tenors.map((value) => {
            return value.ask
        })
        // console.log(values)

        myChart2.data.labels = months
        myChart2.data.datasets[0].data = values

        myChart2.data.labels.push(months[hoistedValue2])
        myChart2.data.datasets[0].data.push(values[hoistedValue2])

        //чтобы удалить последний элемент графика (который тоже спот)
        if(myChart2.data.labels.length > 16) {
            myChart2.data.labels.pop()
            myChart2.data.datasets[0].data.pop()
        }

        myChart2.update()
        hoistedValue2++
    })
}

// window.onload(updateChart2())