import * as nodeFetch from "node-fetch"

export const getLoginToken = async (username, password) => {
    const response = await nodeFetch("https://productmodeler-uat.axa.com/", {
    //const response = await nodeFetch("https://modelling-staging.axa-rev-preprod-mpl-int.merlot.eu-central-1.aws.openpaas.axa-cloud.com/auth/login", {
        method: "POST",
        body: JSON.stringify({"username":username, "password":password}),
    })
    if (response.status!==200){
        throw new Error ("An error occur with login token")
    }
    const body =  await response.json()
    return body.token
}
