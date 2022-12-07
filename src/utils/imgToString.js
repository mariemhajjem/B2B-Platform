export default function (picture) {
    let binaryString = ""
    for (let i = 0; i < picture?.data?.data.length; i++) {
        binaryString += String.fromCharCode(picture?.data?.data[i])
    }
    const base64String = btoa(binaryString);
    return `data:${picture?.contentType};base64,${base64String}`
}