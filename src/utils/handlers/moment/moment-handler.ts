import moment from "moment"

export const getCurrentDateAndTime = ()=>{
    return moment().utc()
}