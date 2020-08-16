/* 处理时间 */
// export let dayjs = (date) => {
//     date.forEach(v => {
//         v = this.dayjs(v).format("YYYY-MM-DD HH:mm:ss");
//     })
// }
export let getChinatime = (utctime) => {

    let date = new Date(utctime)

    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}