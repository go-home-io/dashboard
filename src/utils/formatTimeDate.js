export const formatTimeDate = timestamp => {
    let timeInt = parseInt(timestamp)/1e6;
    let d = new Date(timeInt);
    if ( d.getFullYear() < 2019 ) d = new Date(timeInt*1e6);

    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = d.getFullYear() + "-" +  month[d.getMonth()] + "-" + d.getDate();

    const time =
        [
            "0" + d.getHours(),
            "0" + d.getMinutes(),
            "0" + d.getSeconds(),
        ].map(component => component.slice(-2));
    return time.slice(0,3).join(":") + " " + date;
};
