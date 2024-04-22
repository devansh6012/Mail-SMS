// app.js
// const cron = require('node-cron');

// cron.schedule('*/5 * * * *', async () => {
//     schedule()   
// });


// controller.js
exports.schedule = async (req, res) => {
    const sqlQuery = `select ssb.id, ssb.charger_serial_no, ssb.user_id from set_schedule_ble as ssb inner join charger_connector_mapping as ccm on ccm.charger_display_id = ssb.charger_serial_no where ssb.schedule_type='RECURRING' and ssb.schedule_status='Y' and ssb.status='Y' and  ccm.current_status = 'Preparing' and ssb.day_name=dayname(now()) and time(ssb.start_schedule_time) between  TIME(NOW()) - INTERVAL 5 MINUTE and TIME(NOW()) + INTERVAL 10 MINUTE`;
    db.query(sqlQuery, (err, results) => {
        console.log(results,"resultsresultsresultsresults");
        if (err) {
            // console.error('MySQL query error:', err.message);
            logError(` start RECURRING query step-1:- ${err.message?.toString()}`, 'null')
        } else {
            let val = results && results.forEach((ele) => {
                let param = {
                    "app_version": "",
                    "booking_id": 0,
                    "charger_id": ele?.charger_serial_no,
                    "charger_sr_no": ele?.charger_serial_no,
                    "command": "START_CHARGING",
                    "command_source": "Recurring_Schedular",
                    "connector": 1,
                    "device_id": 0,
                    "id_tag": 0,
                    "id_tag_type": "ID_TAG",
                    "mobile_no": 0,
                    "os_version": 0,
                    "station_id": 0,
                    "user_id": ele?.user_id,
                    "vehicle_id": 0,
                    "vehicle_number": 0
                }
                let url = `${config.baseUrl}/remotetransaction`
                axios.post(url, param)
                    .then(response => {
                        let updateQuery = `UPDATE set_schedule_ble SET status = 'N' WHERE id= ${ele?.id}`
                        db.query(updateQuery, (err, results) => {
                            if (err) {
                                console.error('getting error during update:', err);
                            }
                        });
                    })
                    .catch(error => {
                        logError(`start RECURRING step-1:- ${error?.toString()}`, ele?.charger_serial_no)
                    });


            });
        }
    });


    const sqlQuery1 = `select id,schedule_id,charger_serial_no, user_id,start_schedule_time,stop_schedule_time,duration,schedule_type,day_name,schedule_status,charger_status,status,created_date,charger_status from set_schedule_ble where schedule_type='RECURRING' and schedule_status='Y' and status='N' and day_name=dayname(now()) and time(stop_schedule_time) between TIME(NOW()) - INTERVAL 5 MINUTE and TIME(NOW()) + INTERVAL 10 MINUTE;`;
    db.query(sqlQuery1, (err, results) => {
        if (err) {
            logError(` stop RECURRING query step-1:- ${err.message?.toString()}`, 'null')
        } else {
            let val = results && results.forEach((ele) => {
                let param = {
                    "app_version": "",
                    "booking_id": 0,
                    "charger_id": ele?.charger_serial_no,
                    "charger_sr_no": ele?.charger_serial_no,
                    "command": "STOP_CHARGING",
                    "command_source": "Recurring_Schedular",
                    "connector": 1,
                    "device_id": 0,
                    "id_tag": 0,
                    "id_tag_type": "ID_TAG",
                    "mobile_no": 0,
                    "os_version": 0,
                    "station_id": 0,
                    "user_id": ele?.user_id,
                    "vehicle_id": 0,
                    "vehicle_number": 0
                }
                let url = `${config.baseUrl}/remotetransaction`
                axios.post(url, param)
                    .then(response => {
                        let updateQuery = `UPDATE set_schedule_ble SET status = 'Y' WHERE id= ${ele?.id}`
                        db.query(updateQuery, (err, results) => {
                            if (err) {
                                console.error('getting error during update:', err);
                            }
                        });
                    })
                    .catch(error => {
                        logError(`stop RECURRING step-1:- ${error?.toString()}`, ele?.charger_serial_no)
                    });
            });
        }
    });


    const sqlQuery2 = `select ssb.id, ssb.charger_serial_no, ssb.user_id from set_schedule_ble as ssb inner join charger_connector_mapping as ccm on ccm.charger_display_id = ssb.charger_serial_no where ssb.schedule_type='ONE_TIME' and ssb.schedule_status='Y' and ssb.status='Y' and  ccm.current_status = 'Preparing' and ssb.day_name=dayname(now()) and time(ssb.start_schedule_time) between  TIME(NOW()) - INTERVAL 5 MINUTE and TIME(NOW()) + INTERVAL 10 MINUTE`;

    db.query(sqlQuery2, (err, results) => {
        if (err) {
            logError(` start ONE_TIME query step-1:- ${err.message?.toString()}`, 'null')
        } else {
            let val = results && results.forEach((ele) => {
                let param = {
                    "app_version": "",
                    "booking_id": 0,
                    "charger_id": ele?.charger_serial_no,
                    "charger_sr_no": ele?.charger_serial_no,
                    "command": "START_CHARGING",
                    "command_source": "ONE_TIME",
                    "connector": 1,
                    "device_id": 0,
                    "id_tag": 0,
                    "id_tag_type": "ID_TAG",
                    "mobile_no": 0,
                    "os_version": 0,
                    "station_id": 0,
                    "user_id": ele?.user_id,
                    "vehicle_id": 0,
                    "vehicle_number": 0
                }
                let url = `${config.baseUrl}/remotetransaction`
                axios.post(url, param)
                    .then(response => {
                        let updateQuery = `UPDATE set_schedule_ble SET status = 'N' WHERE id= ${ele?.id}`
                        db.query(updateQuery, (err, results) => {
                            if (err) {
                                console.error('getting error during update:', err);
                            }
                        });
                    })
                    .catch(error => {
                        logError(`start one time step-1:- ${error?.toString()}`, ele?.charger_serial_no)
                    });
            });
        }
    });
    const sqlQuery3 = `select id,schedule_id,charger_serial_no,user_id,start_schedule_time,stop_schedule_time,duration,schedule_type,day_name,schedule_status,charger_status,status,created_date,charger_status from set_schedule_ble where schedule_type='ONE_TIME' and schedule_status='Y' and status='N' and time(stop_schedule_time) between TIME(NOW()) - INTERVAL 5 MINUTE and TIME(NOW()) + INTERVAL 10 MINUTE;`;
    db.query(sqlQuery3, (err, results) => {
        if (err) {
            logError(` stop ONE_TIME query step-1:- ${err.message?.toString()}`, 'null')
        } else {
            let val = results && results.forEach((ele) => {
                let param = {
                    "app_version": "",
                    "booking_id": 0,
                    "charger_id": ele?.charger_serial_no,
                    "charger_sr_no": ele?.charger_serial_no,
                    "command": "STOP_CHARGING",
                    "command_source": "ONE_TIME",
                    "connector": 1,
                    "device_id": 0,
                    "id_tag": 0,
                    "id_tag_type": "ID_TAG",
                    "mobile_no": 0,
                    "os_version": 0,
                    "station_id": 0,
                    "user_id": ele?.user_id,
                    "vehicle_id": 0,
                    "vehicle_number": 0
                }
                let url = `${config.baseUrl}/remotetransaction`
                axios.post(url, param)
                    .then(response => {
                        let updateQuery = `UPDATE set_schedule_ble SET status = 'D' WHERE id= ${ele?.id}`
                        db.query(updateQuery, (err, results) => {
                            if (err) {
                                console.error('getting error during update:', err);
                            }
                        });
                    })
                    .catch(error => {
                        logError(` stop ONE_TIME query step-1:- ${err.message?.toString()}`, 'null')
                    });
            });
        }
    });
}
