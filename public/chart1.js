const vs24mRate = 102.1427
/////////////////////////////////////////////////////////////
//Chart
// setup
const data = {
    datasets: [{
        label: '24M FWD rates dynamics',
        //data: [85, 115, 145, 130, 65],
        backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
            'rgba(54, 162, 235, 1)',
        ],
        fill: false,
        borderWidth: 3,
        tension: 0.4,
        datalabels: {
            color: '#323334',
            formatter: function (values) {
                return parseFloat(values).toFixed(4)
            },
            font: {
                size: 11,
            },
            display: 'auto',
            align: 'bottom',
            offset: '15'
        }
    },
    {
        label: '24M FWD rate as of 10 Jan 2022',
        data: [vs24mRate],
        backgroundColor: [
            'rgba(238,144,144)',
        ],
        borderColor: [
            'rgba(190,4,4)',
        ],
        fill: false,
        borderWidth: 3,
        //tension: 0.1
        datalabels: {
            display: false,
        }
    }]
}

// config
const config = {
    type: 'line',
    data,
    plugins: [ChartDataLabels],
    options: {
        //add horizontal level of rate for comparison
        plugins: {
            autocolors: false,
            title: {
                display: true,
                text: '24M FWD rates',
                font:  {
                    size: 14,
                    weight: 'bold',
                    //family: "'Helvetica', sans-serif",
                },
                color: '#1e577e',
            },
            annotation: {
                annotations: {
                    line1: {
                        type: 'line',
                        yMin: vs24mRate,
                        yMax: vs24mRate,
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin: 101,
                suggestedMax: 109
            }
        }
    },
}
// render / init
const myChart = new Chart(
    document.getElementById('myChart'),
    config
)

/////////////////////////////////////////////////////////////
//update of Chart with fetched data

let hoistedValue = 0  // chart update with new fetched data

function updateChart(){
    async function fetchData() {
        const url = 'http://localhost:3000/api/rates'
        const response = await fetch(url)
        return await response.json()
    }

    //get the values from fetch response (equals to ask-value)
    fetchData().then(data => {
        console.log(data)
        const dates = data.map((el) => {
            return el.key
        })
        // console.log(dates)

        const values = data.map((el) => {
            return el.value
        })
        // console.log(values)

        //deletion of first values of the chart if more than 31 values
        if(myChart.data.labels.length > 31) {
            myChart.data.labels.shift()
            myChart.data.datasets[0].data.shift()
        }

        myChart.data.labels = dates
        myChart.data.datasets[0].data = values

        myChart.update()
        hoistedValue++
    })
}

// window.onload(updateChart())