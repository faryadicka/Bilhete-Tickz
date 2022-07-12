import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import {
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip, Chart
} from "chart.js";
// import BarElement from "chartjs-plugin-datalabels";
// import "../Dashboard/Dashboard.css";
// import axios from "axios";

import { getDashboard } from "../../modules/movies";

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
);

const BarChart = () => {
    const token = useSelector((state) => state.auth.loginData?.token);
    const [dashboard, setDashboard] = useState([]);
    const router = useRouter();

    // useEffect(() => {
    //     getAllMoviesHomeAxios()
    //         .then((res) => {
    //             console.log(res)
    //             // setDashboard(res.data.data);
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    // }, [])

    useEffect(() => {
        // axios
        //   .get(`${process.env.NEXT_PUBLIC_BE_HOST}/payments/dashboard?created_at=${created_at}&id=${id}`)
        //   .then(result => {
        //     setDashboard(result.data.data.data)
        //   }).catch(error => {
        //     console.log(error)
        //   })
        const { created_at = "", id = ""} = router.query
        getDashboard(token, created_at, id)
            .then((res) => {
                // console.log(res)
                setDashboard(res.data?.data.data);
            }).catch((err) => {
                console.log(err)
            })

    }, [token, router])
    // console.log("+" + dashboard)
    return (
        <div>
            <Bar
                data={{
                    labels: dashboard.length > 0 && dashboard.map(item => moment(item.created_at).format('MMM')),
                    datasets: [
                        {
                            label: ['Income'],
                            data: dashboard.length > 0 && dashboard.map(item => item.revenue),
                            backgroundColor: ['rgba(255, 186, 51, 1)'],
                            borderColor: [
                                'rgba(255, 186, 51, 1)',
                            ],
                            borderWidth: 1,
                        }
                    ]
                }}
                height={'200px'}
                options={{
                    plugins: {
                        legend: {
                            position: 'bottom',
                            display: true

                        }
                    }
                }}
            />
        </div>
    )
}

export default BarChart;